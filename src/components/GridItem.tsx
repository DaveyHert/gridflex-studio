import React from 'react';
import { useLayout } from '@/context/LayoutContext';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';
import { GridItem as GridItemType } from '@/types';
import { motion } from 'framer-motion';

interface GridItemProps {
  item: GridItemType;
  index: number;
}

const GridItem: React.FC<GridItemProps> = ({ item, index }) => {
  const { updateGridItem, removeGridItem, duplicateGridItem } = useLayout();

  // Animation variants for the card
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 18, // More damping for smoother motion
        stiffness: 400, // Less stiffness
        duration: 0.7 // Longer duration
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.4 // Slower exit
      }
    }
  };

  // Animation variants for the input fields
  const inputVariants = {
    changed: { 
      scale: [1, 1.03, 1], // Smaller scale change for subtler effect
      backgroundColor: ["rgba(41, 41, 46, 0.5)", "rgba(46, 204, 113, 0.15)", "rgba(41, 41, 46, 0.5)"],
      transition: { 
        duration: 0.8, // Longer duration
        times: [0, 0.3, 1] // Adjusted timing
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={cardVariants}
      layout
      layoutId={`grid-item-card-${item.id}`}
    >
      <Card className="bg-muted border border-border">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <motion.span 
              className="text-sm font-medium"
              layoutId={`grid-item-title-${item.id}`}
            >
              Grid Item #{index + 1}
            </motion.span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => duplicateGridItem(index)}
              >
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                  <Copy className="h-4 w-4" />
                </motion.div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => removeGridItem(index)}
              >
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <Trash2 className="h-4 w-4" />
                </motion.div>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="block text-xs font-medium mb-1">grid-column-start</Label>
              <motion.div
                key={`grid-col-start-${item.gridColumnStart}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Input
                  className="code-font"
                  value={item.gridColumnStart}
                  onChange={(e) => updateGridItem(index, { gridColumnStart: e.target.value })}
                />
              </motion.div>
            </div>
            <div>
              <Label className="block text-xs font-medium mb-1">grid-column-end</Label>
              <motion.div
                key={`grid-col-end-${item.gridColumnEnd}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Input
                  className="code-font"
                  value={item.gridColumnEnd}
                  onChange={(e) => updateGridItem(index, { gridColumnEnd: e.target.value })}
                />
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <Label className="block text-xs font-medium mb-1">grid-row-start</Label>
              <motion.div
                key={`grid-row-start-${item.gridRowStart}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Input
                  className="code-font"
                  value={item.gridRowStart}
                  onChange={(e) => updateGridItem(index, { gridRowStart: e.target.value })}
                />
              </motion.div>
            </div>
            <div>
              <Label className="block text-xs font-medium mb-1">grid-row-end</Label>
              <motion.div
                key={`grid-row-end-${item.gridRowEnd}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Input
                  className="code-font"
                  value={item.gridRowEnd}
                  onChange={(e) => updateGridItem(index, { gridRowEnd: e.target.value })}
                />
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <Label className="block text-xs font-medium mb-1">justify-self</Label>
              <motion.div
                key={`justify-self-${item.justifySelf}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Select
                  value={item.justifySelf}
                  onValueChange={(value) => updateGridItem(index, { 
                    justifySelf: value as 'start' | 'end' | 'center' | 'stretch' 
                  })}
                >
                  <SelectTrigger className="code-font">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">start</SelectItem>
                    <SelectItem value="end">end</SelectItem>
                    <SelectItem value="center">center</SelectItem>
                    <SelectItem value="stretch">stretch</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
            <div>
              <Label className="block text-xs font-medium mb-1">align-self</Label>
              <motion.div
                key={`align-self-${item.alignSelf}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Select
                  value={item.alignSelf}
                  onValueChange={(value) => updateGridItem(index, { 
                    alignSelf: value as 'start' | 'end' | 'center' | 'stretch' 
                  })}
                >
                  <SelectTrigger className="code-font">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">start</SelectItem>
                    <SelectItem value="end">end</SelectItem>
                    <SelectItem value="center">center</SelectItem>
                    <SelectItem value="stretch">stretch</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GridItem;
