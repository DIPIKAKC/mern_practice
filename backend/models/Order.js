import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true
    },
    //parent referencing
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema)

export default Order;