import {
    Button,
    List,
    InputItem,
    WingBlank,
    WhiteSpace
} from 'antd-mobile'


import {useContext} from 'react'
import myContext from '../../utils/createContext'



function LoginUI(props) {

    const {msg} = useContext(myContext)
    const {handleChange,toRegister,login} = props
    return (
        <>  
            <WingBlank>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <h1>欢&nbsp;迎&nbsp;登&nbsp;录</h1>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>

                <List>
                    {msg ? <div style={{color:'red'}}>{msg}</div> : null}
                    <InputItem placeholder='请输入用户名' onChange={val => {handleChange('username',val)}}></InputItem>
                    <InputItem placeholder='请输入密码' type="password" onChange={val => {handleChange('password',val)}}></InputItem>
                </List>

                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <Button type='primary' onClick={login}>登&nbsp;&nbsp;&nbsp;录</Button>
                <WhiteSpace size="xl"/>               
                <Button type='warning' onClick={toRegister}>没有账号？去注册</Button>
            </WingBlank>
            
        </>
    )
}

export default LoginUI