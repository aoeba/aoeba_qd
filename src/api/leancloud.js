// 操作leancloud相关的方法
import AV from "leancloud-storage"
import { getUserIP } from '@/utils'

AV.init({
    appId: "7y923bTeG3HWwclw2AaHdXId-gzGzoHsz",
    appKey: "osps7WZiLPsNQz0XVL2F9hvw",
    serverURL: "https://leancloud.mk95.cn",
});

const VisitorCounter = AV.Object.extend("VisitorCounter")
const VisitorRecord = AV.Object.extend("VisitorRecord")

/**
 * 更新页面点击数
 * @param {String} url 路径，页面唯一标识
 * @param {String} title 标题
 */
export function updateVisitorCounter(url, title) {
    const query = new AV.Query("VisitorCounter")
    query.equalTo("pageUrl", url)
    query.find().then(res => {
        if (res.length > 0) {
            const counter = res[0]
            const todo = AV.Object.createWithoutData("VisitorCounter", counter.id);
            const pv = counter.get("PV") + 1
            todo.set("PV", pv);
            todo.save()
        } else {
            const counter = new VisitorCounter()
            counter.set("pageUrl", url)
            counter.set("pageTitle", title)
            counter.set("PV", 1)
            counter.save()
        }
    })
}

/**
 * 保存访问记录
 * @param {String} title 标题
 * @param {String} url 页面路径，唯一标识
 */
export function saveVisitorRecord(title,url) {
    // 记录访问的ip相关信息 https://ip.taobao.com/outGetIpInfo?ip=114.5.88.88&accessKey=alibaba-inc
    getUserIP((res) => {
        const ip = res.ip
        const visitorRecord = new VisitorRecord()
        visitorRecord.set("ip", ip)
        visitorRecord.set("pageTitle", title)
        visitorRecord.set("pageUrl", url)
        // visitorRecord.set("geo", JSON.stringify(res))
        visitorRecord.save()
    })
}

/**
 * 根据url查询页面点击量
 * @param {String} url 页面的唯一标识
 */
export function getReadCount(url) {
    return new Promise((resolve, reject) => {
        const query = new AV.Query("VisitorCounter")
        query.equalTo("pageUrl", url)
        query.find().then(res => {
            const counter = res[0]
            const pv = counter.get("PV")
            resolve(pv)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 根据url批量查询页面点击量
 * @param {String} urls 页面的唯一标识组成的数组
 */
 export function getReadCountByUrls(urls) {
    return new Promise((resolve, reject) => {
        const query = new AV.Query("VisitorCounter")
        query.containedIn("pageUrl", urls)
        query.find().then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}