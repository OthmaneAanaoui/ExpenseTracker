import * as React from "react";
import { useStoreActions, useStoreState } from "../store/hooks";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Text as SvgText, Line } from "react-native-svg";
import { Bars, LayoutSize, DataBar, BarStyle, EventBar } from "./BarType";
import { BarChartsProps, defaultBarChartsProps } from "./BarChartsProps";
import { calcWidthBar, getProportionHeight, getY_LegendValue, minMaxHeight } from "./calcRange";
import { CurrentSelection, SelectionTypeEnum } from "../store/model/CurrentSelection";

type GraphInfo = {
  spacingBar:number;
  spacingGroupBar:number;
  widthBar:number;
  yAxis:{width:number, value:number[]};
  xAxisHeight:number;
  maxHeight:number;
  minHeight:number;
  range:number;
}

const graphInfo:GraphInfo = {
  spacingBar:0,
  spacingGroupBar:10,
  widthBar:20,
  yAxis:{width:40, value:[]},
  xAxisHeight: 25,
  maxHeight:0,
  minHeight:0,
  range:0
}

const BarCharts = (props: BarChartsProps) => {
  const [layoutSize, setLayoutSize] = useState<LayoutSize>();
  const { currentSelection } = useStoreState(state => state.currentSelectionModel)
  const setCurrentSelection = useStoreActions(actions => actions.currentSelectionModel.setCurrentSelection)

  /**
   * Get layout size and ajust draw scale
   * @param event 
   */
  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    const { maxHeight, minHeight } = minMaxHeight(props.data as Bars)
    graphInfo.maxHeight = maxHeight
    graphInfo.minHeight = minHeight
    graphInfo.range = maxHeight - minHeight
    if(props.spacingGroupBar !==undefined){
      graphInfo.spacingGroupBar = props.spacingGroupBar
    }
    if(props.spacingBar !==undefined){
      graphInfo.spacingBar = props.spacingBar
    }
    graphInfo.yAxis.value = getY_LegendValue(maxHeight, minHeight, 4)
    if(props.data !== undefined){
      const { widthBar, spacingGroupBar } = calcWidthBar(width - graphInfo.yAxis.width, props.data, graphInfo.spacingGroupBar, graphInfo.spacingBar)
      graphInfo.widthBar = widthBar
      graphInfo.spacingGroupBar = spacingGroupBar!
    }
    setLayoutSize({ width, height });
  };

  /**
   * Set current selection after click and launch props method eventBar()
   * @param selection 
   */
  const onClick = (selection?:CurrentSelection) => {
    if(selection !== undefined) {
      setCurrentSelection(selection)
      if(props.eventBar){
        props.eventBar()
      }
    }
  }

  /**
   * Draw text in x axis
   * @param title 
   * @param i 
   * @param pos_x 
   * @return svg <Text>
   */
  const xTextDraw = (title:string, i:number, pos_x:number, idGroupClick?:string) => {
    const fontColor = props.xAxis?.color !== undefined ? props.xAxis?.color : defaultBarChartsProps.xAxis?.color;
    const fontSize = props.xAxis?.fontSize !== undefined ? props.xAxis?.fontSize : defaultBarChartsProps.xAxis?.fontSize;
    const font_style = props.xAxis?.fontStyle !== undefined ? props.xAxis?.fontStyle : defaultBarChartsProps.xAxis?.fontStyle;
    let selectionType = SelectionTypeEnum.none
    let id = ''
    if (idGroupClick) {
      selectionType = SelectionTypeEnum.month
      id = idGroupClick
    }
    const selection:CurrentSelection = { selectionType:selectionType, id:id}
    return (
      <SvgText key={i} fill={fontColor} fontSize={fontSize} 
      fontStyle={font_style || "normal"} 
      fontWeight="bold" 
      x={pos_x}
      y={layoutSize?.height - 10}
      textAnchor="start"
      onPress={()=> onClick(selection) }
      >
        {title}
      </SvgText>
    )
  }

  /**
   * Draw text and line in y axis
   * @param value 
   * @return [svg <Text>, svg <Line>]
   */
  const yTextDraw = (value:number) => {
    const fontColor = props.yAxis?.color !== undefined ? props.yAxis?.color : defaultBarChartsProps.yAxis?.color;
    const fontSize = props.yAxis?.fontSize !== undefined ? props.yAxis?.fontSize : defaultBarChartsProps.yAxis?.fontSize;
    const font_style = props.yAxis?.fontStyle !== undefined ? props.yAxis?.fontStyle : defaultBarChartsProps.yAxis?.fontStyle;
    const pos_y = getProportionHeight(graphInfo.maxHeight - value - graphInfo.minHeight, graphInfo.range, layoutSize?.height - graphInfo.xAxisHeight)
    const text = <SvgText key={"y_" + value} fill={fontColor} fontSize={fontSize} 
      fontStyle={font_style || "normal"} 
      fontWeight="bold" 
      x={graphInfo.yAxis.width - 5}
      y={pos_y}
      textAnchor="end">
        {value}
    </SvgText>
    const colorGridLine = props.yAxis?.gridLineColor !== undefined ? props.yAxis?.gridLineColor : defaultBarChartsProps.yAxis?.gridLineColor;
    const line = <Line key={"yLine_" + value} x1={graphInfo.yAxis.width} y1={pos_y} x2={layoutSize?.width} y2={pos_y} stroke={colorGridLine} strokeWidth="1" />
    return (
      [text, line]
    )
  }

  /**
   * Draw a rect Bar
   * @param heightBar 
   * @param index 
   * @param key 
   * @param pos_x 
   * @param pos_y 
   * @param barStyle 
   * @return svg <Rect>
   */
  const drawBar = (heightBar:number, value:number, index:number, key:string, pos_x:number, pos_y:number, barStyle?:BarStyle[], eventBar?:EventBar[], idGroupClick?:string) => {
    let style = barStyle?.filter(element => element.index === index)[0]
    let event = eventBar?.filter(element => element.index === index)[0]
    let fill:any = style?.color !== undefined ? style.color : defaultBarChartsProps.defaultBarColor
    let radius:number = style?.radius !== undefined ? style.radius : 2
    let selectionType = SelectionTypeEnum.none
    let idItemClick = ''
    if(event && event.idBarClick) {
      selectionType =  event.typeClick ? event.typeClick : SelectionTypeEnum.month
      idItemClick = event.idBarClick
    } else {
      if (idGroupClick !== undefined) {
        selectionType = SelectionTypeEnum.month
        idItemClick = idGroupClick
      }
    }
    return <Rect key={key} x={pos_x} y={pos_y} width={graphInfo.widthBar} height={heightBar} onPress={()=> onClick({ selectionType:selectionType, id:idItemClick, value:value}) } fill={fill} rx={radius}/>
  }

  /**
   * draw Group Bar
   */
  const drawBarGroups = () => {
    let pos_x = graphInfo.yAxis.width
    let tags:any = [];
    props.data?.forEach((bGroup:DataBar, iGroup:number) => {
      const xText = xTextDraw(bGroup.title, iGroup, pos_x, bGroup.idGroupClick)
      tags = [...tags, xText]
      bGroup.bars.forEach((bar, iBar) => {
        let pos_y = layoutSize?.height - graphInfo.xAxisHeight
        bar.data.forEach((value:number, iValue:number) => {
          const heightBar = getProportionHeight(value, graphInfo.range, layoutSize?.height - graphInfo.xAxisHeight)
          pos_y -= heightBar
          const key = iGroup + "_" + iBar + "_" + iValue
          const barRect = drawBar(heightBar, value, iValue, key, pos_x, pos_y, bar.barStyle, bar.eventBar, bGroup.idGroupClick)
          tags = [...tags, barRect]
        })
        pos_x += (graphInfo.widthBar + graphInfo.spacingBar)
      })
      pos_x += graphInfo.spacingGroupBar
    })
    return tags
  }

  /**
   * Draw Bar Graph
   */
  const drawGraph = () => {
    let tags:any=[]
    // draw y legend
    let texts:any =[]
    graphInfo.yAxis.value.forEach(value => {
      const t = yTextDraw(value)
      texts = [...texts, t]
    })
    tags = [...tags, texts]
    let yAbscisse = layoutSize?.height - graphInfo.xAxisHeight + 1
    // draw y line
    const color_Y_axis = props.yAxis?.lineColor !== undefined ? props.yAxis?.lineColor : defaultBarChartsProps.yAxis?.lineColor;
    const yLine = <Line key="yLine" x1={graphInfo.yAxis.width -1} y1="0" x2={graphInfo.yAxis.width - 1} y2={yAbscisse + 1} stroke={color_Y_axis} strokeWidth="1" />
    tags = [...tags, yLine]
    // draw x line
    const color_X_axis = props.xAxis?.lineColor !== undefined ? props.xAxis?.lineColor : defaultBarChartsProps.xAxis?.lineColor;
    const lineX = <Line key="x_abscisse" x1={graphInfo.yAxis.width} y1={yAbscisse} x2={layoutSize?.width} y2={yAbscisse} stroke={color_X_axis} strokeWidth="1" />
    tags = [...tags, lineX]
    tags = [...tags, drawBarGroups()]
    return tags
  }
  
  return (
    <View style={props.style}>
      <View style={{ flex: 1 }} onLayout={(event) => onLayout(event)}>
        {layoutSize!=undefined && layoutSize.height> 0 && layoutSize.width>0 && (
          <Svg style={{height: layoutSize.height, width: layoutSize.width}}>
            {
              drawGraph()
            }
          </Svg>
        )}
      </View>
    </View>
  );
};

export default BarCharts;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f1ac2f"
  },
});
