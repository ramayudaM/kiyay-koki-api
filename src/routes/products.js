const express = require('express');
const ProductsController = require('../controller/products');
const middlewareUploadMedia = require('../middleware/multer');
const middlewareVerifyToken = require('../middleware/verifyToken');
const middlewarecheckUserLevel = require('../middleware/checkUserLevel');

const router = express.Router();

router.use(middlewareVerifyToken);

// Create Products
router.post(
  '/',
  middlewarecheckUserLevel('seller'),
  middlewareUploadMedia,
  ProductsController.createProduct
);

// Read all Products
router.get('/', ProductsController.getAllProducts);

// Update Products
router.put(
  '/:id',
  middlewarecheckUserLevel('seller'),
  middlewareUploadMedia,
  ProductsController.updateProduct
);

// Delete Permanent Product
router.delete('/:id', middlewarecheckUserLevel('seller'), ProductsController.deleteProduct);

// Unlisted Product - Sembunyikan Product dari pembeli
router.patch(
  '/unlisted/:id',
  middlewarecheckUserLevel('seller'),
  ProductsController.unlistedProduct
);

// Listed Product - Menampilkan Product ke pembeli
router.patch('/listed/:id', middlewarecheckUserLevel('seller'), ProductsController.listedProduct);

// Read Product By Id
router.get('/:id', ProductsController.getProductByID);

module.exports = router;
