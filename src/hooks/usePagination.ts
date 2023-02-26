import { useState } from 'react';

export const usePagination = (pageSize: number, data: any[]) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const startIndex = (currentPage - 1) * pageSize; // 현재 페이지의 첫 아이템 인덱스
    const endIndex = startIndex + pageSize; // 현재 페이지의 마지막 아이템 다음 인덱스
    const paginatedData = data.slice(startIndex, endIndex); // 현재 페이지의 아이템들만 필터링합니다.

    const totalPages = Math.ceil(data.length / pageSize); // 전체 페이지 수

    const handlePrevPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    return {
        currentPage,
        paginatedData,
        totalPages,
        handlePrevPage,
        handleNextPage,
    };
};
