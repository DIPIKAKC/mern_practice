import { useParams } from "react-router";
import { useGetSingleProductQuery } from "../../Authentication/AuthApi/productsApi.js";
import ProductUpdateForm from "./ProductCRUD/ProductUpdateForm.jsx";

export default function EditProduct() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetSingleProductQuery(id);
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-pink-950">{error}</h1>

  return (
    <>
      <h1 className="text-2xl font-bold">Product Edit</h1>
      <ProductUpdateForm product={data?.product} />
    </>
  )
}