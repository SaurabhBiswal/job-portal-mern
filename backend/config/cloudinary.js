const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.dx295xrd4,
  api_key: process.env.643572285734485,
  api_secret: process.env.8gotxCqFxD-nvPsrYCXbXv7XWKc
});

module.exports = cloudinary;