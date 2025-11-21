import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useNavigate } from "react-router"
import { useUserLoginMutation } from "./AuthApi/authApi.js"
import { Formik } from "formik"
import * as Yup from 'yup'
import toast from "react-hot-toast"
import { useState } from "react"
import { LockKeyhole, LockKeyholeOpenIcon } from "lucide-react"
import { useDispatch } from "react-redux"
import { setUser } from "./AuthSlice/userSlice.js"

const loginShcema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).required()
})

export default function Login() {
  const [show, setShow] = useState(false);
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button onclick={() => nav('/signup')} variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (val) => {
            try {
              const response = await userLogin(val).unwrap();
              toast.success('Login Successful');
              dispatch(setUser(response.data));

              if (response.data.role === "admin") {
                nav("/admindashboard");
              } else {
                nav("/home");
              }

              console.log(response);
            } catch (error) {
              toast.error(error.data)
            }
          }}
          validationSchema={loginShcema}
        >
          {({ values, handleChange, errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
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
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className='relative'>
                    <Input
                      onChange={handleChange}
                      value={values.password}
                      type={show ? 'text' : 'password'}
                      name='password'
                      placeholder='******'
                      className='pr-9'
                    />

                    <Button
                      type='button'
                      onClick={() => setShow(!show)}
                      variant='ghost'
                      size='icon'
                      className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                    >

                      {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}


                      {/* <span className='sr-only'>Show password</span> */}
                    </Button>
                  </div>
                  {errors.password && touched.password && <p className="text-red-500">
                    {errors.password}
                  </p>}




                </div>

                {isLoading ? <Button size="sm" variant="outline" disabled className="w-full mt-5">
                  <Spinner />
                  Submit
                </Button> : <Button type="submit" className="w-full mt-5">
                  Login
                </Button>}

              </div>
            </form>
          )}
        </Formik>

      </CardContent>
    </Card>
  )
}