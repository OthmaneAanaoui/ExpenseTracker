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
export type Bar = {
  data:number[];
  barStyle?:BarStyle[];
}

export type DataBar = {
    title:string;
    bars:Bar[];
}

export type Bars = DataBar[];
