/// <reference path="../typings/browser.d.ts" />

declare var module: { id: string };

// Type definitions for vis.js
// Project: https://github.com/almende/vis
// Definitions by: Epic Labs <info@epiclabs.io>
// Definitions: ---

declare namespace vis {
  import INode = Vis.INode;
  import IEdge = Vis.IEdge;
  export interface ITimelineStatic {
    new(id: HTMLElement, data: any, options?: any): Vis.ITimeline;
  }
  export var Timeline: ITimelineStatic;

  export interface INetworkStatic {
    new(id: HTMLElement, data: any, options?: any): Vis.INetwork;
  }
  export var Network: INetworkStatic;

  export interface IDataSet {
    new(nodes?: INode[], edges?: IEdge[]): Vis.IData;
  }
  export var DataSet: IDataSet;

  /*
  export interface INodeStatic {
    new(id?: string, label?: string,
        x?: number, y?: number,
        fixed?: boolean, image?: string, shape?: string): Vis.INode;
  }
  export var Node: INodeStatic;

  export interface IEdgeStatic {
    new(from?: string, to?: string, id?: string): Vis.IEdge;
  }
  export var Edge: IEdgeStatic;
  */
}

declare namespace Vis {

  export interface ITimeline {
    setGroups(groups?: ITimelineGroup[]): void;
    setItems(items?: ITimelineItem[]): void;
    getWindow(): ITimelineWindow;
    setWindow(start: any, date: any): void;
    focus(selection: any): void;
    on(event?: string, callback?: (properties: any) => void): void;
  }

  interface ITimelineWindow {
    start: Date;
    end: Date;
  }

  interface ITimelineItem {
    id: number;
    content: string;
    group?: number;
    start: number;
    end?: number;
    editable?: boolean;
  }

  interface ITimelineOptions {
    stack?: boolean;
    start?: any;
    end?: any;
    orientation?: string;
  }

  interface ITimelineGroup {
    id: number;
    content: string;
    style?: string;
  }

  interface IVisSelectProperties {
    items: number[];
  }

  interface INetwork {
    network?: any;
    selectNodes?(nodeIds: string[], highlightEdges?: boolean): void;
    unselectAll?(): void;
    fit?(): void;
  }

  interface IPosition {
    x: number;
    y: number;
  }

  interface IProperties {

    nodes: string[];

    edges: string[];

    event: string[];

    pointer: {
      DOM: IPosition;
      canvas: IPosition;
    };

    previousSelection?: {
      nodes: string[];
      edges: string[];
    };
  }

  interface Callback {
    callback?: (params?: any) => void;
  }

  interface Dataset {

  }

  interface IData {
    nodes?: INode[];
    edges?: IEdge[];
  }

  interface INode {
    id?: string;
    label?: string;
    x?: number;
    y?: number;
    fixed?: boolean;
    image?: string;
    shape?: string;
  }

  interface IEdge {
    from?: string;
    to?: string;
    id?: string;
  }

  interface IOptions {
    autoResize?: boolean;

    width?: string;

    height?: string;

    locale?: string;

    locales?: string[];

    clickToUse?: boolean;

    configure?: any; // http://visjs.org/docs/network/configure.html#

    edges?: IEdgeOptions;

    nodes?: INodeOptions;

    groups?: any;

    layout?: any; // http://visjs.org/docs/network/layout.html

    interaction?: any; // visjs.org/docs/network/interaction.html?keywords=edges

    manipulation?: any; // http://visjs.org/docs/network/manipulation.html#

    physics?: any; // http://visjs.org/docs/network/physics.html#
  }

  interface INodeOptions {
    borderWidth?: number;

    boderWidthSelected?: number;

    brokenImage?: string;

    color?: {
      border?: string,
      background?: string,
      highlight?: string | {
        border?: string,
        background?: string,
      },
      hover?: string | {
        border?: string,
        background?: string,
      }
    };

    fixed?: boolean | {
      x?: boolean,
      y?: boolean,
    };

    font?: string | {
      color: string,
      size: number, // px
      face: string,
      background: string,
      strokeWidth: number, // px
      strokeColor: string,
      align: string,
    };

    group?: string;

