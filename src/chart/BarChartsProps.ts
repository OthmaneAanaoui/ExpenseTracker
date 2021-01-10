import { Bars } from './BarType'

export interface BarChartsProps {
    data?:Bars;
    style?:any;
    eventBar?:Function|null;
    defaultBarColor?:string;
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
    defaultBarColor:"#14B17E",
    xAxis: {
      fontSize:12,
      fontWeight:300,
      fontStyle:"italic",
      color:"#ADB1BA",
      lineColor:"#848891"
    },
    yAxis: {
      fontSize:12,
      fontWeight:12,
      fontStyle:"italic",
      color:"#ADB1BA",
      lineColor:"#44494F",
      gridLineColor:"#44494F",
      nbGridLine:4,
    }  
  }