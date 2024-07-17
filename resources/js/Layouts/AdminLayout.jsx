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

import NavLink from "@/Components/NavLink";

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
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
import { Children } from "react";

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
                            <span className="text-xl text-green-600">PATRON</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href={route("admin.index")}
                                active={route().current("admin.index")}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href={route("admin.market")}
                                active={route().current("admin.market")}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Pasar
                            </Link>
                            <Link
                                href={route("admin.store")}
                                active={route().current("admin.store")}
                                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-3 text-primary transition-all hover:text-primary"
                            >
                                <Store className="h-4 w-4" />
                                Toko
                            </Link>
                            <Link
                                href={route("admin.request")}
                                active={route().current("admin.request")}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Users className="h-4 w-4" />
                                Permintaan
                            </Link>
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
                                <Link
                                    href={route("admin.index")}
                                    active={route().current("admin.index")}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <Home className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    href={route("admin.market")}
                                    active={route().current("admin.market")}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Pasar
                                </Link>
                                <Link
                                    href={route("admin.store")}
                                    active={route().current("admin.store")}
                                    className="flex items-center gap-3 rounded-lg bg-muted px-3 py-3 text-primary transition-all hover:text-primary"
                                >
                                    <Store className="h-4 w-4" />
                                    Toko
                                </Link>
                                <Link
                                    href={route("admin.request")}
                                    active={route().current("admin.request")}
                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <Users className="h-4 w-4" />
                                    Permintaan
                                </Link>
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
                            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
