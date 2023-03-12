import { post } from "../utils/http";

export function login(userInfo) {
    return post('/login',userInfo)
}