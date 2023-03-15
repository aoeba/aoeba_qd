/**
 * 将字符串格式日期转换为Y-M-D格式
 * @param {String} strDate 
 * @returns 
 */
export function strDateToYMD(strDate)  {
    let d = new Date(strDate)
    let s =  d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
    return s
} 