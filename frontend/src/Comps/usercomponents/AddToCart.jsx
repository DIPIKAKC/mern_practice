import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../Authentication/AuthSlice/cartSlice';
import { useNavigate } from 'react-router';

export default function AddToCart({ product }) {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const { carts } = useSelector((state) => state.cartSlice);
    const isExist = carts.find((cart) => cart.id === product._id);

    const [qty, setQty] = useState(isExist?.qty || 1);

    useEffect(() => {
        if (isExist) setQty(isExist.qty);
    }, [isExist]);

    const increment = () => setQty(qty + 1);
    const decrement = () => setQty(qty - 1);
 
    //'action.payload' object in cartSlice
    const handleCart = () => {
        dispatch(setCart({
            id: product._id,
            title: product.title,
            detail: product.detail,
            category: product.category,
            price: product.price,
            qty
        }))
        nav('/checkout');
    }
    return (
        <div className='space-y-5'>
            <div className='flex gap-5'>
                <Button disabled={qty === 1} onClick={decrement}>
                    <MinusIcon />
                </Button>
                <h3>{qty}</h3>
                <Button disabled={qty === product.stock} onClick={increment}>
                    <PlusIcon />
                </Button>
            </div>
            <Button onClick={handleCart} className={'bg-green-600'}>Add To Cart</Button>
        </div>
    )
}
