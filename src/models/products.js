const pool = require('../config/database');
const ImagesModel = require('../models/images');
const VideoModel = require('../models/video');
const ProductCategoryModel = require('../models/productCategory');
const parseJson = require('../utils/parseJson');
const { getFormattedDate } = require('../utils/dateHelper');

const getAllProducts = async (searchQuery = '') => {
  try {
    // SQL Query dengan kondisi LIKE jika searchQuery tidak kosong
    const SQLQuery = `
      SELECT 
        p.*, 
        ROUND(IFNULL(AVG(r.rating), 0), 2) AS averageRating, 
        IFNULL(COUNT(r.id), 0) AS totalReviews 
      FROM product p 
      LEFT JOIN review r ON p.id = r.product_id 
      WHERE p.deleted_at IS NULL 
      ${searchQuery ? 'AND p.name LIKE ?' : ''}
      GROUP BY p.id;
    `;

    const queryParams = searchQuery ? [`%${searchQuery}%`] : [];

    // Eksekusi query dengan parameter
    const [productsData] = await pool.execute(SQLQuery, queryParams);

    if (productsData.length === 0) {
      throw new Error('NotFoundError: Products not found');
    }

    const allProducts = await Promise.all(
      productsData.map(async (product) => {
        const attributes = await ProductCategoryModel.getProductCategory(product.id, product.category);
        const images = await ImagesModel.getImages(product.id);
        const video = await VideoModel.getVideo(product.id);

        return {
          ...product,
          attributes,
          images,
          video,
        };
      })
    );

    return allProducts;
  } catch (error) {
    if (error.message.startsWith('DatabaseError') || error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch products');
  }
};

const getAllProductsByFilter = async ({ categoryFilter = null, includeDeleted = false }) => {
  try {
    // SQL Query dengan kondisi dinamis
    const SQLQuery = `
      SELECT 
        p.*, 
        ROUND(IFNULL(AVG(r.rating), 0), 2) AS averageRating, 
        IFNULL(COUNT(r.id), 0) AS totalReviews 
      FROM product p 
      LEFT JOIN review r ON p.id = r.product_id 
      WHERE 1=1 
        ${!includeDeleted ? 'AND p.deleted_at IS NULL' : 'AND p.deleted_at IS NOT NULL'}
        ${categoryFilter ? 'AND p.category = ?' : ''}
      GROUP BY p.id;
    `;

    // Buat queryParams berdasarkan kondisi
    const queryParams = [];
    if (categoryFilter) queryParams.push(categoryFilter);

    // Eksekusi query dengan parameter
    const [productsData] = await pool.execute(SQLQuery, queryParams);

    // Jika tidak ada data ditemukan
    if (productsData.length === 0) {
      throw new Error('NotFoundError: Products not found');
    }

    // Memproses data tambahan (attributes, images, video)
    const allProducts = await Promise.all(
      productsData.map(async (product) => {
        const attributes = await ProductCategoryModel.getProductCategory(product.id, product.category);
        const images = await ImagesModel.getImages(product.id);
        const video = await VideoModel.getVideo(product.id);

        return {
          ...product,
          attributes,
          images,
          video,
        };
      })
    );

    return allProducts;
  } catch (error) {
    // Penanganan error spesifik
    if (error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch products');
  }
};

const getProductByID = async (id) => {
  try {
    const SQLQuery =
      'SELECT p.*, ROUND(IFNULL(AVG(r.rating), 0), 2) AS averageRating, IFNULL(COUNT(r.id), 0) AS totalReviews FROM product p LEFT JOIN review r ON p.id = r.product_id WHERE p.id=? GROUP BY p.id;';
    const [product] = await pool.execute(SQLQuery, [id]);

    if (product.length === 0) {
      throw new Error('NotFoundError: Product not found');
    }

    const attributes = await ProductCategoryModel.getProductCategory(id, product[0].category);
    const images = await ImagesModel.getImages(id);
    const video = await VideoModel.getVideo(id);

    return {
      ...product[0],
      attributes,
      images,
      video,
    };
  } catch (error) {
    if (error.message.startsWith('DatabaseError') || error.message.startsWith('NotFoundError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to fetch product');
  }
};

const createProduct = async (data) => {
  try {
    const { name, price, stock, description, discount, category, attributes } = data;
    const categoryData = parseJson(attributes);

    const SQLQuery = `INSERT INTO product (name, price, stock, description, discount, category) VALUES (?, ?, ?, ?, ?, ?)`;

    const [productsData] = await pool.execute(SQLQuery, [name, price, stock, description, discount, category]);

    const id = productsData.insertId;

    await ProductCategoryModel.createProductCategory(id, category, categoryData);

    return { id };
  } catch (error) {
    if (error.message.startsWith('DatabaseError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to create product');
  }
};

const updateProduct = async (id, data) => {
  try {
    const { name, price, stock, description, discount, category, attributes } = data;
    const categoryData = parseJson(attributes);

    const SQLQuery = `UPDATE product SET name=?, price=?, stock=?, description=?, discount=?, category=? WHERE id=?`;

    await pool.execute(SQLQuery, [name, price, stock, description, discount, category, id]);

    await ProductCategoryModel.updateProductCategory(id, category, categoryData);

    return { id };
  } catch (error) {
    if (error.message.startsWith('DatabaseError')) {
      throw error;
    }

    throw new Error('DatabaseError: Failed to update product');
  }
};

const deleteProduct = async (id) => {
  try {
    const SQLQuery = 'DELETE FROM product WHERE id=?';
    await pool.execute(SQLQuery, [id]);
    return { id };
  } catch (error) {
    throw new Error('DatabaseError: Failed to update product');
  }
};

const unlistedProduct = async (id) => {
  try {
    const dateNow = getFormattedDate();
    const SQLQuery = 'UPDATE product SET deleted_at=? WHERE id=?';
    await pool.execute(SQLQuery, [dateNow, id]);
    return { id };
  } catch (error) {
    throw new Error('DatabaseError: Failed to unlisted product');
  }
};

const listedProduct = async (id) => {
  try {
    const SQLQuery = 'UPDATE product SET deleted_at=null WHERE id=?';
    await pool.execute(SQLQuery, [id]);
    return { id };
  } catch (error) {
    throw new Error('DatabaseError: Failed to unlisted product');
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
