import { Category } from "../types/Category";
import { Expense } from "../types/Expense";
import { Bars, BarStyle, DataBar, EventBar } from "./BarType";
import { SelectionTypeEnum } from "../store/model/CurrentSelection";

const RADIUS = 3
const shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Convert list of expense/income operation to data for BarChart
 * @param expenses 
 * @param categories 
 */
export const getBarsFromExpenses = (expenses:Expense[], categories:Category[]) => {
    const limitDate = getLimitDate()
    const resultExpense = expenses.filter(expense => expense.date > limitDate).sort((a,b) => a.date - b.date)

    let dataBars:Bars = [];
    let changeMonth = undefined
    let currentBarIndex = 0
    for(const elem of resultExpense){
        let numMonth = (new Date(elem.date)).getMonth()
        if(changeMonth !== numMonth) {
            const dataBar:DataBar = { 
                title: shortMonth[numMonth],
                idGroupClick:currentBarIndex.toString(),
                bars:[
                    {
                        data:[],
                        barStyle:[],
                        eventBar:[]
                    },
                    {
                        data:[],
                        barStyle:[],
                        eventBar:[]
                    }
                ]
            }
            currentBarIndex = dataBars.length
            dataBars.push(dataBar)
            changeMonth = numMonth
        }
        if(elem.isIncome){
            dataBars[currentBarIndex].bars[0].data.push(elem.value)
            const cat = categories.find(category => category.id === elem.idCategory)
            const index = (dataBars[currentBarIndex].bars[0].data.length - 1)
            const style:BarStyle = {
                index:index,
                color:cat?.color!,
                radius:RADIUS
            }
            const event:EventBar = {
                index:index,
                idBarClick:cat?.id!,
                typeClick:SelectionTypeEnum.category,
            }
            dataBars[currentBarIndex].bars[0].barStyle!.push(style)
            dataBars[currentBarIndex].bars[0].eventBar!.push(event)
        } else {
            dataBars[currentBarIndex].bars[1].data.push(elem.value)
            const cat = categories.find(category => category.id === elem.idCategory)
            const index = (dataBars[currentBarIndex].bars[1].data.length - 1 )
            const style:BarStyle = {
                index:index,
                color:cat?.color!,
                radius:RADIUS
            }
            const event:EventBar = {
                index:index,
                idBarClick:cat?.id!,
                typeClick:SelectionTypeEnum.category,
            }
            dataBars[currentBarIndex].bars[1].barStyle!.push(style)
            dataBars[currentBarIndex].bars[1].eventBar!.push(event)
        }
    }
    return dataBars
}

/**
 * retrieve limit date for result
 */
const getLimitDate = () => {
    const date = new Date()
    const month = date.getMonth()
    let year = date.getFullYear()
    let newMonth = month - 4
    if(newMonth < 0){
        newMonth = 12 + newMonth
        year-=1
    } 
    const newDate = new Date(year, newMonth)
    return newDate.getTime()
}

// export type BarStyle = {
//     index:number;
//     color:string;
//     radius?:number;
// }
// export type EventBar = {
//   index:number;
//   idBarClick:number;
//   typeClick?:any;
// }
// export type Bar = {
//   data:number[];
//   eventBar?:EventBar[];
//   barStyle?:BarStyle[];
// }

// export type DataBar = {
//     title:string;
//     idGroupClick?:number;
//     bars:Bar[];
// }

// export type Bars = DataBar[];

// Format de données
// const data:Bars = [
//     // bar 1
//     {
//         title: 'Oct',
//         idGroupClick:'0',
//         bars: [
//           {
//             data: [536,123,236,140],
//             // barStyle: [
//             //   {index:4, color:"red", radius:2 },
//             // ]
//           },
//           {
//             data: [70,320,164],
//             eventBar:[{index:0, idBarClick:22, typeClick:SelectionTypeEnum.category},
//               {index:1, idBarClick:53, typeClick:SelectionTypeEnum.category}],
//             barStyle: [
//               {index:0, color:"blue", radius:2 },
//               {index:1, color:"pink", radius:2 },
//               {index:2, color:"yellow", radius:2 }            
//             ]
//           },
//         ]
//     },
//     // bar 2
//     {
//         title: 'Nov',
//         idGroupClick:'1',
//         bars: [
//         {
//           data: [1200,236],
//           barStyle: [
//             {index:0, color:"red", radius:2 },
  
//           ]
//         },
//         {
//           data: [80,254,189,163],
//           barStyle: [
//             {index:0, color:"blue", radius:2 },
//             {index:1, color:"pink", radius:2 },
//             {index:2, color:"yellow", radius:2 },            
//             {index:3, color:"orange", radius:2 }            
//           ]
//         }
//       ]
//     },
//       // bar 3
//       {
//         title: 'Dec',
//         bars: [
//         {
//           data: [1546],
//           barStyle: [
//             {index:0, color:"red", radius:2 },
  
//           ]
//         },
//         {
//           data: [125,478]
//         }
//       ]
//     },
//     // bar 4
//     {
//       title: 'Jan',
//       bars: [
//       {
//         data: [1442],
//         barStyle: [
//           {index:0, color:"red", radius:2 },
  
//         ]
//       },
//       {
//         data: [125,478]
//       }
//     ]
//   },
//   // bar 5
//   {
//     title: 'Fev',
//     idGroupClick:'4',
//     bars: [
//     {
//       data: [1326, 129.99],
//       barStyle: [
//         {index:0, color:"red", radius:2 },
  
//       ]
//     },
//     {
//       data: [125,478]
//     }
//   ]
//   }
//   ]
  
  