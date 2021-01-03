import { Bars } from "./BarType";

export const minMaxHeight = (data: Bars) => {
    let maxHeight = 0;
    let minHeight = 0;
    data.forEach(dataBar => {
        dataBar.bars.forEach(bar => {
            let heightBar = 0
            bar.data.forEach(value => heightBar += value)
            if (maxHeight < heightBar) {
                maxHeight = heightBar
            }
            if (minHeight > heightBar) {
                minHeight = heightBar
            }
        })
    })
    maxHeight *= 1.02
    minHeight *= 0.98
    return { maxHeight, minHeight }
}

export const getProportionHeight = (value: number, range: number, heightCanvas: number) => {
    return (((heightCanvas) / range) * value)
}

export const getY_LegendValue = (maxHeight: number, minHeight: number, nbGridLine: number) => {
    const step = Math.floor(Math.max(maxHeight, Math.abs(minHeight)) / (nbGridLine + 1))
    const stepLength = step.toString().length - 2
    let firstChar = step.toString().charAt(0)
    let secondChar = ''
    if (step > 10) {
        secondChar = step.toString().charAt(1)
    }
    switch (secondChar) {
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
            secondChar = '5'
            break;
        case '8':
        case '9':
            const valChar = parseInt(firstChar) + 1
            firstChar = valChar.toString()
        default:
            secondChar = '0'
            break;
    }
    const stepValue = parseInt(firstChar + secondChar) * Math.pow(10, stepLength)
    let values = []
    let cumulStepValue = stepValue
    while (cumulStepValue < maxHeight) {
        values.push(cumulStepValue)
        cumulStepValue += stepValue
    }

    cumulStepValue = -stepValue
    while (cumulStepValue > minHeight) {
        values.push(cumulStepValue)
        cumulStepValue -= stepValue
    }

    return values
}

export const calcWidthBar = (widthGraph:number, data: Bars, spacingGroupBar?:number, spacingBar?:number) => {
    let nbBars = 0
    const nbGroupBar = data.length - 1
    data.forEach(dataBar => {
        nbBars += dataBar.bars.length
    })
    const totalWidth = (nbBars -1) * (spacingBar||0) + (nbGroupBar * (spacingGroupBar||0))
    let widthBar = (widthGraph - totalWidth) / nbBars
    if(widthBar < 10) {
        widthBar = 10
        spacingGroupBar = (widthGraph - (nbBars * widthBar) - ((nbBars -1) * (spacingBar||0))) / nbGroupBar
    }
    return {widthBar, spacingGroupBar}
}