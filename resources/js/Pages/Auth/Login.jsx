import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Input } from "@/Components/ui/input";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";

export default function Login({ status, canResetPassword }) {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => {
                toast({
                    title: "Berhasil login ke akun anda",
                    variant: "default",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal login ke akun anda",
                    variant: "alert",
                });
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Masuk</h1>
                        <p className="text-balance text-muted-foreground">
                            Masukkan email dan password Anda untuk masuk ke akun
                            Anda
                        </p>
                    </div>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="ucup@example.com"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Lupa password anda?
                                    </Link>
                                )}
                            </div>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="*******"
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col gap-4 items-center mt-4">
                            <Button
                                className="w-full"
                                type="submit"
                            >
                                Masuk
                            </Button>
                      
                        </div>
                    </form>

                    <div className="mt-4 text-center text-sm">
                        Belum punya akun?{" "}
                        <Link href={route("register")} className="underline">
                            Daftar Akun
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
