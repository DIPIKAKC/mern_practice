import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { checkFile } from '../middleware/checkFile.js';
import { checkId } from '../middleware/checkId.js';
import { updateCheckFile } from '../middleware/updateCheckFile.js';
import { checkAdmin, checkUser } from '../middleware/checkUser.js';



const router = express.Router();

router.route('/api/products')
  .get(getProducts)
  .post(checkUser, checkAdmin, checkFile, createProduct).all(notAllowed);

router.route('/api/products/:id')
  .get(checkId, getProduct) //req,res,next  as a callback function sangai jancha... aaune kura ra pass garne kura yeutai bhayo bhane pass nagarda ni huncha i.e. req,res 
  .patch(checkId, updateCheckFile, updateProduct)
  .delete(checkId, deleteProduct).all(notAllowed);



export default router;

