import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetOrdersQuery } from "../../Authentication/AuthApi/orderApi";
import { base } from "../../App/mainApi";

export default function OrderList({ user }) {
    const { data, isLoading, error } = useGetOrdersQuery({ token: user.token });
    const nav = useNavigate();
    console.log(data)

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <h1 className="text-pink-500">{error?.error || error.data?.message}</h1>

    return (
        <div>
            <div className='w-full p-8'>
                <div className='[&>div]:rounded-sm [&>div]:border'>
                    <Table>
                        <TableHeader>
                            <TableRow className='hover:bg-transparent'>
                                <TableHead>OrderId</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>View More</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.orders.map(item => (
                                <TableRow key={item._id}>

                                    <TableCell className={'flex gap-4 items-center'}>
                                        <Avatar className="size-20">
                                            <AvatarImage src={`${base}/uploads/${item.products?.[0]?.productId?.image}`} alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        {item._id}
                                    </TableCell>
                                    <TableCell>Rs.{item.totalAmount}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => nav(`/order/${item._id}`)} >View More</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </div>
    )
}