import mongoose from "mongoose";

export const categories=["food", "clothes", "meow", "jewels"]
export const brands=["nike", "bur", "huh", "bye"]

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true

  },
  category: {
    type: String,
    required: true,
    enum: categories
  },
  brand: {
    type: String,
    required: true,
    enum: brands
  },
  rating: {
    type: Number,
    default: 0,
    // required: [true, 'why no rating?']
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;