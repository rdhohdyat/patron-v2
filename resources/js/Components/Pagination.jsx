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
        const totalPages = links.length - 2; // Exclude previous and next
        const currentPageIndex = links.findIndex((link) => link.active);
        const currentPage = parseInt(links[currentPageIndex]?.label);

        let startPage, endPage;

        if (totalPages <= 4) {
            // Less than or equal to 4 pages, show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // More than 4 pages, show ellipsis logic
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 3;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 2;
                endPage = totalPages;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        const pageLinks = [];
        if (startPage > 1) {
            pageLinks.push(<PaginationEllipsis key="start-ellipsis" />);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageLinks.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={links[i]?.url || "#"}
                        isActive={links[i]?.active}
                        dangerouslySetInnerHTML={{ __html: links[i]?.label }}
                    />
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            pageLinks.push(<PaginationEllipsis key="end-ellipsis" />);
        }

        return (
            <>
                <PaginationItem>
                    <PaginationPrevious href={links[0].url || "#"} />
                </PaginationItem>
                {pageLinks}
                <PaginationItem>
                    <PaginationNext href={links[totalPages + 1].url || "#"} />
                </PaginationItem>
            </>
        );
    };

    return (
        <Pagination>
            <PaginationContent>{renderLinks()}</PaginationContent>
        </Pagination>
    );
}
