import {
    Button,
    List,
    InputItem,
    WingBlank,
    WhiteSpace
} from 'antd-mobile'
import {useContext} from 'react'
import myContext from '../../utils/createContext'

import '../../assets/CSS/register.css'


function Register(props) {



    const {msg} = useContext(myContext)
    const {handleChange,register,toLogin} = props

    return (
        <>
            <WingBlank>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <h1>欢&nbsp;迎&nbsp;注&nbsp;册</h1>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>

                <List>
                    {msg ? <div style={{color:'red'}}>{msg}</div> : null}
                    <InputItem placeholder='请输入用户名' onChange={val => {handleChange('username',val)}}></InputItem>
                    <InputItem placeholder='请输入密码' type="password" onChange={val => {handleChange('password',val)}}></InputItem>
                    <InputItem placeholder='再次输入密码' type="password" onChange={val => {handleChange('twoPassword',val)}}></InputItem>
                    <InputItem placeholder='请输入邮箱' onChange={val => {handleChange('email',val)}}></InputItem>
                </List>

                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <Button type='primary' onClick={register}>注&nbsp;&nbsp;&nbsp;册</Button>
                <WhiteSpace size="xl"/>
                <Button type='warning' onClick={toLogin}>已注册？欢迎登录</Button>
            </WingBlank>

        </>
    )
}

export default Register