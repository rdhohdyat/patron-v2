import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Menu, Search } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Toaster } from "@/Components/ui/toaster";
import NavLink from "@/Components/NavLink";

export default function AdminLayout({ user, children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster></Toaster>
            <header className="sticky top-0 flex h-16 items-center border-b bg-white shadow-md px-4 md:px-6 z-10">
                <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5  lg:gap-6  ">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <div className="logo font-bold text-xl text-green-600">
                            PATRON
                        </div>
                    </Link>
                    <NavLink
                        href={route("store")}
                        active={route().current("store")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route("order.index")}
                        active={route().current("order.index")}
                    >
                        Pemesanan
                    </NavLink>
                    <NavLink
                        href={route("product.index")}
                        active={/product\.(index|create|edit)/.test(
                            route().current()
                        )}
                    >
                        Produk
                    </NavLink>
                    <NavLink
                    // href={route("store.edit")}
                    // active={route().current("store.edit")}
                    >
                        Pengaturan
                    </NavLink>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <div className="logo font-bold text-xl text-green-600">
                                    PATRON
                                </div>
                            </Link>
                            <NavLink
                                href={route("store")}
                                active={route().current("store")}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("order.index")}
                                active={route().current("order.index")}
                            >
                                Pemesanan
                            </NavLink>
                            <NavLink
                                href={route("product.index")}
                                active={route().current("product.index")}
                            >
                                Produk
                            </NavLink>
                            <NavLink
                                href=""
                                // active={route().current("product.index")}
                            >
                                Pengaturan
                            </NavLink>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="sm:ml-auto flex-1 sm:flex-initial pl-3">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Pencarian product..."
                                className="pl-8 w-[200px]  sm:w-[300px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="w-8 h-8">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {user.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={route("profile.edit")}>
                                    <DropdownMenuItem>Profil</DropdownMenuItem>
                                </Link>
                                <Link href={route("shop")}>
                                    <DropdownMenuItem>Belanja</DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <AlertDialogTrigger className="w-full">
                                    <DropdownMenuItem className="text-red-500 hover:!bg-red-100 active:!bg-red-300 hover:!text-red-600 ">
                                        Keluar
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-sm">
                                    Apakah anda yakin untuk keluar ?
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="w-full">
                                    Batal
                                </AlertDialogCancel>
                                <Link
                                    method="post"
                                    href={route("logout")}
                                    className="w-full"
                                >
                                    <Button
                                        className="w-full"
                                        variant="destructive"
                                    >
                                        Keluar
                                    </Button>
                                </Link>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </header>

            <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
    );
}
