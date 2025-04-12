import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLayoutHistory } from '@/hooks/useLayoutHistory';
import { 
  LayoutType, 
  FlexboxProperties, 
  GridProperties,
  FlexItem,
  GridItem,
  LayoutState,
  SavedLayout
} from '@/types';
import { getDefaultState } from '@/utils/templates';

interface LayoutContextType {
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  previewMode: 'desktop' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
  flexboxProps: FlexboxProperties;
  updateFlexboxProps: (props: Partial<FlexboxProperties>) => void;
  gridProps: GridProperties;
  updateGridProps: (props: Partial<GridProperties>) => void;
  flexItems: FlexItem[];
  updateFlexItem: (index: number, item: Partial<FlexItem>) => void;
  addFlexItem: () => void;
  removeFlexItem: (index: number) => void;
  duplicateFlexItem: (index: number) => void;
  gridItems: GridItem[];
  updateGridItem: (index: number, item: Partial<GridItem>) => void;
  addGridItem: () => void;
  removeGridItem: (index: number) => void;
  duplicateGridItem: (index: number) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  savedLayouts: SavedLayout[];
  saveCurrentLayout: (name: string) => void;
  loadLayout: (layout: SavedLayout) => void;
  deleteLayout: (id: string) => void;
  loadTemplate: (template: LayoutState) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedLayouts, setSavedLayouts] = useLocalStorage<SavedLayout[]>('css-generator-layouts', []);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  const initialState = getDefaultState();
  
  const {
    state,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    addToHistory
  } = useLayoutHistory(initialState);
  
  const { layoutType, flexboxProps, gridProps, flexItems, gridItems } = state;

  const setLayoutType = (type: LayoutType) => {
    const newState = {...state, layoutType: type};
    setState(newState);
    addToHistory(newState);
  };

  const updateFlexboxProps = (props: Partial<FlexboxProperties>) => {
    const newState = {
      ...state,
      flexboxProps: { ...state.flexboxProps, ...props }
    };
    setState(newState);
    addToHistory(newState);
  };

  const updateGridProps = (props: Partial<GridProperties>) => {
    const newState = {
      ...state,
      gridProps: { ...state.gridProps, ...props }
    };
    setState(newState);
    addToHistory(newState);
  };

  const updateFlexItem = (index: number, itemProps: Partial<FlexItem>) => {
    const newItems = [...state.flexItems];
    newItems[index] = { ...newItems[index], ...itemProps };
    
    const newState = {
      ...state,
      flexItems: newItems
    };
    setState(newState);
    addToHistory(newState);
  };

  const addFlexItem = () => {
    const newItem: FlexItem = {
      id: Date.now().toString(),
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      order: 0
    };
    
    const newState = {
      ...state,
      flexItems: [...state.flexItems, newItem]
    };
    setState(newState);
    addToHistory(newState);
  };

  const removeFlexItem = (index: number) => {
    if (state.flexItems.length <= 1) return; // Prevent removing the last item
    
    const newItems = [...state.flexItems];
    newItems.splice(index, 1);
    
    const newState = {
      ...state,
      flexItems: newItems
    };
    setState(newState);
    addToHistory(newState);
  };

  const duplicateFlexItem = (index: number) => {
    const itemToDuplicate = state.flexItems[index];
    const newItem: FlexItem = {
      ...itemToDuplicate,
      id: Date.now().toString()
    };
    
    const newItems = [...state.flexItems];
    newItems.splice(index + 1, 0, newItem);
    
    const newState = {
      ...state,
      flexItems: newItems
    };
    setState(newState);
    addToHistory(newState);
  };

  const updateGridItem = (index: number, itemProps: Partial<GridItem>) => {
    const newItems = [...state.gridItems];
    newItems[index] = { ...newItems[index], ...itemProps };
    
    const newState = {
      ...state,
      gridItems: newItems
    };
    setState(newState);
    addToHistory(newState);
  };

  const addGridItem = () => {
    const newItem: GridItem = {
      id: Date.now().toString(),
      gridColumnStart: 'auto',
      gridColumnEnd: 'auto',
      gridRowStart: 'auto',
      gridRowEnd: 'auto',
      justifySelf: 'start',
      alignSelf: 'start'
    };
    
    const newState = {
      ...state,
      gridItems: [...state.gridItems, newItem]
    };
    setState(newState);
    addToHistory(newState);
  };

  const removeGridItem = (index: number) => {
    if (state.gridItems.length <= 1) return; // Prevent removing the last item
    
    const newItems = [...state.gridItems];
    newItems.splice(index, 1);
    
    const newState = {
      ...state,
      gridItems: newItems
    };
    setState(newState);
    addToHistory(newState);
  };

  const duplicateGridItem = (index: number) => {
    const itemToDuplicate = state.gridItems[index];
    const newItem: GridItem = {
      ...itemToDuplicate,
      id: Date.now().toString()
    };
    
    const newItems = [...state.gridItems];
    newItems.splice(index + 1, 0, newItem);
    
    const newState = {
      ...state,
      gridItems: newItems
    };
    setState(newState);
    addToHistory(newState);
  };

  const saveCurrentLayout = (name: string) => {
    const newLayout: SavedLayout = {
      id: Date.now().toString(),
      name,
      state,
      createdAt: new Date().toISOString(),
    };
    
    setSavedLayouts([...savedLayouts, newLayout]);
  };

  const loadLayout = (layout: SavedLayout) => {
    setState(layout.state);
    addToHistory(layout.state);
  };

  const deleteLayout = (id: string) => {
    setSavedLayouts(savedLayouts.filter(layout => layout.id !== id));
  };

  const loadTemplate = (template: LayoutState) => {
    setState(template);
    addToHistory(template);
  };

  return (
    <LayoutContext.Provider
      value={{
        layoutType,
        setLayoutType,
        previewMode,
        setPreviewMode,
        flexboxProps,
        updateFlexboxProps,
        gridProps,
        updateGridProps,
        flexItems,
        updateFlexItem,
        addFlexItem,
        removeFlexItem,
        duplicateFlexItem,
        gridItems,
        updateGridItem,
        addGridItem,
        removeGridItem,
        duplicateGridItem,
        undo,
        redo,
        canUndo,
        canRedo,
        savedLayouts,
        saveCurrentLayout,
        loadLayout,
        deleteLayout,
        loadTemplate
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
