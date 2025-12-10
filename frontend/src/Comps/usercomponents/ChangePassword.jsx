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
import toast from "react-hot-toast"
import { Spinner } from "@/components/ui/spinner"
import { useChangePasswordMutation, useGetUserQuery } from "../../Authentication/AuthApi/userApi"
import { Formik } from "formik"


export default function ChangePassword({ user }) {

    const { isLoading, data, error } = useGetUserQuery({ token: user.token })
    console.log(data);
    const [changePassword, { isLoading: updateLoading }] = useChangePasswordMutation();
    if (isLoading) return <div className="flex gap-2 items-end">
        <h3>Loading</h3>
        <Spinner />
    </div>
    if (error) return <p className="text-pink-500">{error.data.message}</p>

    return (
        <div className="p-5">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        You must know your current password to change it.
                    </CardDescription>

                </CardHeader>
                <CardContent>

                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword: ''
                        }}
                        onSubmit={async (val) => {
                            try {
                                await changePassword({
                                    token: user.token,
                                    body: {
                                        oldPassword:val.oldPassword,
                                        newPassword: val.newPassword
                                    }
                                }).unwrap();
                                toast.success('Password change successful');
                            } catch (error) {
                                toast.error(error.data.message);
                            }


                        }}
                    >
                        {({ values, handleChange, errors, touched, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">


                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Old Password</Label>
                                        <Input
                                            name='password'
                                            onChange={handleChange}
                                            value={values.password}
                                            id="password"
                                            type="text"
                                            placeholder="JohnDoe"
                                        />
                                        {errors.password && touched.password && <p className="text-red-500">
                                            {errors.password}
                                        </p>}

                                    </div>


                                    <div className="grid gap-2">
                                        <Label htmlFor="email">New Password</Label>
                                        <Input
                                            name='password'
                                            onChange={handleChange}
                                            value={values.password}
                                            id="password"
                                            type="password"
                                            placeholder="m@example.com"

                                        />
                                        {errors.password && touched.password && <p className="text-red-500">
                                            {errors.password}
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


