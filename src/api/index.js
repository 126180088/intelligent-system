import ajax from './ajax'
const BASE = 'https://localhost:5001'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    //登录
    reqLogin(username, password) {
        return ajax(BASE + '/api/Home/CreateToken', { username, password }, 'POST')
    }
}