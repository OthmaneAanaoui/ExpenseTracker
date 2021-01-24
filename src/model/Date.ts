export const getFormatDate = (timestamp:number) => {
    const day = new Date(timestamp)
    const options = {day:'numeric', month:'long', year:'numeric'}//, hour:'numeric', minute:'numeric'}
    return day.toLocaleDateString("fr-FR", options)
}