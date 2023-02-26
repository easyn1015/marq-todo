import { useState } from 'react';

type FilterType = 'All' | 'Active' | 'Completed';

export const useFilter = (data: any[]) => {
    const [filter, setFilter] = useState<FilterType>('All'); // 필터 상태 초기화

    const filteredData =
        filter === 'All'
            ? data
            : filter === 'Active'
            ? data.filter((item) => !item.is_completed)
            : data.filter((item) => item.is_completed);

    const handleFilter = (newFilter: FilterType) => {
        setFilter(newFilter);
    };

    return {
        filteredData,
        filter,
        handleFilter,
    };
};
