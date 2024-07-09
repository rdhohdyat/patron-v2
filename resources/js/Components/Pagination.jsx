import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

export default function PaginationComponent({ links }) {
    const renderLinks = () => {
        return links.map((link, index) => {
            if (link.label == "&laquo; Previous") {
                return (
                    <PaginationItem key={index}>
                        <PaginationPrevious href={link.url || "#"} />
                    </PaginationItem>
                );
            }
            if (link.label == "Next &raquo;") {
                return (
                    <PaginationItem key={index}>
                        <PaginationNext href={link.url || "#"} />
                    </PaginationItem>
                );
            }
            return (
                <PaginationItem key={index}>
                    <PaginationLink
                        href={link.url || "#"}
                        isActive={link.active}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                </PaginationItem>
            );
        });
    };

    return (
        <Pagination>
            <PaginationContent>{renderLinks()}</PaginationContent>
        </Pagination>
    );
}
