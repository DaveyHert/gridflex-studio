export type LayoutType = 'flexbox' | 'grid';

export interface FlexboxProperties {
  display: 'flex' | 'inline-flex';
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap: string;
}

export interface GridProperties {
  display: 'grid' | 'inline-grid';
  gridTemplateColumns: string;
  gridTemplateRows: string;
  rowGap: string;
  columnGap: string;
  justifyItems: 'start' | 'end' | 'center' | 'stretch';
  alignItems: 'start' | 'end' | 'center' | 'stretch';
}

export interface FlexItem {
  id: string;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  order: number;
}

export interface GridItem {
  id: string;
  gridColumnStart: string;
  gridColumnEnd: string;
  gridRowStart: string;
  gridRowEnd: string;
  justifySelf: 'start' | 'end' | 'center' | 'stretch';
  alignSelf: 'start' | 'end' | 'center' | 'stretch';
}

export interface LayoutState {
  layoutType: LayoutType;
  flexboxProps: FlexboxProperties;
  gridProps: GridProperties;
  flexItems: FlexItem[];
  gridItems: GridItem[];
}

export interface SavedLayout {
  id: string;
  name: string;
  state: LayoutState;
  createdAt: string;
}

export interface GeneratedCode {
  html: string;
  css: string;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  state: LayoutState;
}
