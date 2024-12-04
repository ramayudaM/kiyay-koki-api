require('dotenv').config();
const PORT = process.env.PORT || 5000;

const express = require('express');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const configRoutes = require('./routes/config');
const middlewareLogRequest = require('./middleware/logs');
const middlewareValidateApiKey = require('./middleware/validateApiKey');
const { connectToWhatsApp } = require('./controller/whatsapp');

const app = express();

app.use(middlewareValidateApiKey);
app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets/image', express.static('public/images'));
app.use('/assets/video', express.static('public/videos'));

app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/config', configRoutes);

connectToWhatsApp();

app.listen(PORT, () => {
  console.log(`Server Running Port ${PORT}`);
});
