import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetProductsQuery } from '../../Authentication/AuthApi/productsApi';
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import RemoveProduct from "./ProductCRUD/RemoveProduct";


export default function AdminPanel() {
  const nav = useNavigate();

  const { isLoading, data, error } = useGetProductsQuery();

  console.log(data);
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-pink-950">{error}</h1>
  return (
    <div className='m-4 '>

      <div className="mb-4">
        <Button
          onClick={() => nav('/product-add')}
          className={'bg-green-700'}>Add Product</Button>
      </div>

      <div className='w-full'>
        <div className='[&>div]:rounded-sm [&>div]:border'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Product Name</TableHead>
                <TableHead>Product Id</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map(item => (
                <TableRow key={item._id}>
                  {/* <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage src={`${base}/${item.image}`} alt={item.image} />

                      </Avatar>
                      <div className='font-medium'>{item.title}</div>
                    </div>
                  </TableCell> */}
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell className='grid grid-cols-2 gap-2'>
                    <Button onClick={() => nav(`/product-edit/${item._id}`)}>
                      <EditIcon className='text-white' />
                    </Button>
                    {/* <Button> */}
                    <RemoveProduct id={item._id} />
                    {/* </Button> */}
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