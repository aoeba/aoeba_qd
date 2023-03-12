import { post,put,get,del, } from "@/utils/http";

/**
 * 根据条件分页获取note list
 * @param {*} tags 标签名，多个时以英文逗号分割
 * @param {*} keyword 关键字
 * @param {*} category 分类
 * @param {*} pageno 当前页（从1开始）
 * @param {*} pagesize 每页大小
 */
 export const getNoteList = (tags = '', keyword = '', category = '', pageno = 1, pagesize = 10) => {
    let reqUrl = "/note/find?tags=" + tags + "&keyword=" + keyword + "&category=" + category + "&pageNo=" + pageno + "&pageSize=" + pagesize
    return get(reqUrl)
}

/**
 * 保存note
 * @param {*} note note数据
 */
 export const saveNote = (note) => {
    return put("/note", note);
}

/**
 * 更新note
 * @param {*} note note数据
 */
export const updateNote = (note) => {
    return put("/note", note);
}

/**
 * 获取note
 * @param {*} id noteId
 */
 export const getNote = (id) => {
    return get("/note/" + id);
}
/**
 * note的tagArray转str
 * @param {*} tagArray 
 * @returns 
 */
export const tagArrayTostr = (tagArray) => {
    let tags = "";
    tagArray.forEach((t) => {
        if (t instanceof Object) {
            tags += t.name + ",";
        } else {
            tags += t + ",";
        }
    });
    if (tags.endsWith(",")) {
        tags = tags.substring(0, tags.length - 1);
    }
    return tags
}

/**
 * 推送note到微信公众号
 * @param {*} note note数据
 * @param {*} callback 成功时的回调函数
 */
 export const pushNoteToWxgzh = (note) => {
    return post("/wxgzh/push", note);
}

/**
 * 获取tags[{name:'',size:''}]
 */
export const getTags = () => {
    return get("/note/getTags")
}

/**
 * 获取categories[{category:'',size:''}]
 */
 export const getCategories = () => {
    return get("/note/getCategories")
}

/**
 * 更新note的mark
 */
export const updateNoteMark = (id,mark) => {
    return post("/note/updateMark",{id:id,mark:mark})
}