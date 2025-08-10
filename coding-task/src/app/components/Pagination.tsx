// app/components/Pagination.tsx
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalStories: number;
  storiesPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalStories,
  storiesPerPage,
}) => {
  const totalPages = Math.ceil(totalStories / storiesPerPage);
  const hasMore = currentPage < totalPages;

  return (
    <div className="mt-6">
      {hasMore && (
        <Link href={`/?page=${currentPage + 1}`} className="text-orange-600 hover:underline">
          More
        </Link>
      )}
    </div>
  );
};

export default Pagination;
