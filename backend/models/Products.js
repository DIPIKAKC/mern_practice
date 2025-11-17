import mongoose from "mongoose";



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
    enum: ["food", "clothes", "meow", "jewels"]
  },
  brand: {
    type: String,
    required: true,
    enum: ["nike", "bur", "huh", "bye"]
  },
  rating: {
    type: Number,
    default: 0,
    // required: [true, 'why no rating?']
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;