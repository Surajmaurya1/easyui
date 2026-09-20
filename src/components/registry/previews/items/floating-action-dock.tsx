import { motion } from 'framer-motion';
import { Sparkles, Code2, Terminal } from 'lucide-react';
import { FloatingActionDock } from '../../../ui/FloatingActionDock';
import type { ComponentPreviewProps } from '../types';

export default function Preview({ isHovered = false }: ComponentPreviewProps) {
  const hovered = isHovered;
  return (
          <div className="h-52 flex items-center justify-center p-4">
            <motion.div animate={{ y: hovered ? -3 : 0 }} transition={{ type: 'spring', stiffness: 350, damping: 20 }}>
              <FloatingActionDock
                items={[
                  { id: '1', label: 'Code', icon: <Code2 /> },
                  { id: '2', label: 'Term', icon: <Terminal /> },
                  { id: '3', label: 'AI', icon: <Sparkles /> },
                ]}
                activeId={hovered ? '3' : '1'}
              />
            </motion.div>
          </div>
        );
}
