import React, { useState } from 'react';
import { useLayout } from '@/context/LayoutContext';
import { generateHTML, generateCSS } from '@/utils/generateCode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onOpenChange }) => {
  const { layoutType, flexboxProps, gridProps, flexItems, gridItems } = useLayout();
  const { toast } = useToast();
  const [copied, setCopied] = useState<'none' | 'html' | 'css' | 'both'>('none');
  
  const htmlCode = generateHTML(layoutType, flexItems, gridItems);
  const cssCode = generateCSS(layoutType, flexboxProps, gridProps, flexItems, gridItems);

  const copyToClipboard = (codeType: 'html' | 'css' | 'both') => {
    let codeToCopy = '';
    
    if (codeType === 'html') {
      codeToCopy = htmlCode;
    } else if (codeType === 'css') {
      codeToCopy = cssCode;
    } else {
      codeToCopy = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    }
    
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(codeType);
      toast({
        title: "Copied to clipboard",
        description: `${codeType.toUpperCase()} code copied to clipboard.`,
        duration: 2000,
      });
      
      setTimeout(() => setCopied('none'), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
    });
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const fileType = 'text/plain';
    
    const htmlBlob = new Blob([htmlCode], {type: fileType});
    const cssBlob = new Blob([cssCode], {type: fileType});
    
    // Create HTML file download
    element.href = URL.createObjectURL(htmlBlob);
    element.download = `layout-${layoutType}-html.html`;
    document.body.appendChild(element);
    element.click();
    
    // Create CSS file download
    setTimeout(() => {
      element.href = URL.createObjectURL(cssBlob);
      element.download = `layout-${layoutType}-styles.css`;
      element.click();
      
      document.body.removeChild(element);
      
      toast({
        title: "Files downloaded",
        description: "HTML and CSS files have been downloaded.",
      });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Export Code</DialogTitle>
          <DialogDescription>
            Copy the generated HTML and CSS code or download as files
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html">
            <ScrollArea className="bg-background p-4 rounded border border-border h-[350px] custom-scrollbar">
              <pre className="code-font text-sm whitespace-pre-wrap">
                <code>{htmlCode}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="css">
            <ScrollArea className="bg-background p-4 rounded border border-border h-[350px] custom-scrollbar">
              <pre className="code-font text-sm whitespace-pre-wrap">
                <code>{cssCode}</code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2 flex-wrap sm:justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard('html')}
            >
              {copied === 'html' ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  HTML Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy HTML
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard('css')}
            >
              {copied === 'css' ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  CSS Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy CSS
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard('both')}
            >
              {copied === 'both' ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Both Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Both
                </>
              )}
            </Button>
          </div>
          
          <Button onClick={downloadCode}>
            <Download className="h-4 w-4 mr-1" />
            Download Files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
