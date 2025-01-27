import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex w-[100px] sm:px-3 sm:py-3 sm:w-full items-center text-gray-600 font-medium  transition duration-150 ease-in-out" +
                (active ? " text-green-600 " : " ") +
                className
            }
        >
            {children}
        </Link>
    );
}
