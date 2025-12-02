import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as Yup from 'yup'
import toast from "react-hot-toast"
import { Spinner } from "@/components/ui/spinner"
import { useGetUserQuery, useUpdateUserMutation } from "../../Authentication/AuthApi/userApi"
import { Formik } from "formik"

const loginShcema = Yup.object({
  email: Yup.string().email().required(),
  username: Yup.string().min(3).required()
})

export default function UpdateUser({ user }) {

  const { isLoading, data, error } = useGetUserQuery({token: user.token})
  console.log(data);
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  if (isLoading) return <div className="flex gap-2 items-end">
    <h3>Loading</h3>
    <Spinner />
  </div>
  if (error) return <p className="text-pink-500">{error.data.message}</p>




  return (
    <div className="p-5">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>
            Enter your details to update
          </CardDescription>

        </CardHeader>
        <CardContent>

          <Formik
            initialValues={{
              username: data?.username || '',
              email: data?.email || ''
            }}
            onSubmit={async (val) => {


              try {
                await updateUser({
                  token,
                  body: {
                    username: val.username,
                    email: val.email
                  }
                }).unwrap();
                toast.success('Update successful');
              } catch (error) {
                toast.error(error.data.message);
              }


            }}
            validationSchema={loginShcema}
          >
            {({ values, handleChange, errors, touched, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">


                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      name='username'
                      onChange={handleChange}
                      value={values.username}
                      id="username"
                      type="text"
                      placeholder="JohnDoe"
                    />
                    {errors.username && touched.username && <p className="text-red-500">
                      {errors.username}
                    </p>}

                  </div>


                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name='email'
                      onChange={handleChange}
                      value={values.email}
                      id="email"
                      type="email"
                      placeholder="m@example.com"

                    />
                    {errors.email && touched.email && <p className="text-red-500">
                      {errors.email}
                    </p>}

                  </div>





                </div>

                {updateLoading ? <Button size="sm" variant="outline" disabled className="w-full mt-5">
                  <Spinner />
                  Submit
                </Button> : <Button type="submit" className="w-full mt-5">
                  Submit
                </Button>}





              </form>
            )}
          </Formik>

        </CardContent>

      </Card>
    </div >
  )
}


