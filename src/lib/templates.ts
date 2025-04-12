export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  state: {
    layoutType: "flexbox" | "grid";
    flexboxProps: {
      display: string;
      flexDirection: string;
      justifyContent: string;
      alignItems: string;
      flexWrap: string;
      gap: string;
    };
    gridProps: {
      display: string;
      gridTemplateColumns: string;
      gridTemplateRows: string;
      rowGap: string;
      columnGap: string;
      justifyItems: string;
      alignItems: string;
    };
    flexItems: Array<{
      id: string;
      flexGrow: number;
      flexShrink: number;
      flexBasis: string;
      alignSelf: string;
      order: number;
    }>;
    gridItems: Array<{
      id: string;
      gridColumnStart: string;
      gridColumnEnd: string;
      gridRowStart: string;
      gridRowEnd: string;
      justifySelf: string;
      alignSelf: string;
    }>;
  };
}

// Import or define templates
export const templates: LayoutTemplate[] = [
  {
    id: "1",
    name: "Basic Flexbox Row",
    description: "A simple row layout with three items",
    state: {
      layoutType: "flexbox",
      flexboxProps: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: "10px",
      },
      gridProps: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 100px)",
        rowGap: "10px",
        columnGap: "10px",
        justifyItems: "stretch",
        alignItems: "stretch",
      },
      flexItems: [
        {
          id: "f1",
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
        },
        {
          id: "f2",
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
        },
        {
          id: "f3",
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
        },
      ],
      gridItems: [],
    },
  },
  {
    id: "2",
    name: "Basic Grid Layout",
    description: "A 3x3 grid layout",
    state: {
      layoutType: "grid",
      flexboxProps: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        flexWrap: "nowrap",
        gap: "10px",
      },
      gridProps: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 100px)",
        rowGap: "10px",
        columnGap: "10px",
        justifyItems: "stretch",
        alignItems: "stretch",
      },
      flexItems: [],
      gridItems: [
        {
          id: "g1",
          gridColumnStart: "1",
          gridColumnEnd: "2",
          gridRowStart: "1",
          gridRowEnd: "2",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g2",
          gridColumnStart: "2",
          gridColumnEnd: "3",
          gridRowStart: "1",
          gridRowEnd: "2",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g3",
          gridColumnStart: "3",
          gridColumnEnd: "4",
          gridRowStart: "1",
          gridRowEnd: "2",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g4",
          gridColumnStart: "1",
          gridColumnEnd: "2",
          gridRowStart: "2",
          gridRowEnd: "3",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g5",
          gridColumnStart: "2",
          gridColumnEnd: "3",
          gridRowStart: "2",
          gridRowEnd: "3",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g6",
          gridColumnStart: "3",
          gridColumnEnd: "4",
          gridRowStart: "2",
          gridRowEnd: "3",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g7",
          gridColumnStart: "1",
          gridColumnEnd: "2",
          gridRowStart: "3",
          gridRowEnd: "4",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g8",
          gridColumnStart: "2",
          gridColumnEnd: "3",
          gridRowStart: "3",
          gridRowEnd: "4",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
        {
          id: "g9",
          gridColumnStart: "3",
          gridColumnEnd: "4",
          gridRowStart: "3",
          gridRowEnd: "4",
          justifySelf: "stretch",
          alignSelf: "stretch",
        },
      ],
    },
  },
];
