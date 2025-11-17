import Product from "../models/Products.js";
import fs from 'fs';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      status: "success",
      products
    });
  } catch (error) {
    return res.status(500).json({ error });

  }
}

export const getProduct = async (req, res) => {
  try {
    // const { id } = req.params;
    const product = await Product.findById(req.id);
    if (!product) res.status(404).json({
      status: 'error',
      data: 'product not found'
    })
    return res.status(200).json({
      status: "success",
      data: product
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', data: error.message });
  }
}


export const createProduct = async (req, res) => {
  const { title, price, detail, category, brand } = req.body ?? {};
  const image = req.imagePath;
  console.log(image);
  try {
    const newProduct=await Product.create({
      title,
      price,
      detail,
      image,
      category,
      brand
    });
    return res.status(201).json({
      status: 'Success',
      data: 'product added successfully',
      newProduct
    });
  } catch (err) {

    //if not all details provided, the image file is not saved
    fs.unlink(`./uploads/${req.imagePath}`, (error) => {
      return res.status(400).json({
        status: 'error',
        data: err.message
      });
    })
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, detail, category, brand } = req.body ?? {};

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      if (req.imagePath) {
        fs.unlinkSync(`./uploads/${req.imagePath}`)
        return res.status(404).json({ status: 'error', data: 'product not found' });
      } else {
        return res.status(404).json({ status: 'error', data: 'product not found' });
      }
    }
    existingProduct.title = title || existingProduct.title;
    existingProduct.price = price || existingProduct.price;
    existingProduct.detail = detail || existingProduct.detail;
    existingProduct.category = category || existingProduct.category;
    existingProduct.brand = brand || existingProduct.brand;

    //updating file
    if (req.imagePath) {
      fs.unlink(`./uploads/${existingProduct.image}`, async (err) => {
        existingProduct.image = req.imagePath;
        await existingProduct.save();
        return res.status(200).json({
          status: 'success',
          data: 'product successfully updated'
        });

      })

    } else {
      await existingProduct.save();
      return res.status(200).json({
        status: 'success',
        data: 'product successfully updated'
      });
    }

  } catch (error) {
    if (req.imagePath) {
      fs.unlink(`./uploads/${req.imagePath}`, (error) => {
        return res.status(500).json({ status: 'error', data: error.message });
      })
    } else {
      return res.status(500).json({ status: 'error', data: error.message });
    }
  }
}

export const deleteProduct = async (req, res) => {

  try {
    const { id } = req.params;
    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ status: 'error', data: 'product not found' });

    fs.unlink(`./uploads/${isExist.image}`, async (error) => {
      await isExist.deleteOne();
      return res.status(200).json({
        status: 'success',
        data: 'product deleted successfully'
      })
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', data: error.message });
  }
};