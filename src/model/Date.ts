export const getFormatDate = (timestamp:number) => {
    const day = new Date(timestamp)
    return day.getDate() + ' ' + month[day.getMonth()] + ' ' + day.getFullYear()
 }

 const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
 
// don't work in android
// export const getFormatDate = (timestamp:number) => {
//     const day = new Date(timestamp)
//     const options = {day:'numeric', month:'long', year:'numeric'}//, hour:'numeric', minute:'numeric'}
//     return day.toLocaleDateString("fr-FR", options)
// }