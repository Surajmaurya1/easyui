import React from 'react';
import { DEMO_COMPONENTS } from '../demo-registry';
const { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose } = DEMO_COMPONENTS;

export const SheetDemo: React.FC = () => (
  <Sheet>
    <SheetTrigger className="h-9 rounded-lg bg-[var(--text-primary)] px-4 text-xs font-medium text-[var(--bg)] cursor-pointer">
      Open sheet
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes, then save. Drag the sheet right — or swipe on touch — to dismiss.
        </SheetDescription>
      </SheetHeader>
      <SheetBody>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Name</label>
            <input
              defaultValue="Suraj Maurya"
              className="h-9 w-full rounded-lg border border-neutral-200 bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 dark:border-neutral-800 dark:focus-visible:ring-neutral-600/50"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Email</label>
            <input
              defaultValue="suraj@easyui.site"
              className="h-9 w-full rounded-lg border border-neutral-200 bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 dark:border-neutral-800 dark:focus-visible:ring-neutral-600/50"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Bio</label>
            <textarea
              rows={3}
              defaultValue="Building tactile, micro-animated React components."
              className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-sm outline-none resize-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 dark:border-neutral-800 dark:focus-visible:ring-neutral-600/50"
            />
          </div>
        </div>
      </SheetBody>
      <SheetFooter>
        <SheetClose className="h-9 rounded-lg px-3 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
          Cancel
        </SheetClose>
        <SheetClose className="h-9 rounded-lg bg-neutral-900 px-4 text-sm text-white dark:bg-white dark:text-neutral-900">
          Save
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default SheetDemo;
