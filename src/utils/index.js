import axios from "axios"

const req = axios.create()
/**
 * 将字符串格式日期转换为Y-M-D格式
 * @param {String} strDate 
 * @param {Nubmer} type 1:Y-M-D  else: Y-M-D H:Min:S
 * @returns 
 */
export function strDateToYMD(strDate,type = 1) {
    let curDate = new Date(strDate)
    let Y = curDate.getFullYear();
    let M = curDate.getMonth() + 1 < 10 ? `0${curDate.getMonth() + 1}` : `${curDate.getMonth() + 1}`;
    let D = curDate.getDate() < 10 ? `0${curDate.getDate()}` : `${curDate.getDate()}`;
    let H = curDate.getHours() < 10 ? `0${curDate.getHours()}` : `${curDate.getHours()}`;
    let Min = curDate.getMinutes() < 10 ? `0${curDate.getMinutes()}` : `${curDate.getMinutes()}`;
    let S = curDate.getSeconds() < 10 ? `0${curDate.getSeconds()}` : `${curDate.getSeconds()}`;
    if (type === 1) {
        return `${Y}-${M}-${D}`
    }
    return `${Y}-${M}-${D} ${H}:${Min}:${S}`
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

/**
 * 把字节转换成正常文件大小
 * @param {*} size 
 * @returns 
 */
export function getFileSize(size) {
    if (!size) return "";
    var num = 1024.00; //byte
    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "KB"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

/**
 * 时间戳转日期 1:Y-M-D  else: Y-M-D H:Min:S
 * @param {*} timer 
 * @returns 
 */
export function timestampToTime(timer, type) {
    let curDate = new Date(timer * 1000);
    let Y = curDate.getFullYear();
    let M = curDate.getMonth() + 1 < 10 ? `0${curDate.getMonth() + 1}` : `${curDate.getMonth() + 1}`;
    let D = curDate.getDate() < 10 ? `0${curDate.getDate()}` : `${curDate.getDate()}`;
    let H = curDate.getHours() < 10 ? `0${curDate.getHours()}` : `${curDate.getHours()}`;
    let Min = curDate.getMinutes() < 10 ? `0${curDate.getMinutes()}` : `${curDate.getMinutes()}`;
    let S = curDate.getSeconds() < 10 ? `0${curDate.getSeconds()}` : `${curDate.getSeconds()}`;
    if (type === 1) {
        return `${Y}-${M}-${D}`
    }
    return `${Y}-${M}-${D} ${H}:${Min}:${S}`
}

/**
 * 限制字符串长度,超出时省略
 * @param {String} s 待分割字符串
 * @param {Number} len 限定长度
 * @returns 
 */
export function splitString(s,len = 300) {
    if (s.length > len) {
        return s.substring(0,len) + "..."
    } else {
        return s
    }
}