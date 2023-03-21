import { post, put, get, del, uploadFile as uploadFileApi} from "@/utils/http";

/**
 * 获取文件夹下的文件
 * @param {String} path 文件路径
 * @returns 
 */
export function readDir(path) {
    return get("/storage/readdir", {
        path: path
    })
}

/**
 * 新增文件夹
 * @param {String} path 路径
 * @returns 
 */
 export function addDir(path) {
    return get("/storage/mkdir", {
        path: path
    })
}

/**
 * 删除文件
 * @param {String} path 文件路径
 * @returns 
 */
 export function delDir(path) {
    return get("/storage/rmdir", {
        path: path
    })
}

/**
 *  let format = new window.FormData(); format.append("file", file.raw); format.append("path", '');

 *  上传文件
 * @param {FormData} formdata 
 * @param {Object} uploadProgress 
 * @returns 
 */
export function uploadFile(formdata, uploadProgress) {
    return uploadFileApi("/storage/writefile",formdata,uploadProgress)
}

