import React from 'react';
import { Button } from '@/components/ui/button';
import { useLayout } from '@/context/LayoutContext';
import {
  Undo2Icon,
  Redo2Icon,
  CodeIcon
} from 'lucide-react';

interface HeaderProps {
  onExportClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExportClick }) => {
  const { 
    layoutType, 
    setLayoutType, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useLayout();

  return (
    <header className="flex items-center justify-between bg-card px-4 py-3 border-b border-border">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-foreground mr-4">CSS Layout Generator</h1>
        <div className="flex items-center space-x-0 border border-border rounded-md">
          <Button
            variant={layoutType === 'flexbox' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-r-none"
            onClick={() => setLayoutType('flexbox')}
          >
            Flexbox
          </Button>
          <Button
            variant={layoutType === 'grid' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-l-none"
            onClick={() => setLayoutType('grid')}
          >
            Grid
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost" 
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          className="text-muted-foreground hover:text-foreground"
        >
          <Undo2Icon className="h-4 w-4 mr-1" />
          Undo
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          className="text-muted-foreground hover:text-foreground"
        >
          <Redo2Icon className="h-4 w-4 mr-1" />
          Redo
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={onExportClick}
        >
          <CodeIcon className="h-4 w-4 mr-1" />
          Export Code
        </Button>
      </div>
    </header>
  );
};

export default Header;
