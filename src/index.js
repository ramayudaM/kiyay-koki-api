require('dotenv').config();
const PORT = process.env.PORT || 5000;

const express = require('express');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const configRoutes = require('./routes/config');
const shippingAddressRoutes = require('./routes/shippingAddress');
const ReviewRoutes = require('./routes/review');
const WishlistRoutes = require('./routes/wishlist');
const CartRoutes = require('./routes/cart');
const middlewareLogRequest = require('./middleware/logs');
const middlewareValidateApiKey = require('./middleware/validateApiKey');
const { connectToWhatsApp } = require('./controller/whatsapp');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(middlewareValidateApiKey);
app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets/image', express.static('public/images'));
app.use('/assets/video', express.static('public/videos'));

app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/config', configRoutes);
app.use('/shipping-address', shippingAddressRoutes);
app.use('/review', ReviewRoutes);
app.use('/wishlist', WishlistRoutes);
app.use('/cart', CartRoutes);

connectToWhatsApp();

app.listen(PORT, () => {
  console.log(`Server Running Port ${PORT}`);
});
