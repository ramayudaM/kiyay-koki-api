const ProductsModel = require('../models/products');
const ImagesModel = require('../models/images');
const VideoModel = require('../models/video');
const deleteFile = require('../utils/deleteFile');
const { sendSuccess, sendError } = require('../utils/sendResponse');
const parseJson = require('../utils/parseJson');

const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const result = await ProductsModel.getAllProducts(search || '');
    sendSuccess(res, result, 'Products retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const getAllProductsByFilter = async (req, res) => {
  try {
    const { category, includeDeleted } = req.query;
    const includeDeletedFlag = includeDeleted === 'true';
    const result = await ProductsModel.getAllProductsByFilter({
      categoryFilter: category || null,
      includeDeleted: includeDeletedFlag,
    });

    sendSuccess(res, result, 'Products retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const getProductByID = async (req, res) => {
  try {
    const result = await ProductsModel.getProductByID(req.params.id);
    sendSuccess(res, result, 'Product retrieved successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, discount, category, attributes, registered } = req.body;
    const categoryData = parseJson(attributes);

    console.log(req.files);

    if (![name, price, stock, description, discount, category].every(Boolean) || Object.keys(categoryData).length === 0) {
      throw new Error('ValidationError: Missing required fields');
    }

    const imagePaths = req.files.images?.map((file) => file.filename) || [];
    const videoPath = req.files.video?.[0]?.filename;
    console.log(imagePaths);

    if (imagePaths.length === 0) {
      throw new Error('ValidationError: At least one image is required');
    }

    const { id } = await ProductsModel.createProduct(req.body);

    for (let image of imagePaths) {
      await ImagesModel.createImages(id, image);
    }

    if (videoPath) {
      await VideoModel.createVideo(id, videoPath);
    }

    sendSuccess(res, { id }, 'Product created successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, description, discount, category, attributes } = req.body;
    const categoryData = parseJson(attributes);

    if (![name, price, stock, description, discount, category].every(Boolean) || Object.keys(categoryData).length === 0) {
      throw new Error('ValidationError: Missing required fields');
    }

    const imagePaths = req.files.images?.map((file) => file.filename) || [];
    const videoPath = req.files.video?.[0]?.filename || null;

    if (imagePaths.length === 0) {
      throw new Error('ValidationError: At least one image is required');
    }

    const { id: productId, images, video } = await ProductsModel.getProductByID(req.params.id);
    const [oldLength, newLength] = [images.length, imagePaths.length];

    await ProductsModel.updateProduct(productId, req.body);

    await Promise.all([
      ...imagePaths.slice(0, Math.min(oldLength, newLength)).map((image, index) => {
        ImagesModel.updateImages(images[index].id, image);
      }),
      ...imagePaths.slice(oldLength).map((image) => {
        ImagesModel.createImages(productId, image);
      }),
      ...images.slice(newLength).map((image) => {
        ImagesModel.deleteImages(image.id);
      }),
      ...images.map((image) => {
        deleteFile(`public/images/${image.image_url}`);
      }),
    ]);

    if (videoPath) {
      if (video) {
        await Promise.all([VideoModel.updateVideo(video.id, videoPath), deleteFile(`public/videos/${video.video_url}`)]);
      } else {
        await VideoModel.createVideo(productId, videoPath);
      }
    } else if (video) {
      await Promise.all([VideoModel.deleteVideo(video.id), deleteFile(`public/videos/${video.video_url}`)]);
    }

    sendSuccess(res, { id: productId }, 'Product updated successfully.');
  } catch (error) {
    if (error.message.startsWith('NotFoundError') || error.message.startsWith('ValidationError')) {
      const imagePaths = req.files.images?.map((file) => file.filename) || [];
      const videoPath = req.files.video?.[0]?.filename || null;

      await Promise.all([...imagePaths.map((image) => deleteFile(`public/images/${image}`)), videoPath && deleteFile(`public/videos/${videoPath}`)]);
    }

    sendError(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id, images, video } = await ProductsModel.getProductByID(req.params.id);

    await Promise.all([
      await ProductsModel.deleteProduct(id),
      ...images.map((image) => deleteFile(`public/images/${image.image_url}`)),
      deleteFile(`public/videos/${video.video_url}`),
    ]);

    sendSuccess(res, { id }, 'Product deleted successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const unlistedProduct = async (req, res) => {
  try {
    const { id, deleted_at } = await ProductsModel.getProductByID(req.params.id);
    if (deleted_at) {
      throw new Error('ValidationError: Product is already unlisted.');
    }
    await ProductsModel.unlistedProduct(id);
    sendSuccess(res, { id }, 'Product unlisted successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

const listedProduct = async (req, res) => {
  try {
    const { id, deleted_at } = await ProductsModel.getProductByID(req.params.id);
    if (!deleted_at) {
      throw new Error('ValidationError: Product is already listed.');
    }
    await ProductsModel.listedProduct(id);
    sendSuccess(res, { id }, 'Product listed successfully.');
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  unlistedProduct,
  listedProduct,
  getAllProductsByFilter,
};
