import React from 'react';
import { useLayout } from '@/context/LayoutContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import GridItem from './GridItem';

const GridControls: React.FC = () => {
  const { gridProps, updateGridProps, gridItems, addGridItem } = useLayout();

  const handleRowGapChange = (value: number[]) => {
    updateGridProps({ rowGap: `${value[0]}px` });
  };

  const handleColumnGapChange = (value: number[]) => {
    updateGridProps({ columnGap: `${value[0]}px` });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Grid Container Properties</h2>
        
        {/* Display option */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">display</Label>
          <Select
            value={gridProps.display}
            onValueChange={(value) => updateGridProps({ display: value as 'grid' | 'inline-grid' })}
          >
            <SelectTrigger className="w-full code-font">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">grid</SelectItem>
              <SelectItem value="inline-grid">inline-grid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Grid Template Columns */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">grid-template-columns</Label>
          <Input 
            className="w-full code-font"
            value={gridProps.gridTemplateColumns}
            onChange={(e) => updateGridProps({ gridTemplateColumns: e.target.value })}
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {['1fr', 'auto', 'min-content', 'max-content'].map((value) => (
              <Button 
                key={value}
                variant="outline"
                size="sm"
                className="py-1 text-center text-xs"
                onClick={() => updateGridProps({ 
                  gridTemplateColumns: gridProps.gridTemplateColumns === value 
                    ? 'repeat(3, 1fr)' 
                    : value 
                })}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Grid Template Rows */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">grid-template-rows</Label>
          <Input 
            className="w-full code-font"
            value={gridProps.gridTemplateRows}
            onChange={(e) => updateGridProps({ gridTemplateRows: e.target.value })}
          />
        </div>
        
        {/* Grid Gap */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">gap</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="block text-xs font-medium mb-1">row-gap</Label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Slider 
                    min={0} 
                    max={50} 
                    step={1}
                    value={[parseInt(gridProps.rowGap)]}
                    onValueChange={handleRowGapChange}
                  />
                </div>
                <span className="code-font min-w-[50px] text-right">
                  {gridProps.rowGap}
                </span>
              </div>
            </div>
            <div>
              <Label className="block text-xs font-medium mb-1">column-gap</Label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Slider 
                    min={0} 
                    max={50} 
                    step={1}
                    value={[parseInt(gridProps.columnGap)]}
                    onValueChange={handleColumnGapChange}
                  />
                </div>
                <span className="code-font min-w-[50px] text-right">
                  {gridProps.columnGap}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Justify Items */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">justify-items</Label>
          <div className="grid grid-cols-4 gap-2">
            {(['start', 'end', 'center', 'stretch'] as const).map((justify) => (
              <Button 
                key={justify}
                type="button"
                variant={gridProps.justifyItems === justify ? 'default' : 'outline'}
                className="py-1 text-center rounded text-sm"
                onClick={() => updateGridProps({ justifyItems: justify })}
              >
                {justify}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Align Items */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">align-items</Label>
          <div className="grid grid-cols-4 gap-2">
            {(['start', 'end', 'center', 'stretch'] as const).map((align) => (
              <Button 
                key={align}
                type="button"
                variant={gridProps.alignItems === align ? 'default' : 'outline'}
                className="py-1 text-center rounded text-sm"
                onClick={() => updateGridProps({ alignItems: align })}
              >
                {align}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Grid Items</h2>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={addGridItem}
            className="flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
        
        <div className="space-y-3">
          {gridItems.map((item, index) => (
            <GridItem 
              key={item.id} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridControls;
