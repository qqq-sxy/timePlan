import {useState} from 'react'
import { useHistory } from 'react-router'
import cookie from 'react-cookies'
import {Button, InputItem,WhiteSpace,NavBar,WingBlank} from 'antd-mobile'
import { createFromIconfontCN } from '@ant-design/icons'
import {SuccessToast,FailToast} from '../../utils/Hint'



import {reqGetCode,reqChangePassword} from '../../api/index'
//防抖函数
import Debounce from '../../utils/Debounce'


const IconFont = createFromIconfontCN({scriptUrl: 'http://at.alicdn.com/t/font_2682321_w88vslnviid.js'})




function ChangePassword() {

    let history = useHistory()

    const color = '#108ee9'
    
    const [state,setState] = useState({
        password:'',
        okpassword:'',
        code:''
    })
    
    

    const getCode = () => {
        
        let user_id = cookie.load('token')
        if(user_id) {
            reqGetCode({user_id}).then((res) => {
                if(res.data.code === 0) {
                    SuccessToast(res.data.msg)
                }
                else {
                    FailToast(res.data.msg)
                }
            })
        }
        else {
            history.push('/login')
        }
    }

    const changePassword = () => {
        const user_id = cookie.load('token')
        if(user_id) {
            let {password,okpassword,code} = state
            if(!password || !okpassword || !code){
                FailToast('信息填写不全')
            }
            else if(password !== okpassword) {
                FailToast('两次密码不一致!')
            }
            else {
                reqChangePassword({user_id,password,code}).then((res) => {
                    if(res.data.code === 0) {
                        SuccessToast(res.data.msg)
                    }
                    else {
                        FailToast(res.data.msg)
                    }
                })
            }
        }
        else {
            history.push('/login')
        }
    }

    return (
        <>  
            <NavBar 
                leftContent={<IconFont type="icon-fanhui" onClick={() => history.push('/center')}/>}
            >
                修改密码
            </NavBar>
            <WhiteSpace/>
            <WhiteSpace/>
            <WhiteSpace/>
            <WingBlank>
                <InputItem placeholder='新密码' onChange={e => setState({...state,password:e})}><IconFont type='icon-mima'/></InputItem>
                <InputItem placeholder='确认密码' onChange={e => setState({...state,okpassword:e})}><IconFont type='icon-confirmBlue'/></InputItem>
                <InputItem placeholder='验证码' onChange={e => setState({...state,code:e})}><IconFont type='icon-yanzhengma2'/></InputItem>
                <span 
                    style={{float:'right',color:color}} 
                    onClick={Debounce(getCode,1000)}
                >
                获取验证码
                </span>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="warning" onClick={changePassword}>修改</Button>

            </WingBlank>
            
        </>
    )
}

export default ChangePassword