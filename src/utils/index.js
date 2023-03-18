import axios from "axios"

const req = axios.create()
/**
 * 将字符串格式日期转换为Y-M-D格式
 * @param {String} strDate 
 * @returns 
 */
export function strDateToYMD(strDate) {
    let d = new Date(strDate)
    let s = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
    return s
}

/**
 * 获取用户ip地址
 * https://www.cnblogs.com/romanticcrystal/p/17016342.html
 * @param {function({ip:''})} callback 
 */
export function getUserIP(callback) {

    req.get("https://api.ipify.org?format=jsonp").then(res => {
        if (res.status == 200) {
            // res.data : callback({"ip":""}); 通过eval直接执行即可
            eval(res.data)
        }
    })
}

/**
 * 判断时间2是否在时间1 指定月内
 * @param {date} time1 时间1
 * @param {date} time2 时间2
 * @param {number} m 月数
 * @returns 
 */
export function completeDate(time1, time2, m) {
    const year1 = time1.getFullYear()
    const year2 = time2.getFullYear()
    const month1 = time1.getMonth() + 1
    const month2 = time2.getMonth() + 1
    const day1 = time1.getDate()
    const day2 = time2.getDate()
    if (year2 === year1) { // 判断两个日期 是否是同年
        if (month2 - month1 > m) { // 相差是否 在m个月中
            return false
        } else if (month2 - month1 === m) { // 如果正好为 m月 判断天数
            if (day2 > day1) {
                return false
            }
        }
    } else { // 不同年
        if (year2 - year1 > 1) {
            return false
        }
        else if (year2 - year1 === 1) {
            if (month2 > m || month1 + m - month2 < 12) {
                return false
            }
            else if (month1 + m - month2 === 12) { // 正好为m月 判断天数
                if (day2 > day1) {
                    return false
                }
            }
        }
    }
    return true
}
