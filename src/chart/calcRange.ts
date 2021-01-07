import { Bars } from "./BarType";
/**
 * Return max value and min value of data set
 * contained in Bars.bars
 * @param Bars data type
 * @return {maxheight, minHeight}
 */
export const minMaxHeight = (data: Bars) => {
    let maxHeight = 0;
    let minHeight = 0;
    data.forEach(dataBar => {
        // iterate on bars and get min and max values of data set
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

/**
 * Return a bar width in graph according to its value
 * @param value 
 * @param range -> data range (maxHeight - minHeight)
 * @param heightCanvas 
 * @return width in graph
 */
export const getProportionHeight = (value: number, range: number, heightCanvas: number) => {
    return (((heightCanvas) / range) * value)
}

/**
 * Calculates a step and returns all the step values for the y-axis
 * @param maxHeight -> max value of data
 * @param minHeight -> min value of data
 * @param nbGridLine -> desired number of lines on the y-axis
 * @return array of values definiting the y-axis
 */
export const getY_LegendValue = (maxHeight: number, minHeight: number, nbGridLine: number) => {
    // Calculate of step
    const step = Math.floor(Math.max(maxHeight, Math.abs(minHeight)) / (nbGridLine + 1))
    const stepLength = step.toString().length - 2
    let firstChar = step.toString().charAt(0)
    let secondChar = ''
    if (step > 10) {
        secondChar = step.toString().charAt(1)
    }
    // according to the second char we practice a rounding
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
    // Reconstruction of the rounded step with the correct number of digits
    const stepValue = parseInt(firstChar + secondChar) * Math.pow(10, stepLength)
    let values = []
    let cumulStepValue = stepValue
    // Filling positive values
    while (cumulStepValue < maxHeight) {
        values.push(cumulStepValue)
        cumulStepValue += stepValue
    }
    // Filling negative values
    cumulStepValue = -stepValue
    while (cumulStepValue > minHeight) {
        values.push(cumulStepValue)
        cumulStepValue -= stepValue
    }

    return values
}

/**
 * Calculate width bar in graph
 * @param widthGraph 
 * @param data 
 * @param spacingGroupBar 
 * @param spacingBar 
 * @return {widthBar, spacingGroupBar}
 */
export const calcWidthBar = (widthGraph:number, data: Bars, spacingGroupBar?:number, spacingBar?:number) => {
    let nbBars = 0
    const nbGroupBar = data.length - 1
    data.forEach(dataBar => {
        nbBars += dataBar.bars.length
    })
    const totalWidth = (nbBars -1) * (spacingBar||0) + (nbGroupBar * (spacingGroupBar||0))
    let widthBar = (widthGraph - totalWidth) / nbBars
    // If width bar is less than 10, width bar = 10 and ignored/modified spacingGroupBar
    if(widthBar < 10) {
        widthBar = 10
        spacingGroupBar = (widthGraph - (nbBars * widthBar) - ((nbBars -1) * (spacingBar||0))) / nbGroupBar
    }
    return {widthBar, spacingGroupBar}
}