import {useState,useEffect} from 'react'
import cookie from 'react-cookies'
import { useHistory } from 'react-router'

import {  
    NavBar, 
    List,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile'

import { createFromIconfontCN } from '@ant-design/icons'

import {
    reqUserInfo
} from '../../api/index'

import {FailToast} from '../../utils/Hint'



import logo from '../../assets/pictures/logo.jpg'



const IconFont = createFromIconfontCN({scriptUrl: 'http://at.alicdn.com/t/font_2682321_vwcwt9ycw1i.js'})
const ListItem = List.Item

export default function Center () {

    let history = useHistory()

    const [state,setState] = useState({
        username: '',
        email: ''
    })

    // const pleaseuser = () => {
    //     const user_id = cookie.load('token')
    //     if(user_id) {
    //         reqUserInfo({user_id}).then((res) => {
    
    //             let result = res.data
    //             if(result.code === 0) {
    //                 setState({
    //                     username:result.info.username,
    //                     email:result.info.email
    //                 })
    //             }
    //             else {
    //                 FailToast(result.msg)
    //             }
    //         })
    //     }
    //     else {
    //         history.push('/login')
    //     }
    // }

    useEffect(() => { 
            const user_id = cookie.load('token')
            if(user_id) {
                reqUserInfo({user_id}).then((res) => {
                    let result = res.data
                    if(result.code === 0) {
                        setState({
                            username:result.info.username,
                            email:result.info.email
                        })
                    }
                    else {
                        FailToast(result.msg)
                    }
                })
            }
            else {
                history.push('/login')
            }
    },[])


    //修改密码
    const toChangePasword = () => {
        history.push('/changepassword')
    }

    
    //退出登录
    const signOut = () => {
        cookie.remove('token')
        history.push('/login')
    }
  
    return (
        <>
            <NavBar>个人中心</NavBar>
            <img src={logo} alt="logo" style={{
                width:'100px',
                marginLeft: 135,
                marginTop:60
            }}/>
            <WingBlank>
                    <WhiteSpace/> 
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                <List>
                    <ListItem ><IconFont type='icon-yonghuming'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{state.username}</ListItem>
                    <WhiteSpace/>
                    <ListItem ><IconFont type='icon-youxiang2'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{state.email}</ListItem>
                   
                    


                </List>
                

                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" onClick={toChangePasword}>修改密码</Button>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="warning" onClick={signOut}>退出登录</Button>
            </WingBlank>
        
            

            

        
        </>
    )
  
}




