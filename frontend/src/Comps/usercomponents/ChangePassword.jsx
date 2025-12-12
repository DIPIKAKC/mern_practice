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
import { useNavigate } from "react-router"


export default function ChangePassword({ user }) {
    const nav = useNavigate();
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
                                        oldPassword: val.oldPassword,
                                        newPassword: val.newPassword
                                    }
                                }).unwrap();
                                toast.success('Password change successful');
                                nav('/home');
                            } catch (error) {
                                toast.error(error.data.message);
                            }


                        }}
                    >
                        {({ values, handleChange, errors, touched, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">


                                    <div className="grid gap-2">
                                        <Label htmlFor="oldPassword">Old Password</Label>
                                        <Input
                                            name='oldPassword'
                                            onChange={handleChange}
                                            value={values.oldPassword}
                                            id="oldPassword"
                                            type="oldPassword" />
                                        {errors.oldPassword && touched.oldPassword && <p className="text-red-500">
                                            {errors.oldPassword}
                                        </p>}

                                    </div>


                                    <div className="grid gap-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            name='newPassword'
                                            onChange={handleChange}
                                            value={values.newPassword}
                                            id="newPassword"
                                            type="newPassword"
                                        />
                                        {errors.newPassword && touched.newPassword && <p className="text-red-500">
                                            {errors.newPassword}
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


