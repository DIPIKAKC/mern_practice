

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { useGetProductsQuery } from '../../Authentication/AuthApi/productsApi'
import { useNavigate } from 'react-router'
import { base } from '../../App/mainApi'

export const ProductCard = () => {
    //   const [liked, setLiked] = useState<boolean>(false)
    const { data } = useGetProductsQuery();
    const nav = useNavigate();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.products?.map((item) => {
                return <div
                    key={item._id}
                    onClick={() => nav(`/products/${item._id}`)}
                    className='rounded-xl shadow-lg bg-white flex flex-col overflow-hidden'>
                    <div className='flex h-50 items-center justify-center'>
                        <img
                            src={`${base}/uploads/${item.image}`}
                            alt={item.title}
                            className="w-full h-60 object-cover rounded-t-xl"
                        />

                    </div>
                    <Card className='shadow-xl border-none'>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription className='flex items-center gap-2'>
                                <Badge variant='outline' className='rounded-sm'>
                                    {item.category}
                                </Badge>
                                <Badge variant='outline' className='rounded-sm'>
                                    {item.brand}
                                </Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className='line-clamp-3'>
                                {item.detail}
                            </p>
                        </CardContent>
                        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium uppercase'>Price</span>
                                <span className='text-xl font-semibold'>${item.price}</span>
                            </div>
                            <Button size='lg'>Add to cart</Button>
                        </CardFooter>
                    </Card>
                </div>
            })}
        </div>
    )
}




