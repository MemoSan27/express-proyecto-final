const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");

Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(Image);
Image.belongsTo(Product);