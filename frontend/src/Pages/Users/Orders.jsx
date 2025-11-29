import React from 'react'
import { useGetOrdersQuery } from '../../Authentication/AuthApi/orderApi'
import { useSelector } from 'react-redux';
import { base } from '../../App/mainApi';

export default function Orders() {
    const { user } = useSelector(state => state.userSlice);
    const { data, isLoading, error } = useGetOrdersQuery({ token: user.token });

    if (isLoading) return <h1>Loading orders...</h1>;
    if (error) {

        console.log(error.message)
        return <h1>Error fetching orders</h1>;
    }
    if (!data || data.orders.length === 0) return <h1>No orders yet</h1>;

    return (
        <div className="px-9 py-5 space-y-7">
            <h1 className='font-semibold text-lg'>Your Orders</h1>
            {data.orders.map((order) => (
                <div key={order._id} className="border rounded-2xl p-5 space-y-3 shadow-lg">
                    {order.products.map((p) => (
                        <div key={p._id} className="flex items-center space-x-5">
                            {/* Product Image */}
                            <img
                                src={`${base}/uploads/${p.productId.image}`}
                                alt={p.productId.title}
                                className="w-32 h-32 object-cover rounded-xl"
                            />
                            {/* Product Details */}
                            <div className="flex-1 space-y-1">
                                <h2 className="font-semibold text-lg">{p.productId.title}</h2>
                                <p className="text-gray-600">{p.productId.detail}</p>
                                <p>Quantity: {p.quantity}</p>
                                <p>Price: ₹{p.productId.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                    {/* Order Total */}
                    <div className="pt-2 border-t mt-2 flex justify-between">
                        <p className="font-semibold">Total Amount:</p>
                        <p className="font-bold text-lg">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                    <p className="text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}
