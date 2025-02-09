import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
    Store,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import AdminNavLink from "@/Components/AdminNavLink";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
import { Children } from "react";
import { Toaster } from "@/Components/ui/toaster";

export default function AdminLayout({ user, children }) {
    return (
        <div className="grid min-h-screen w-full bg-gray-100 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r-2 bg-white md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-bold"
                        >
                            <span className="text-xl text-green-600">
                                PATRON
                            </span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 font-medium lg:px-4">
                            <AdminNavLink
                                href={route("admin.index")}
                                active={route().current("admin.index")}
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </AdminNavLink>
                            <AdminNavLink
                                href={route("admin.market")}
                                active={route().current("admin.market")}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Pasar
                            </AdminNavLink>
                            <AdminNavLink
                                href={route("admin.store")}
                                active={route().current("admin.store")}
                            >
                                <Store className="h-4 w-4" />
                                Toko
                            </AdminNavLink>
                            <AdminNavLink
                                href={route("admin.request")}
                                active={route().current("admin.request")}
                            >
                                <Users className="h-4 w-4" />
                                Permintaan
                            </AdminNavLink>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 bg-white items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6">
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
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <AdminNavLink
                                    href={route("admin.index")}
                                    active={route().current("admin.index")}
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </AdminNavLink>
                                <AdminNavLink
                                    href={route("admin.market")}
                                    active={route().current("admin.market")}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Pasar
                                </AdminNavLink>
                                <AdminNavLink
                                    href={route("admin.store")}
                                    active={route().current("admin.store")}
                                >
                                    <Store className="h-5 w-5" />
                                    Toko
                                </AdminNavLink>
                                <AdminNavLink
                                    href={route("admin.request")}
                                    active={route().current("admin.request")}
                                >
                                    <Users className="h-5 w-5" />
                                    Permintaan
                                </AdminNavLink>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Cari Pasar..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
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
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {/* <Toaster></Toaster> */}
                    {children}
                </main>
            </div>
        </div>
    );
}
