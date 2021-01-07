import { Bars } from './BarType'

export interface BarChartsProps {
    data?:Bars;
    style?:any;
    eventBar?:Function|null;
    defaultBarColor?:string;
    backgroundColor?:string;
    spacingBar?:number;
    spacingGroupBar?:any;
    xAxis?: {
      fontSize?:number;
      fontWeight?:number;
      fontStyle?:string;
      color?:string;
      lineColor?:string;
    }
    yAxis?: {
      fontSize?:number;
      fontWeight?:number;
      fontStyle?:string;
      color?:string;
      lineColor?:string;
      gridLineColor?:string;
      nbGridLine?:number;
    }
  }

  export const defaultBarChartsProps:BarChartsProps = {
    defaultBarColor:"purple",
    backgroundColor:"#f1f1f1",
    xAxis: {
      fontSize:12,
      fontWeight:300,
      fontStyle:"italic",
      color:"red",
      lineColor:"grey"
    },
    yAxis: {
      fontSize:12,
      fontWeight:12,
      fontStyle:"italic",
      color:"orange",
      lineColor:"grey",
      gridLineColor:"blue",
      nbGridLine:4,
    }  
  }