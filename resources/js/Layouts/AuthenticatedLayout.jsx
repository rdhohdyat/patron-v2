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
import {
    Menu,
    Search,
} from "lucide-react";
import {Link} from "@inertiajs/react";
import { Toaster } from "@/Components/ui/toaster";

export default function Authenticated({ user, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster></Toaster>
            <header className="sticky top-0 flex h-16  items-center gap-4 border-b bg-background px-4 md:px-6 bg-white z-10">
                <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <div className="logo font-bold text-xl text-emerald-500">
                            PATRON
                        </div>
                    </Link>
                    <Link
                        href={route("store")}
                        className="text-foreground  transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Pemesanan
                    </Link>
                    <Link
                        href={route("product")}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Produk
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Pengaturan
                    </Link>
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
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <div className="logo font-bold text-xl text-emerald-500">
                                    PATRON
                                </div>
                            </Link>
                            <Link
                                href={route("store")}
                                className="hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                // href={route("")}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Pemesanan
                            </Link>
                            <Link
                                href={route("product")}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Produk
                            </Link>
                            <Link
                                href=""
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Pengaturan
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Pencarian product..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
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
                                <DropdownMenuItem>
                                    <Link href={route("profile.edit")}>
                                        Profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link route={"toko"}>Toko</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialogTrigger className="w-full">
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
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
                                <Link method="post" href={route("logout")}>
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

            <main>{children}</main>
        </div>
    );
}
