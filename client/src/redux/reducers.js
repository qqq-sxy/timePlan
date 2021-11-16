// import {combineReducers} from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    DATE_SUCCESS,
    TIME_SUCCESS,
    TIMEDOUT_SUCCESS,
    // CHANGEPASSWORD_SUCCESS
} from './action-types'

//创建的默认值
const initUser = {
    username:'',
    msg:'',//错误提示信息
    date:'',
    time:'',
    timedout:'',
    // password,
    // okpassword,
    // code:''
}

//Reducer里只能接收state，不能改变state
//state是指原始仓库里的状态，action是新传递的状态
function user(state=initUser,action) {
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state, username : action.data}
        case ERROR_MSG:
            return {...state, msg : action.data}
        case DATE_SUCCESS:
            return {...state, date : action.data}
        case TIME_SUCCESS:
            return {...state, time : action.data}
        case TIMEDOUT_SUCCESS:
            return {...state, timedout: action.data}
        // case CHANGEPASSWORD_SUCCESS:
        //     const {password,okpassword,code} = action.data
        //     return {
        //         password,okpassword,code
        //     }
        default:
            return state
    }

}



export default user



