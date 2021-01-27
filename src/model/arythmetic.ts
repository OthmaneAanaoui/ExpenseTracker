export const numberToString = (num?:number) => {
    if(num !== undefined){
        let numberString = num.toString()
        let index = numberString.indexOf('.')
        while(index > 0){
            if(index > 0)
            numberString = numberString.substring(0, index - 3) + ' ' + numberString.substring(index - 3 ) 
            index-=3
        }
        return num.toString().replace('.',',')
    }
    return ''
}

export const stringToNumber = (str:string) => {
    return Number(str.replace(',','.').replace(' ',''))
}