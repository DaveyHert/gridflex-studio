import { LayoutType, FlexboxProperties, GridProperties, FlexItem, GridItem } from '@/types';

export function generateHTML(
  layoutType: LayoutType,
  flexItems: FlexItem[],
  gridItems: GridItem[]
): string {
  let containerClass = layoutType === 'flexbox' ? 'container' : 'grid-container';
  let itemClass = layoutType === 'flexbox' ? 'flex-item' : 'grid-item';
  let items = layoutType === 'flexbox' ? flexItems : gridItems;
  
  let html = `<div class="${containerClass}">\n`;
  
  items.forEach((_, index) => {
    html += `  <div class="${itemClass}">Item ${index + 1}</div>\n`;
  });
  
  html += '</div>';
  
  return html;
}

export function generateCSS(
  layoutType: LayoutType,
  flexboxProps: FlexboxProperties,
  gridProps: GridProperties,
  flexItems: FlexItem[],
  gridItems: GridItem[]
): string {
  let css = '';
  
  if (layoutType === 'flexbox') {
    css += `.container {\n`;
    css += `  display: ${flexboxProps.display};\n`;
    css += `  flex-direction: ${flexboxProps.flexDirection};\n`;
    css += `  justify-content: ${flexboxProps.justifyContent};\n`;
    css += `  align-items: ${flexboxProps.alignItems};\n`;
    css += `  flex-wrap: ${flexboxProps.flexWrap};\n`;
    css += `  gap: ${flexboxProps.gap};\n`;
    css += `}\n\n`;
    
    css += `.flex-item {\n`;
    css += `  padding: 1rem;\n`;
    css += `  background-color: rgba(52, 152, 219, 0.2);\n`;
    css += `  border: 2px dashed rgba(52, 152, 219, 0.7);\n`;
    css += `  border-radius: 0.25rem;\n`;
    css += `  display: flex;\n`;
    css += `  align-items: center;\n`;
    css += `  justify-content: center;\n`;
    css += `}\n\n`;
    
    // Generate specific item styles
    flexItems.forEach((item, index) => {
      css += `.flex-item:nth-child(${index + 1}) {\n`;
      css += `  flex-grow: ${item.flexGrow};\n`;
      css += `  flex-shrink: ${item.flexShrink};\n`;
      css += `  flex-basis: ${item.flexBasis};\n`;
      
      if (item.alignSelf !== 'auto') {
        css += `  align-self: ${item.alignSelf};\n`;
      }
      
      if (item.order !== 0) {
        css += `  order: ${item.order};\n`;
      }
      
      css += `}\n\n`;
    });
  } else {
    css += `.grid-container {\n`;
    css += `  display: ${gridProps.display};\n`;
    css += `  grid-template-columns: ${gridProps.gridTemplateColumns};\n`;
    css += `  grid-template-rows: ${gridProps.gridTemplateRows};\n`;
    css += `  row-gap: ${gridProps.rowGap};\n`;
    css += `  column-gap: ${gridProps.columnGap};\n`;
    css += `  justify-items: ${gridProps.justifyItems};\n`;
    css += `  align-items: ${gridProps.alignItems};\n`;
    css += `}\n\n`;
    
    css += `.grid-item {\n`;
    css += `  padding: 1rem;\n`;
    css += `  background-color: rgba(46, 204, 113, 0.2);\n`;
    css += `  border: 2px dashed rgba(46, 204, 113, 0.7);\n`;
    css += `  border-radius: 0.25rem;\n`;
    css += `  display: flex;\n`;
    css += `  align-items: center;\n`;
    css += `  justify-content: center;\n`;
    css += `}\n\n`;
    
    // Generate specific item styles
    gridItems.forEach((item, index) => {
      const hasSpecificGridStyles = 
        item.gridColumnStart !== 'auto' || 
        item.gridColumnEnd !== 'auto' || 
        item.gridRowStart !== 'auto' || 
        item.gridRowEnd !== 'auto' || 
        item.justifySelf !== 'start' || 
        item.alignSelf !== 'start';
      
      if (hasSpecificGridStyles) {
        css += `.grid-item:nth-child(${index + 1}) {\n`;
        
        if (item.gridColumnStart !== 'auto') {
          css += `  grid-column-start: ${item.gridColumnStart};\n`;
        }
        
        if (item.gridColumnEnd !== 'auto') {
          css += `  grid-column-end: ${item.gridColumnEnd};\n`;
        }
        
        if (item.gridRowStart !== 'auto') {
          css += `  grid-row-start: ${item.gridRowStart};\n`;
        }
        
        if (item.gridRowEnd !== 'auto') {
          css += `  grid-row-end: ${item.gridRowEnd};\n`;
        }
        
        if (item.justifySelf !== 'start') {
          css += `  justify-self: ${item.justifySelf};\n`;
        }
        
        if (item.alignSelf !== 'start') {
          css += `  align-self: ${item.alignSelf};\n`;
        }
        
        css += `}\n\n`;
      }
    });
  }
  
  return css;
}