    hidden?: boolean;

    icon?: {
      face?: string,
      code?: string,
      size?: number,  //50,
      color?: string,
    };

    id?: string;

    image?: string;

    label?: string;

    labelHighlightBold?: boolean;

    level?: number;

    mass?: number;

    physics?: boolean;

    scaling?: IOptionsScaling;

    shadow?: boolean | IOptionsShadow;

    shape?: string;

    shapeProperties?: {
      borderDashes: boolean | number[], // only for borders
      borderRadius: number,     // only for box shape
      interpolation: boolean,  // only for image and circularImage shapes
      useImageSize: boolean,  // only for image and circularImage shapes
      useBorderWithImage: boolean  // only for image shape
    };

    size?: number;

    title?: string;

    value?: number;

    x?: number;

    y?: number;
  }

  interface IEdgeOptions {
    arrows?: string | {
      to?: boolean | {
        enabled?: boolean,
        scaleFactor?: number,
      },
      middle?: boolean | {
        enabled?: boolean,
        scaleFactor?: number,
      },
      from: boolean | {
        enabled?: boolean,
        scaleFactor?: number,
      }
    };

    arrowStrikethrough?: boolean;

    color?: string | {
      color?: string,
      highlight?: string,
      hover?: string,
      inherit?: boolean | string,
      opacity?: number,
    };

    dashes?: boolean | number[];

    font?: string | {
      color?: string,
      size?: number, // px
      face?: string,
      background?: string,
      strokeWidth?: number, // px
      strokeColor?: string,
      align?: string,
    };

    from?: number | string;

    hidden?: boolean;

    hoverWidth?: number; // please note, hoverWidth could be also a function. This case is not represented here

    id?: string;

    label?: string;

    labelHighlightBold?: boolean;

    length?: number;

    physics?: boolean;

    scaling?: IOptionsScaling;

    selectionWidth?: number; // please note, selectionWidth could be also a function. This case is not represented here

    selfReferenceSize?: number;

    shadow?: boolean | IOptionsShadow;

    smooth?: boolean | {
      enabled: boolean,
      type: string,
      forceDirection?: string | boolean,
      roundness: number,
    };

    title?: string;

    to?: number | string;

    value?: number;

    width?: number;
  }

  interface IOptionsScaling {
    min?: number,
    max?: number,
    label?: boolean | {
      enabled?: boolean,
      min?: number,
      max?: number,
      maxVisible?: number,
      drawThreshold?: number
    },
    customScalingFunction?(min?: number, max?: number, total?: number, value?: number): number,
  }

  interface IOptionsShadow {
    enabled: boolean,
    color: string,
    size: number,
    x: number,
    y: number,
  }

  interface IEvents {
    click?(properties?: IProperties): void;

    doubleClick?(properties?: IProperties): void;

    oncontext?(properties?: IProperties): void;

    hold?(properties?: IProperties): void;

    release?(properties?: IProperties): void;

    select?(properties?: IProperties): void;

    selectNode?(properties?: IProperties): void;

    selectEdge?(properties?: IProperties): void;

    deselectNode?(properties?: IProperties): void;

    deselectEdge?(properties?: IProperties): void;

    dragStart?(properties?: IProperties): void;

    dragging?(properties?: IProperties): void;

    dragEnd?(properties?: IProperties): void;

    hoverNode?(node?: string): void;

    blurNode?(node?: string): void;

    hoverEdge?(node?: string): void;

    blurEdge?(node?: string): void;

    zoom?(node?: string): void;

    showPopup?(node?: string): void;

    hidePopup?(node?: string): void;

    startStabilizing?(): void;

    stabilizationProgress?(properties?: {
      iterations?: number,
      total?: number,
    }): void;

    stabilizationIterationsDone?(): void;

    stabilized?(properties?: {
      iterations?: number,
    }): void;

    resize?(properties?: {
      width: number,
      height: number,
      oldWidth: number,
      oldHeight: number,
    }): void;

    initRedraw?(): void;

    beforeDrawing?(canvasContext?: any): void;

    afterDrawing?(canvasContext?: any): void;

    animationFinished?(): void;

    configChange?(properties?: any): void;
  }
}
