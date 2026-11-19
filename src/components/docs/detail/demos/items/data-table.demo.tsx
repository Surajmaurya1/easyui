import type { DemoProps } from '../../demo-types';
import { DEMO_COMPONENTS } from '../../demo-components';
import type { DataTableColumn } from '../../../../ui/DataTable';

const { DataTable, Sparkline, DeltaPill } = DEMO_COMPONENTS;

export const meta = { id: 'data-table', aliases: [] } as const;

export async function preload(): Promise<void> {
  await Promise.all([DataTable.preload(), Sparkline.preload(), DeltaPill.preload()]);
}

interface Product {
  id: number;
  name: string;
  category: string;
  revenue: number;
  orders: number;
  conversion: number;
  trend: number[];
  change: number;
}

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NAMES: [string, string][] = [
  ['Aero Desk Lamp', 'Lighting'],
  ['Linen Throw', 'Textiles'],
  ['Oak Side Table', 'Furniture'],
  ['Ceramic Mug Set', 'Kitchen'],
  ['Studio Headphones', 'Audio'],
  ['Merino Beanie', 'Apparel'],
  ['Brass Planter', 'Home'],
  ['Walnut Tray', 'Kitchen'],
  ['Canvas Tote', 'Accessories'],
  ['Pocket Notebook', 'Stationery'],
  ['Noise Speaker', 'Audio'],
  ['Wool Rug', 'Textiles'],
  ['Pour-over Kit', 'Kitchen'],
  ['Floor Lamp', 'Lighting'],
  ['Leather Wallet', 'Accessories'],
  ['Desk Mat', 'Stationery'],
  ['Glass Carafe', 'Kitchen'],
  ['Linen Shirt', 'Apparel'],
  ['Wall Clock', 'Home'],
  ['Bamboo Shelf', 'Furniture'],
  ['Soy Candle', 'Home'],
  ['Travel Mug', 'Kitchen'],
  ['Camp Blanket', 'Textiles'],
  ['Cork Coasters', 'Home'],
];

const PRODUCTS: Product[] = (() => {
  const r = rng(42);
  return NAMES.map(([name, category], i) => {
    const base = 800 + r() * 9200;
    const trend = Array.from({ length: 14 }, (_, k) =>
      Math.round(base / 14 + (r() - 0.45) * (base / 22) + k * (r() - 0.35) * 18),
    );
    const revenue = Math.round(trend.reduce((a, b) => a + b, 0) * 7.2);
    return {
      id: i + 1,
      name,
      category,
      revenue,
      orders: Math.round(revenue / (28 + r() * 70)),
      conversion: Math.round((1.2 + r() * 5.6) * 10) / 10,
      trend,
      change: Math.round((trend[13] / Math.max(1, trend[0]) - 1) * 1000) / 10,
    };
  });
})();

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const COLUMNS: DataTableColumn<Product>[] = [
  {
    key: 'name',
    header: 'Product',
    primary: true,
    cell: (r) => (
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate">{r.name}</span>
        <span className="mt-0.5 truncate text-[12px] font-normal text-neutral-500">{r.category}</span>
      </span>
    ),
  },
  {
    key: 'revenue',
    header: 'Revenue',
    align: 'right',
    cell: (r) => <span className="tabular-nums">{usd.format(r.revenue)}</span>,
  },
  {
    key: 'orders',
    header: 'Orders',
    align: 'right',
    cell: (r) => <span className="tabular-nums">{r.orders.toLocaleString('en-US')}</span>,
  },
  {
    key: 'conversion',
    header: 'Conv.',
    align: 'right',
    cell: (r) => <span className="tabular-nums">{r.conversion.toFixed(1)}%</span>,
    hideOnMobile: true,
  },
  {
    key: 'trend',
    header: '14-day trend',
    sortable: false,
    width: '132px',
    fullWidthOnMobile: true,
    cell: (r) => <Sparkline data={r.trend} width={104} />,
  },
  {
    key: 'change',
    header: 'Change',
    align: 'right',
    width: '96px',
    cell: (r) => <DeltaPill value={r.change} />,
  },
];

export default function ComponentDemo(props: DemoProps) {
  const { demoKey } = props;

  return (
    <div key={demoKey} className="w-full max-w-5xl min-w-0 py-2">
      <div className="mb-5">
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-neutral-900 dark:text-neutral-50">
          Top products
        </h1>
        <p className="mt-1 text-[13.5px] text-neutral-500">
          Sort any column, select rows, or search. On a phone it turns into cards.
        </p>
      </div>
      <DataTable
        rows={PRODUCTS}
        columns={COLUMNS}
        getRowLabel={(r: Product) => r.name}
        defaultSort={{ key: 'revenue', dir: 'desc' }}
        pageSize={12}
        ariaLabel="Top products"
        bulkActions={(ids: (string | number)[]) => (
          <button
            type="button"
            onClick={() => alert(`Exporting ${ids.length} products`)}
            className="h-9 rounded-xl bg-neutral-900 px-3.5 text-[12.5px] font-medium text-white transition-transform active:scale-[0.97] dark:bg-white dark:text-neutral-900"
          >
            Export
          </button>
        )}
      />
    </div>
  );
}
