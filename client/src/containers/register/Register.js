import {useState} from 'react'
import { useHistory } from "react-router-dom"
import {useMappedState, useDispatch} from 'redux-react-hook'


import myContext from '../../utils/createContext'
import RegisterUI from '../../components/registerUI/RegisterUI'

import {
    authSuccess,
    errorMsg
}from '../../redux/actions'


import {
    reqRegister
} from '../../api/index' 


function Register() {

    const dispatch = useDispatch()
    const msg = useMappedState(state => state.msg)
    


    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [twoPassword,setTwoPassword] = useState('')
    const [email,setEmail] = useState('')

    let history = useHistory()

    const handleChange = (name,val) => {
        if(name === 'username') {
            setUsername(val)
        }
        else if(name === 'password') {
            setPassword(val)
        }
        else if(name === 'twoPassword') {
            setTwoPassword(val)
        }
        else if(name === 'email'){
            setEmail(val)
        }
        else {
            console.log('jjj');
        }
    }

    const registerAction = (res) => {
        // console.log(result);
        // console.log(result.data);
        const result = res.data
        if(result.code===0) {// 成功
            history.push('/login')
            //分发授权成功的同步action
            dispatch(authSuccess(result.data))
        }

        else { // 失败
            // 分发错误提示信息的同步action
            dispatch(errorMsg(result.msg))
            console.log(result.msg);
        }
    }

    const register = () => {
        if(!username || !password || !twoPassword || !email) {
            // console.log('信息未填写完全!');
            dispatch(errorMsg('信息未填写完全!'))
        } 
        else if(password!==twoPassword) {
            // console.log('2次密码要一致!')
            dispatch(errorMsg('2次密码要一致!'))
        }
        else if(!(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))){
            // console.log('邮箱不正确')
            dispatch(errorMsg('邮箱不正确'))
        }
        
        else {
            
            reqRegister({username, password, email}).then(res => {
                registerAction(res)
            })
            
            
        }   
        // else {
        //     dispatch(errorMsg('jjj'))
        // }
        
        // return async () => {
        //     console.log('ll');
        //         let response = await reqRegister({username, password, email})
        //         console.log(response);
        //     }
            
            // async () => {
            //     const response = await reqRegister({username, password, email})
            //     const result = response.data //  {code: 0/1, data: user, msg: ''}
            //     console.log(result);
            //     console.log(response);
            // }
    }
            // if(result.code===0) {// 成功

            // //分发授权成功的同步action
            // dispatch(authSuccess('jjj'))
            // } 
            // else { // 失败
            // //分发错误提示信息的同步action
            // dispatch({type: ERROR_MSG, msg:'sss'})
            // }
        




                
    

    const toLogin = () => {
        history.replace('/login')
      }



    return (
        <>
            <myContext.Provider
                value={{
                    msg:msg
                }}
            >
                <RegisterUI
                    handleChange={handleChange}
                    register={register}
                    toLogin={toLogin}
                />
            </myContext.Provider>
        </>
    )
}

// const mapState = (state) => {
//     return {
//         inputValue:state.inputValue
//     }
// }
// export default connect()(Register)
export default Register