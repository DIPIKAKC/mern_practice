import React from 'react'
import { useGetSingleProductQuery } from '../../Authentication/AuthApi/productsApi'
import { useParams } from 'react-router';
import { base } from '../../App/mainApi';
import AddToCart from './AddToCart';

export default function ProductDetail() {
    const { id } = useParams();
    const { isLoading, error, data } = useGetSingleProductQuery(id);
    if (isLoading) return <h1 className="text-center text-white">Loading...</h1>;
    if (error) return <h1 className="text-center text-red-500">Error loading product</h1>;

    return (
        <div className=" max-w-7xl mx-auto grid grid-cols-2 mt-11 gap-10">
            <div>
                <img src={`${base}/uploads/${data.product.image}`} alt="" />
            </div>
            <div className="space-y-4">
                <h1>{data.product.title}</h1>
                <p className="text-zinc-500">Price:- {data.product.price}</p>
                <p className="text-zinc-500">Stock:- {data.product.stock}</p>
                <p className="text-zinc-700">{data.product.detail}</p>
                <hr />
                <div>
                    <AddToCart  product={data.product}/>
                </div>
            </div>




        </div>
    )
}