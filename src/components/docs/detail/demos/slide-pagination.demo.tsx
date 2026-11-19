import React, { useState } from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { SlidePagination } = DEMO_COMPONENTS;

export const SlidePaginationDemo: React.FC = () => {
  const [page, setPage] = useState(3);
  return (
    <div className="flex flex-col items-center gap-3">
      <SlidePagination
        pageCount={12}
        page={page}
        onChange={setPage}
        siblingCount={1}
      />
    </div>
  );
};

export default SlidePaginationDemo;
