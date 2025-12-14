import Product, { brands, categories } from "../models/Products.js";
import fs from 'fs';

export const getProducts = async (req, res) => {
  try {

    // const {rgt} = req.query;
    // console.log(rgt); //4
    // const products = await Product.find({rating:{$gt:rgt}});

    // const { select } = req.query;
    // const fields = select.replaceAll(',',' ');

    console.log(req.query);
    const exludedFields = ['page', 'limit', 'sort', 'fields', 'skip', 'search'];
    let queryObj = { ...req.query };

    exludedFields.forEach((val) => {
      delete queryObj[val];
    })

    if (req.query.search) {
      const searchText = req.query.search;

      if (categories.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
        queryObj.category = { $regex: searchText, $options: 'i' };

      } else if (brands.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
        queryObj.brand = { $regex: searchText, $options: 'i' };
      } else {
        queryObj.title = { $regex: searchText, $options: 'i' };
      }
    }

    const output = Object.entries(queryObj).reduce((acc, [key, value]) => {
      const match = key.match(/^(.+)\[(.+)\]$/);  // <-- FIXED REGEX
      if (match) {
        const field = match[1];
        const operator = `$${match[2]}`;
        const parsedValue = isNaN(value) ? value : Number(value);

        acc[field] = { [operator]: parsedValue };
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    let query = Product.find(output);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(output);
    const products = await query.skip(skip).limit(limit);

    // console.log(products)
    return res.status(200).json({
      status: "success",
      total,
      products,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({ error });

  }
}

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) res.status(404).json({
      status: 'error',
      data: 'product not found'
    })
    return res.status(200).json({
      status: "success",
      product
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

export const createProduct = async (req, res) => {
  const { title, price, detail, category, brand, stock } = req.body ?? {};
  const image = req.imagePath;
  console.log(image);
  try {
    const newProduct = await Product.create({
      title,
      price,
      detail,
      image,
      category,
      brand,
      stock
    });
    return res.status(201).json({
      status: 'Success',
      message: 'product added successfully',
      newProduct
    });
  } catch (err) {

    //if not all details provided, the image file is not saved
    fs.unlink(`./uploads/${req.imagePath}`, (error) => {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    })
  }
};

export const updateProduct = async (req, res) => {

  try {
    const { id } = req.params;
    const { title, price, detail, category, brand, stock } = req.body ?? {};


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
    existingProduct.stock = stock || existingProduct.stock;

    //updating file
    if (req.imagePath) {
      fs.unlink(`./uploads/${existingProduct.image}`, async (err) => {
        existingProduct.image = req.imagePath;
        await existingProduct.save();
        return res.status(200).json({
          status: 'success',
          data: existingProduct
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
        return res.status(500).json({ status: 'error', message: error.message });
      })
    } else {
      return res.status(500).json({ status: 'error', message: error.message });
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
        message: 'product deleted successfully'
      })
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};