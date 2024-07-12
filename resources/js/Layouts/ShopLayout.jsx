import { useState } from "react";
import { Link } from "@inertiajs/react";
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
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/Components/ui/sheet";
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
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
    ShoppingBasket,
    CircleUserRound,
    LogOut,
    Store,
} from "lucide-react";
import useCartStore from "@/lib/zustand/cartStore";
import { Toaster } from "@/Components/ui/toaster";
import { formatRupiah } from "@/lib/convert";
import EmptyCart from "@/Components/EmptyCart";
import { useToast } from "@/Components/ui/use-toast";

export default function ShopLayout({ user, header, children }) {
    const { toast } = useToast();
    const {
        cart,
        total,
        increaseQty,
        decreaseQty,
        removeFromCart,
        calculateTotal,
        clearCart,
    } = useCartStore();

    const handleIncreaseQty = (productId) => {
        increaseQty(productId);
        calculateTotal();
    };

    const handleDecreaseQty = (productId) => {
        decreaseQty(productId);
        calculateTotal();
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        toast({
            title: "Produk dihapus dari keranjang",
            variant: "alert",
        });
        calculateTotal();
    };

    const handleSearch = () => {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster/>
            <header className="sticky border top-0 left-0 right-0 bg-white z-20">
                <div className="h-16 flex justify-between px-5 sm:justify-around items-center">
                    <Link href={route("shop")}>
                        <div className="logo font-bold text-xl text-green-600">
                            PATRON
                        </div>
                    </Link>

                    <form onSubmit={handleSearch}>
                        <div className="hidden border h-10 sm:flex sm:w-[700px] rounded-xl px-6  items-center gap-2">
                            <Search className="text-gray-400"></Search>
                            <input
                                type="text"
                                className="sm:w-full focus:outline-none text-sm"
                                placeholder="Cari Product, Lapak dan Pasar"
                            />
                        </div>
                    </form>

                    <div className="flex items-center">
                        <Link
                            href={route("shop.search")}
                            variant="link"
                            className="sm:hidden "
                        >
                            <Search />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild className="">
                                <Button variant="link">
                                    <div className="relative">
                                        <ShoppingBasket />
                                        {cart.length > 0 && (
                                            <div className="bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                                                {cart.length}
                                            </div>
                                        )}
                                    </div>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="flex flex-col h-full justify-between">
                                <div className="overflow-y-auto flex flex-col gap-2 max-h-[80%] sm:max-h-[80%] flex-grow">
                                    <SheetHeader>
                                        <SheetTitle>
                                            Keranjang Belanja
                                        </SheetTitle>
                                    </SheetHeader>
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between border p-2 rounded"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image}
                                                    className="w-[70px] h-[70px] object-cover"
                                                    alt={item.name}
                                                />
                                                <div className="text-start">
                                                    <h1 className="text-sm">
                                                        {item.name}
                                                    </h1>
                                                    <p className="font-semibold">
                                                        {formatRupiah(
                                                            item.price
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="sm:flex items-center gap-3">
                                                <div className="flex items-center gap-2 w-24 justify-between">
                                                    <Button
                                                        size="xs"
                                                        onClick={() =>
                                                            handleDecreaseQty(
                                                                item.id
                                                            )
                                                        }
                                                        variant="outline"
                                                    >
                                                        -
                                                    </Button>
                                                    <div className="">
                                                        {parseInt(item.qty)}
                                                    </div>
                                                    <Button
                                                        size="xs"
                                                        onClick={() =>
                                                            handleIncreaseQty(
                                                                item.id
                                                            )
                                                        }
                                                        variant="outline"
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleRemoveFromCart(
                                                            item.id
                                                        )
                                                    }
                                                    className="mt-3 w-full h-8"
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {cart.length == 0 && <EmptyCart />}
                                </div>
                                <SheetFooter>
                                    {cart.length > 0 && (
                                        <div className="flex flex-col w-full">
                                            <div className="text-black">
                                                <h1 className="text-lg font-semibold">
                                                    Rincian pembayaran
                                                </h1>
                                                <div>
                                                    <tr>
                                                        <td>Sub-total</td>
                                                        <td className="w-5">
                                                            :
                                                        </td>
                                                        <td>
                                                            {formatRupiah(
                                                                total
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ongkos Kirim</td>
                                                        <td className="w-5">
                                                            :
                                                        </td>
                                                        <td>Rp.10.000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h1 className="font-semibold text-xl">
                                                                Total Pembayaran
                                                            </h1>
                                                        </td>
                                                        <td className="w-5">
                                                            :
                                                        </td>
                                                        <td className="text-xl">
                                                            {formatRupiah(
                                                                total
                                                            )}
                                                        </td>
                                                    </tr>
                                                </div>
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full mt-3"
                                            >
                                                Checkout
                                            </Button>
                                        </div>
                                    )}
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
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
                                        <DropdownMenuItem>
                                            Profil
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={route("store")}>
                                        <DropdownMenuItem>
                                            Toko
                                        </DropdownMenuItem>
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
                </div>
            </header>

            <main className="sm:w-[80%] mx-auto  p-5">{children}</main>
            <footer className=" text-center py-4 pb-24">
                <div>&copy; 2024 Patron. All rights reserved.</div>
            </footer>
        </div>
    );
}
