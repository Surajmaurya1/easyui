import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';

const { Bookshelf } = DEMO_COMPONENTS;

export const meta = { id: 'bookshelf', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([Bookshelf.preload()]);
}

const books = [
  { id: 'gatsby', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, color: '#1f3d36', pages: 280, rating: 4.3, tags: ['Classic', 'Fiction'], type: 'serif' as const, description: 'A summer of parties on Long Island, and the quiet ache behind all that light.' },
  { id: 'pride', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, color: '#e8dcc3', pages: 410, rating: 4.6, tags: ['Romance', 'Classic'], type: 'serif' as const, description: 'Wit, misjudgement, and manners: a love story about learning to see people clearly.' },
  { id: 'moby', title: 'Moby-Dick', author: 'Herman Melville', year: 1851, color: '#1d2b4a', pages: 580, rating: 4.0, tags: ['Adventure'], type: 'serif' as const, description: 'A whaling voyage that becomes an obsession, and a long argument with the sea.' },
  { id: 'frankenstein', title: 'Frankenstein', author: 'Mary Shelley', year: 1818, color: '#4a2a45', pages: 300, rating: 4.2, tags: ['Gothic', 'Sci-fi'], type: 'serif' as const, description: 'A scientist makes a creature, then refuses to take responsibility for it.' },
  { id: 'walden', title: 'Walden', author: 'Henry David Thoreau', year: 1854, color: '#7a8f78', pages: 340, rating: 4.1, tags: ['Nature', 'Essays'], type: 'sans' as const, description: 'Two years in a small cabin, and a case for living deliberately.' },
];

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;
  return (
    <div className="w-full py-8 sm:py-12">
      <Bookshelf key={demoKey} books={books} ariaLabel="Featured books" />
    </div>
  );
}
