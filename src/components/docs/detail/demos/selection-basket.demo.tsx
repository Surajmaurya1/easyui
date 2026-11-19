import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { DEMO_COMPONENTS } from '../demo-registry';
const { SelectionBasket } = DEMO_COMPONENTS;

export const SelectionBasketShowcase: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['item-1', 'item-3']);
  const items = [
    { id: 'item-1', name: 'invoice_oct_2026.pdf', size: '2.4 MB', type: 'PDF' },
    { id: 'item-2', name: 'design_system_tokens.json', size: '84 KB', type: 'JSON' },
    { id: 'item-3', name: 'customer_churn_analytics.csv', size: '1.8 MB', type: 'CSV' },
    { id: 'item-4', name: 'production_ssl_certificates.pem', size: '12 KB', type: 'KEY' },
  ];

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto min-h-[340px] pb-16 p-4 rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] flex flex-col justify-between select-none shadow-md">
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs text-[#6B6B6B] font-mono">
          <span>Select items to trigger bottom toolbar</span>
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-[11px] text-[#A1A1A1] hover:text-white transition-colors underline underline-offset-2 cursor-pointer"
          >
            {selectedIds.length === items.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="space-y-1.5">
          {items.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={cn(
                  'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
                  isChecked
                    ? 'bg-[#141414] border-[#4A4A4A] text-white shadow-xs'
                    : 'bg-[#0E0E0E] border-[#1F1F1F] text-[#A1A1A1] hover:bg-[#141414] hover:text-[#FAFAFA]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                      isChecked
                        ? 'bg-[#FAFAFA] border-[#FAFAFA] text-[#050505]'
                        : 'border-[#1F1F1F] bg-[#141414]'
                    )}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-mono">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#6B6B6B]">
                  <span>{item.type}</span>
                  <span>·</span>
                  <span>{item.size}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Docked Selection Basket in contained mode */}
      <SelectionBasket
        mode="contained"
        selectedCount={selectedIds.length}
        totalCount={items.length}
        onClearSelection={() => setSelectedIds([])}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default SelectionBasketShowcase;
