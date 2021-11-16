import {useState} from 'react'
import { useHistory } from "react-router-dom"

import { useMappedState,useDispatch } from 'redux-react-hook'

import cookie from 'react-cookies'

import myContext from '../../utils/createContext'
import LoginUI from '../../components/loginUI/LoginUI'

import {
    authSuccess,
    errorMsg
}from '../../redux/actions'


import {
    reqLogin
} from '../../api/index' 

function Login() {


    const msg = useMappedState(state => state.msg)



    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    let history = useHistory()
    const dispatch = useDispatch()


    const handleChange = (name,val) => {
        if(name === 'username') {
            setUsername(val)
        }
        else if(name === 'password') {
            setPassword(val)
        }

        else {
            console.log('jjj');
        }
    }

    //将后台返回来的token保存在cookies  并且  定时删除
    const aboutCookie = (e) => {
        //定义cookies在一小时后自动失效
        let deleteTime = new Date(new Date().getTime() +1000*60*60)
        cookie.save('token',e,{expires: deleteTime},{path:'/'})
    }



    const login = () => {
        if(!username || !password ) {
            dispatch(errorMsg('信息未填写完全!'))
        } 
        else {    
            dispatch(authSuccess(username))
            reqLogin({username, password}).then(res => {
                // loginAction(res)
                const result = res.data
                if(result.code===0) {// 成功
                    aboutCookie(result.token)
                    history.push('/home')
                }
        
                else { // 失败
                    // 分发错误提示信息的同步action
                    dispatch(errorMsg(result.msg))
                }
            })
            
            
        }   
    }
    

    const toRegister = () => {
        history.replace('/register')
      }



    return (
        <>
            <myContext.Provider
                value={{
                    msg:msg
                }}
            >
                <LoginUI
                    handleChange={handleChange}
                    login={login}
                    toRegister={toRegister}
                />
            </myContext.Provider>
        </>
    )
}

export default Login