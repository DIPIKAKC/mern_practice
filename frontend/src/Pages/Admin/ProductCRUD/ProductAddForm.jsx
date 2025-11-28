import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Formik } from "formik"
import * as Yup from 'yup'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useCreateProductMutation } from "../../../Authentication/AuthApi/productsApi"
import toast from "react-hot-toast"


const valSchema = Yup.object({
    title: Yup.string().min(4).required(),
    detail: Yup.string().min(10).required(),
    price: Yup.string().required(),
    category: Yup.string().required(),
    brand: Yup.string().required(),
    image: Yup.mixed()
        .test('fileType', 'Unsupported File Format', (val) => {
            return val && ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(val.type);
        })
        .test('fileSize', 'file is too large', (val) => {
            return val && val.size <= 5 * 1024 * 1024;
        })
        .required(),
});


export default function ProductAddForm() {
    const nav = useNavigate();
    const { user } = useSelector((state) => state.userSlice)
    const [createProduct, { isLoading }] = useCreateProductMutation();
    return (
        <div>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Product Create</CardTitle>
                </CardHeader>
                <CardContent>
                    <Formik
                        initialValues={{
                            title: '',
                            detail: '',
                            price: '',
                            category: '',
                            brand: '',
                            image: '',
                            imageReview: '',
                            stock:''
                        }}
                        onSubmit={async (val) => {
                            try {
                                const formData = new FormData();
                                formData.append('title', val.title);
                                formData.append('detail', val.detail);
                                formData.append('price', val.price);
                                formData.append('category', val.category);
                                formData.append('brand', val.brand);
                                formData.append('image',  val.image);
                                formData.append('stock',  val.stock);
                                await createProduct({
                                    token: user.token,
                                    body: formData
                                }).unwrap();
                                toast.success('Product added successfully');
                                nav(-1);
                            } catch (err) {
                                toast.error(err.data.message);
                            }
                        }}
                        validationSchema={valSchema}
                    >
                        {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">

                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            name="title"
                                            onChange={handleChange}
                                            value={values.title}
                                            id="title"
                                            type="text"
                                            placeholder="product title"
                                        />
                                        {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="detail">Detail</Label>
                                        <textarea
                                            name="detail"
                                            onChange={handleChange}
                                            value={values.detail}
                                            id="detail"
                                            type="text"
                                            placeholder="product detail"
                                        />
                                        {touched.detail && errors.detail && <p className="text-red-500">{errors.detail}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            name="price"
                                            onChange={handleChange}
                                            value={values.price}
                                            id="price"
                                            type="number"
                                            placeholder="product price"
                                        />
                                        {touched.price && errors.price && <p className="text-red-500">{errors.price}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                            name="stock"
                                            onChange={handleChange}
                                            value={values.stock}
                                            id="stock"
                                            type="number"
                                            placeholder="product stock"
                                        />
                                        {touched.stock && errors.stock && <p className="text-red-500">{errors.stock}</p>}
                                    </div>

                                    <Select
                                        name="category"
                                        onValueChange={(value) => setFieldValue('category', value)}
                                    >
                                        <SelectTrigger
                                            className="w-full">
                                            <SelectValue placeholder="Select a Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="food">Food</SelectItem>
                                                <SelectItem value="clothes">Clothes</SelectItem>
                                                <SelectItem value="meow">Tech</SelectItem>
                                                <SelectItem value="jewels">Jewellery</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        name="brand"
                                        onValueChange={(value) => setFieldValue('brand', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a brand" />
                                        </SelectTrigger>
                                        <SelectContent>

                                            <SelectGroup>
                                                <SelectItem value="nike">Addidas</SelectItem>
                                                <SelectItem value="bur">Samsung</SelectItem>
                                                <SelectItem value="huh">Tanishq</SelectItem>
                                                <SelectItem value="bye">Kfc</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>


                                    <div className="grid gap-2">
                                        <Label htmlFor="image">Select an image</Label>
                                        <Input
                                            name="image"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setFieldValue('imageReview', URL.createObjectURL(file));
                                                setFieldValue('image', file);
                                            }}

                                            id="image"
                                            type="file"

                                        />
                                        {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
                                        {values.imageReview && !errors.image && <img src={values.imageReview} alt="" />}
                                    </div>

                                    {isLoading ? <Button size="sm" variant="outline" disabled className="w-full mt-5">
                                        <Spinner />
                                        Submit
                                    </Button> : <Button type="submit" className="w-full mt-5">
                                        Submit
                                    </Button>}


                                </div>

                            </form>


                        )}
                    </Formik>







                </CardContent>

            </Card>



        </div>
    )
}



