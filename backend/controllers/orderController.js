import Order from "../models/Order.js"
import Product from "../models/Products.js";

export const createOrder = async (req, res) => {
    const { totalAmount, products } = req.body ?? {};
    try {
        const newOrder = await Order.create({
            totalAmount,
            userId: req.userId,
            products,
        })
        return res.status(200).json({
            status: 'success',
            message: 'Order created successfully',
            newOrder
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const getOrders = async (req, res) => {
    
    try {
        if (role==='admin'){
            const orders = await Order.find().populate([
                {
                    path: 'products.productId',
                    model: 'Product'
                },
                {
                    path: 'userId',
                    model: 'User',
                    select:'-password'
                }
    
            ]
            );
            return res.status(200).json({
                status: 'success',
                message: 'Order created successfully',
                orders
            })
        }else{
            const orders = await Order.find({userId:req.userId}).populate(
                {
                    path: 'products.productId',
                    model: 'Product'
                }
            );
            return res.status(200).json({
                status: 'success',
                message: 'Order created successfully',
                orders
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}