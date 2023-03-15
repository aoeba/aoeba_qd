import { get,put } from "@/utils/http";

/**
 * 获取qdSetting
 */
 export const getQdSetting = () => {
    return get("/setting/qdSetting");
}

/**
 * 更新前端界面设置信息
 * @param {string} jsonStr 
 * @returns 
 */
 export const updateQdSetting = (jsonStr) => {
    return put("/setting/qdSetting",{qdSetting : jsonStr});
}