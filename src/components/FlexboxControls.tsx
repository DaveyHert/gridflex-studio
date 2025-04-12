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
import { PlusIcon } from 'lucide-react';
import FlexItem from './FlexItem';

const FlexboxControls: React.FC = () => {
  const { flexboxProps, updateFlexboxProps, flexItems, addFlexItem } = useLayout();

  const handleGapChange = (value: number[]) => {
    updateFlexboxProps({ gap: `${value[0]}px` });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Container Properties</h2>
        
        {/* Display option */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">display</Label>
          <Select
            value={flexboxProps.display}
            onValueChange={(value) => updateFlexboxProps({ display: value as 'flex' | 'inline-flex' })}
          >
            <SelectTrigger className="w-full code-font">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flex">flex</SelectItem>
              <SelectItem value="inline-flex">inline-flex</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Flex Direction */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">flex-direction</Label>
          <div className="grid grid-cols-2 gap-2">
            {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((direction) => (
              <Button 
                key={direction}
                type="button"
                variant={flexboxProps.flexDirection === direction ? 'default' : 'outline'}
                className="py-2 text-center rounded text-sm"
                onClick={() => updateFlexboxProps({ flexDirection: direction })}
              >
                {direction}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Justify Content */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">justify-content</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map((justify) => (
              <Button 
                key={justify}
                type="button"
                variant={flexboxProps.justifyContent === justify ? 'default' : 'outline'}
                className="py-2 text-center rounded text-sm"
                onClick={() => updateFlexboxProps({ justifyContent: justify })}
              >
                {justify}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Align Items */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">align-items</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const).map((align) => (
              <Button 
                key={align}
                type="button"
                variant={flexboxProps.alignItems === align ? 'default' : 'outline'}
                className="py-2 text-center rounded text-sm"
                onClick={() => updateFlexboxProps({ alignItems: align })}
              >
                {align}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Flex Wrap */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">flex-wrap</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['nowrap', 'wrap', 'wrap-reverse'] as const).map((wrap) => (
              <Button 
                key={wrap}
                type="button"
                variant={flexboxProps.flexWrap === wrap ? 'default' : 'outline'}
                className="py-2 text-center rounded text-sm"
                onClick={() => updateFlexboxProps({ flexWrap: wrap })}
              >
                {wrap}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Gap */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">gap</Label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Slider 
                min={0} 
                max={50} 
                step={1}
                value={[parseInt(flexboxProps.gap)]}
                onValueChange={handleGapChange}
              />
            </div>
            <span className="code-font min-w-[50px] text-right">
              {flexboxProps.gap}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Flex Items</h2>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={addFlexItem}
            className="flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
        
        <div className="space-y-3">
          {flexItems.map((item, index) => (
            <FlexItem 
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

export default FlexboxControls;
