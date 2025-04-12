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
import { FlexItem as FlexItemType } from '@/types';
import { motion } from 'framer-motion';

interface FlexItemProps {
  item: FlexItemType;
  index: number;
}

const FlexItem: React.FC<FlexItemProps> = ({ item, index }) => {
  const { updateFlexItem, removeFlexItem, duplicateFlexItem } = useLayout();

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
      backgroundColor: ["rgba(41, 41, 46, 0.5)", "rgba(52, 152, 219, 0.15)", "rgba(41, 41, 46, 0.5)"],
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
      layoutId={`flex-item-card-${item.id}`}
    >
      <Card className="bg-muted border border-border">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <motion.span 
              className="text-sm font-medium"
              layoutId={`flex-item-title-${item.id}`}
            >
              Item #{index + 1}
            </motion.span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => duplicateFlexItem(index)}
              >
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                  <Copy className="h-4 w-4" />
                </motion.div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => removeFlexItem(index)}
              >
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <Trash2 className="h-4 w-4" />
                </motion.div>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="block text-xs font-medium mb-1">flex-grow</Label>
              <motion.div
                key={`flex-grow-${item.flexGrow}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Input
                  className="code-font"
                  type="number"
                  min="0"
                  value={item.flexGrow}
                  onChange={(e) => updateFlexItem(index, { flexGrow: parseInt(e.target.value) || 0 })}
                />
              </motion.div>
            </div>
            <div>
              <Label className="block text-xs font-medium mb-1">flex-shrink</Label>
              <motion.div
                key={`flex-shrink-${item.flexShrink}`}
                variants={inputVariants}
                initial="idle"
                animate="changed"
              >
                <Input
                  className="code-font"
                  type="number"
                  min="0"
                  value={item.flexShrink}
                  onChange={(e) => updateFlexItem(index, { flexShrink: parseInt(e.target.value) || 0 })}
                />
              </motion.div>
            </div>
          </div>
          
          <div className="mt-3">
            <Label className="block text-xs font-medium mb-1">flex-basis</Label>
            <motion.div
              key={`flex-basis-${item.flexBasis}`}
              variants={inputVariants}
              initial="idle"
              animate="changed"
            >
              <Input
                className="code-font"
                value={item.flexBasis}
                onChange={(e) => updateFlexItem(index, { flexBasis: e.target.value })}
              />
            </motion.div>
          </div>
          
          <div className="mt-3">
            <Label className="block text-xs font-medium mb-1">align-self</Label>
            <motion.div
              key={`align-self-${item.alignSelf}`}
              variants={inputVariants}
              initial="idle"
              animate="changed"
            >
              <Select
                value={item.alignSelf}
                onValueChange={(value) => updateFlexItem(index, { 
                  alignSelf: value as 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' 
                })}
              >
                <SelectTrigger className="code-font">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">auto</SelectItem>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="stretch">stretch</SelectItem>
                  <SelectItem value="baseline">baseline</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>

          <div className="mt-3">
            <Label className="block text-xs font-medium mb-1">order</Label>
            <motion.div
              key={`order-${item.order}`}
              variants={inputVariants}
              initial="idle"
              animate="changed"
            >
              <Input
                className="code-font"
                type="number"
                value={item.order}
                onChange={(e) => updateFlexItem(index, { order: parseInt(e.target.value) || 0 })}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlexItem;
