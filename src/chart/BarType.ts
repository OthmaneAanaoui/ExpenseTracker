export type LayoutSize= {
    width: any;
    height: any;
  };

  //****************************************************************
  // Bar data format
  //****************************************************************
export type BarStyle = {
    index:number;
    color:string;
    radius?:number;
}
export type EventBar = {
  index:number;
  idBarClick:string;
  typeClick?:any;
}
export type Bar = {
  data:number[];
  eventBar?:EventBar[];
  barStyle?:BarStyle[];
}

export type DataBar = {
    title:string;
    idGroupClick?:string;
    bars:Bar[];
}

export type Bars = DataBar[];
