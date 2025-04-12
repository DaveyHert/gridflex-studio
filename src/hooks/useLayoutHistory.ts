import { useState, useCallback } from 'react';
import { LayoutState } from '@/types';

interface HistoryState {
  past: LayoutState[];
  present: LayoutState;
  future: LayoutState[];
}

export function useLayoutHistory(initialState: LayoutState) {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialState,
    future: [],
  });

  const setState = useCallback((newPresent: LayoutState) => {
    setHistory((prevHistory) => ({
      ...prevHistory,
      present: newPresent,
    }));
  }, []);

  const addToHistory = useCallback((state: LayoutState) => {
    setHistory((prevHistory) => ({
      past: [...prevHistory.past, prevHistory.present],
      present: state,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    setHistory((prevHistory) => {
      const { past, present, future } = prevHistory;
      
      if (past.length === 0) return prevHistory;
      
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((prevHistory) => {
      const { past, present, future } = prevHistory;
      
      if (future.length === 0) return prevHistory;
      
      const next = future[0];
      const newFuture = future.slice(1);
      
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    addToHistory,
  };
}
