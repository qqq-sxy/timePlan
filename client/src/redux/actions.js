import {
    AUTH_SUCCESS,
    ERROR_MSG,
    DATE_SUCCESS,
    TIME_SUCCESS,
    TIMEDOUT_SUCCESS,
    // CHANGEPASSWORD_SUCCESS
} from './action-types'




// 授权成功的同步action
export const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示信息的同步action
export const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
//数据state更新成功
export const dateSuccess = (date) => ({type: DATE_SUCCESS, data: date})
export const timeSuccess = (time) => ({type: TIME_SUCCESS, data: time})
//超时计划入store成功
export const timedoutSuccess = (timedout) => ({type: TIMEDOUT_SUCCESS, data: timedout})

//更改密码成功
// export const changePassword = ({password,okpassword,code}) => ({type:CHANGEPASSWORD_SUCCESS,data:{password,okpassword,code}})
