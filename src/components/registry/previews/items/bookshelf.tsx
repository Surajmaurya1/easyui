import Bookshelf from '../../../ui/Bookshelf';
import type { ComponentPreviewProps } from '../types';

const books = [
  { id: 'gatsby', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', color: '#1f3d36', pages: 280, type: 'serif' as const },
  { id: 'pride', title: 'Pride and Prejudice', author: 'Jane Austen', color: '#e8dcc3', pages: 410, type: 'serif' as const },
  { id: 'moby', title: 'Moby-Dick', author: 'Herman Melville', color: '#1d2b4a', pages: 580, type: 'serif' as const },
  { id: 'walden', title: 'Walden', author: 'Henry David Thoreau', color: '#7a8f78', pages: 340, type: 'sans' as const },
];

export default function BookshelfPreview({ isHovered = false }: ComponentPreviewProps) {
  return (
    <div className="h-52 w-full overflow-hidden flex items-center justify-center p-2">
      <div className="w-[520px] h-[260px] shrink-0 origin-center" style={{ transform: 'scale(0.72)' }}>
        <Bookshelf books={books} ariaLabel="Bookshelf card preview" />
      </div>
      {isHovered && <span className="sr-only">Hover over a book to preview it</span>}
    </div>
  );
}
