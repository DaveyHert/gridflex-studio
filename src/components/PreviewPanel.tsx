import React from 'react';
import { useLayout } from '@/context/LayoutContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor } from 'lucide-react';
import CodeView from './CodeView';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

const PreviewPanel: React.FC = () => {
  const { 
    layoutType, 
    flexboxProps, 
    gridProps, 
    flexItems, 
    gridItems,
    previewMode,
    setPreviewMode
  } = useLayout();

  // Generate CSS for the container
  const getContainerStyle = () => {
    if (layoutType === 'flexbox') {
      return {
        display: flexboxProps.display,
        flexDirection: flexboxProps.flexDirection,
        justifyContent: flexboxProps.justifyContent,
        alignItems: flexboxProps.alignItems,
        flexWrap: flexboxProps.flexWrap,
        gap: flexboxProps.gap,
      };
    } else {
      return {
        display: gridProps.display,
        gridTemplateColumns: gridProps.gridTemplateColumns,
        gridTemplateRows: gridProps.gridTemplateRows,
        rowGap: gridProps.rowGap,
        columnGap: gridProps.columnGap,
        justifyItems: gridProps.justifyItems,
        alignItems: gridProps.alignItems,
      };
    }
  };

  // Generate CSS for flex items
  const getFlexItemStyle = (item: any, index: number) => {
    return {
      flexGrow: item.flexGrow,
      flexShrink: item.flexShrink,
      flexBasis: item.flexBasis,
      alignSelf: item.alignSelf,
      order: item.order,
    };
  };

  // Generate CSS for grid items
  const getGridItemStyle = (item: any) => {
    return {
      gridColumnStart: item.gridColumnStart,
      gridColumnEnd: item.gridColumnEnd,
      gridRowStart: item.gridRowStart,
      gridRowEnd: item.gridRowEnd,
      justifySelf: item.justifySelf,
      alignSelf: item.alignSelf,
    };
  };

  // Animation variants for container transitions
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5, // Slower duration
        when: "beforeChildren",
        staggerChildren: 0.1 // Increased stagger time
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.4, // Slower exit
        when: "afterChildren",
        staggerChildren: 0.1, // Increased stagger time
        staggerDirection: -1
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 15, // More damping for slower, smoother motion
        stiffness: 80, // Less stiffness for slower motion
        duration: 0.6 // Longer duration
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: { duration: 0.4 } // Slower exit
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      <Tabs defaultValue="preview" className="flex flex-col h-full">
        <TabsList className="border-b border-border rounded-none px-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="flex-1 p-0 m-0">
          <div className="flex items-center justify-end gap-2 p-2 border-b border-border">
            <span className="text-xs text-muted-foreground mr-2">Device Preview:</span>
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              className="h-8 px-2"
              onClick={() => setPreviewMode('desktop')}
            >
              <Monitor className="h-4 w-4 mr-1" />
              <span>Desktop</span>
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              className="h-8 px-2"
              onClick={() => setPreviewMode('mobile')}
            >
              <Smartphone className="h-4 w-4 mr-1" />
              <span>Mobile</span>
            </Button>
          </div>
          <ScrollArea className="h-full p-6 custom-scrollbar">
            <div className="h-full flex items-center justify-center">
              <motion.div 
                className={`bg-card relative ${
                  previewMode === 'mobile' 
                    ? 'w-[375px] rounded-[2rem] border-8 border-muted p-0 pt-6 pb-6' 
                    : 'w-full max-w-3xl rounded-lg border border-border p-4'
                }`}
                layout
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {previewMode === 'mobile' && (
                  <div className="absolute top-1.5 left-0 right-0 flex justify-center">
                    <div className="w-16 h-1.5 bg-muted-foreground/30 rounded-full" />
                  </div>
                )}
                <div className={previewMode === 'mobile' ? 'px-2' : ''}>
                  <AnimatePresence mode="wait">
                    {/* Flexbox Preview */}
                    {layoutType === 'flexbox' && (
                      <motion.div
                        key="flexbox-container"
                        className="min-h-[250px] p-4 border-2 border-dashed border-primary/40 rounded"
                        style={getContainerStyle()}
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layoutId="layout-container"
                      >
                        <AnimatePresence>
                          {flexItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              className="flex-preview-item bg-primary/20 p-4 rounded flex items-center justify-center"
                              style={getFlexItemStyle(item, index)}
                              variants={itemVariants}
                              layout
                              layoutId={`item-${item.id}`}
                              transition={{
                                layout: {
                                  type: "spring",
                                  damping: 20,
                                  stiffness: 300
                                }
                              }}
                            >
                              <span className="text-primary font-mono">#{index + 1}</span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                    
                    {/* Grid Preview */}
                    {layoutType === 'grid' && (
                      <motion.div
                        key="grid-container"
                        className="min-h-[250px] p-4 border-2 border-dashed border-secondary/40 rounded"
                        style={getContainerStyle()}
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layoutId="layout-container"
                      >
                        <AnimatePresence>
                          {gridItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              className="grid-preview-item bg-secondary/20 p-4 rounded flex items-center justify-center"
                              style={getGridItemStyle(item)}
                              variants={itemVariants}
                              layout
                              layoutId={`item-${item.id}`}
                              transition={{
                                layout: {
                                  type: "spring",
                                  damping: 20,
                                  stiffness: 300
                                }
                              }}
                            >
                              <span className="text-secondary font-mono">#{index + 1}</span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 p-0 m-0">
          <CodeView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewPanel;