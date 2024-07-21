import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        no_hp: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onSuccess: () => {
                toast({
                    title: "Akun anda berhasil didaftarkan",
                    variant: "default",
                });
            },
            onError: () => {
                toast({
                    title: "Gagal mendaftarkan akun",
                    variant: "alert",
                });
            },
        });
    };

    const handleNoHpChange = (e) => {
        let value = e.target.value;

        if (!value.startsWith("62")) {
            value = "62" + value.replace(/^62/, "");
        }

        setData("no_hp", value);
    };
    
    return (
        <GuestLayout>
            <Head title="Daftar Akun"></Head>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Mendaftar</h1>
                    <p className="text-balance text-muted-foreground flex-wrap">
                        Masukkan informasi Anda untuk membuat akun
                    </p>
                </div>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="nama" value="Nama" />

                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            placeholder="Masukan nama lengkap anda"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            placeholder="Masukan email"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="no_hp" value="Nomor WhatsApp" />

                        <Input
                            id="no_hp"
                            type="number"
                            name="no_hp"
                            value={data.no_hp}
                            className="mt-1 block w-full"
                            placeholder="Masukan Nomor WhatsApp Anda"
                            onChange={handleNoHpChange}
                            required
                        />

                        <InputError message={errors.no_hp} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            placeholder="Password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Konfirmasi Password"
                        />

                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            placeholder="Konfirmasi Password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col gap-4 items-center mt-4">
                        <Button className="w-full" type="submit">
                            Buat Akun
                        </Button>
                        <Button variant="outline" className="w-full">
                            Daftar dengan Google
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Sudah punya akun?{" "}
                        <Link href={route("login")} className="underline">
                            Masuk
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
