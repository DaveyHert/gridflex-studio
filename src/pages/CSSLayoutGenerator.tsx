import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import PreviewPanel from '@/components/PreviewPanel';
import ExportDialog from '@/components/ExportDialog';

const CSSLayoutGenerator: React.FC = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [resizerActive, setResizerActive] = useState(false);
  const [controlPanelWidth, setControlPanelWidth] = useState(350);
  const controlPanelRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (resizerRef.current && resizerRef.current.contains(e.target as Node)) {
        setResizerActive(true);
      }
    };

    const handleMouseUp = () => {
      setResizerActive(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizerActive) return;
      
      const newWidth = e.clientX;
      
      if (newWidth >= 250 && newWidth <= 500) {
        setControlPanelWidth(newWidth);
        if (controlPanelRef.current) {
          controlPanelRef.current.style.width = `${newWidth}px`;
        }
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [resizerActive]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header onExportClick={() => setIsExportOpen(true)} />
      
      <div className="flex flex-1 overflow-hidden">
        <div ref={controlPanelRef} style={{ width: `${controlPanelWidth}px` }}>
          <ControlPanel />
        </div>
        
        <div 
          ref={resizerRef} 
          className={`resizer w-1 bg-border hover:bg-primary transition-colors duration-150 ${resizerActive ? 'bg-primary' : ''}`}
        />
        
        <PreviewPanel />
      </div>
      
      <ExportDialog open={isExportOpen} onOpenChange={setIsExportOpen} />
    </div>
  );
};

export default CSSLayoutGenerator;
