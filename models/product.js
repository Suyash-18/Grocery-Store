const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Vegetable", "Milk", "Snacks","Bakery", "Chocolate","Fruits","Meat","Breverages"]
},
  image: {
    type: String,
    default:
      "public/images/hero-banner.avif",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
  },
  price: Number,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;































