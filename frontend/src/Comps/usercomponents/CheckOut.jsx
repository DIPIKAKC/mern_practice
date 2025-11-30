import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableHead, TableCell, TableRow, TableHeader } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { base } from '../../App/mainApi';
import { clearCart, removeCart, setCart } from '../../Authentication/AuthSlice/cartSlice';
import DialogBox from '../DialogBox';
import { useCreateOrderMutation } from '../../Authentication/AuthApi/orderApi';
import toast from 'react-hot-toast';

export default function CheckOut() {
    const { carts } = useSelector((state) => state.cartSlice);
    const dispatch = useDispatch();

    const handleAdd = (item) => {
        dispatch(setCart({ ...item, qty: item.qty + 1 }));
    }
    const handleRemove = (item) => {
        dispatch(setCart({ ...item, qty: item.qty - 1 }));
    }

    const handleRemoveItem = (item) => {
        dispatch(removeCart(item));
    }

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const { user } = useSelector((state) => state.userSlice)
    const totalAmount = carts.reduce((total, item) => total + item.price * item.qty, 0);
    const handleOrder = async () => {
        try {
            await createOrder({
                token: user.token,
                body: {
                    products: carts.map((item) => ({
                        productId: item.id,
                        quantity: item.qty
                    })),
                    totalAmount
                }
            }).unwrap();
            dispatch(clearCart());
            toast.success('Order placed successfully')
        } catch (error) {
            toast.error(error.message)
            console.log(error.data.message)
        }
    }

    return (
        <div className='m-5'>
            <h2 className='font-semibold mb-5 text-xl'>CheckOut Page</h2>

            <div className='grid grid-cols-[1.4fr_1fr] gap-10'>
                {/* left pane */}
                <div className='w-full'>
                    <div className='[&>div]:rounded-sm [&>div]:border'>
                        <Table>
                            <TableHeader>
                                <TableRow className='hover:bg-transparent'>

                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className='w-0'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {carts.map(item => (
                                    <TableRow key={item.id} className='has-data-[state=checked]:bg-muted/50'>

                                        <TableCell>
                                            <div className='flex items-center gap-3'>
                                                <Avatar className='rounded-sm'>
                                                    <AvatarImage src={`${base}/${item.image}`} alt={item.image} />
                                                    <AvatarFallback className='text-xs'>{item.title}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className='font-medium'>{item.title}</div>
                                                    <span className='text-muted-foreground mt-0.5 text-xs'>{item.brand}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>
                                            <div className='flex gap-5 items-center'>
                                                <Button
                                                    onClick={() => handleRemove(item)}
                                                    disabled={item.qty === 1}
                                                    variant="outline" size="icon">
                                                    <MinusIcon />
                                                </Button>
                                                <span>{item.qty}</span>
                                                <Button
                                                    disabled={item.qty === item.stock}
                                                    onClick={() => handleAdd(item)} variant="outline" size="icon">
                                                    <PlusIcon />
                                                </Button>
                                            </div>

                                        </TableCell>
                                        <TableCell>Rs. {item.price}</TableCell>
                                        <TableCell className='flex items-center gap-1'>

                                            <DialogBox
                                                detail={'This action cannot be undone. Are you sure you want to remove your orders?'}
                                                func={() => handleRemoveItem(item)}
                                            >
                                                <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${item.id}-remove`}>
                                                    <Trash2Icon />
                                                </Button>
                                            </DialogBox>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </div>

                {/* right pane */}
                <div className='flex flex-col shadow-gray-400 shadow-lg rounded-xl p-4 '>
                    <h1 className='font-bold text-lg'>Order Summary</h1>

                    <div className='space-y-4 mt-6'>
                        {carts.map((item) => {
                            return <div key={item._id} className='shadow-lg rounded-lg p-3'>
                                <div className='flex justify-between gap-14'>
                                    <span>{item.title}</span>
                                    <span>{item.qty} x {item.price}</span>
                                </div>
                            </div>
                        })}
                        <p>Total Products: {carts.length}</p>
                        <div>
                            <p>Total Price: {carts.reduce((total, item) => total + item.price * item.qty, 0)}</p>
                        </div>

                        <DialogBox detail={'This action cannot be undone. Are you sure you want to checkout your orders?'} func={handleOrder}>
                            <Button disabled={isLoading || !carts.length} className={'w-full py-6 bg-green-700'}>CheckOut</Button>
                        </DialogBox>
                    </div>
                </div>

            </div>

        </div>
    )
}

