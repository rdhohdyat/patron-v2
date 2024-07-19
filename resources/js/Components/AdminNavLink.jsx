import { Link } from "@inertiajs/react";

export default function AdminNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "flex items-center gap-3 rounded-lg px-3 py-3 text-gray-600 transition-all hover:text-primary " +
                (active ? "text-green-600 " : " ") +
                className
            }
        >
            {children}
        </Link>
    );
}
