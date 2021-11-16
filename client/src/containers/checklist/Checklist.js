import {useState,useEffect} from 'react'
import { useHistory } from 'react-router'
import { List, Checkbox ,NavBar, Modal, Button,TextareaItem,WhiteSpace} from 'antd-mobile'
import { createFromIconfontCN } from '@ant-design/icons'

import cookie from 'react-cookies'

import { 
    reqList,
    reqDelList,
    reqShowList
} from '../../api/index'

import {
    SuccessToast,
    FailToast
} from '../../utils/Hint'




const CheckboxItem = Checkbox.CheckboxItem;


function Checklist () {

    const [planData,setPlanData] = useState({
        list:[]
    })

    const [show,setShow] = useState(false)
    const [plan,setPlan] = useState('')

    


    const IconFont = createFromIconfontCN({scriptUrl: 'http://at.alicdn.com/t/font_2682321_vwcwt9ycw1i.js'})
    let history = useHistory()

    const find = () => {
        let user_id = cookie.load('token')
        if(user_id){
            reqShowList({user_id}).then((res) =>{
                let result = res.data
                if(result.code === 0) {
                    setPlanData({...planData,list:result.data})
                }
                else {
                    FailToast('还未写入计划')
                }
            })
        }
        else {
            history.push('/login')
        }
    } 
    useEffect(() => {
        find()
    },[])

    const handleChange = (val) => {
        setPlan(val)
    }

    const add = () => {
        setShow(false)
        let user_id = cookie.load('token')
        if(user_id) {
            reqList({user_id,plan}).then((res) => {
                let result = res.data
                if(result.code === 0){
                    SuccessToast(result.msg);
                }
                else{
                    FailToast('添加失败');
                }
            })
            window.location.reload()

        }
        else {
            history.push('/login')
        }
    }

    const deleteplan = (plan) => {
        Modal.alert('确认删除','是否确认?',[
            {text:'确认',onPress:() => {
                let user_id = cookie.load('token')
                if(user_id) {
                    reqDelList({user_id,plan}).then((res) => {
                        let result = res.data
                        if(result.code === 0){
                            SuccessToast(result.msg);
                        }
                        else{
                            FailToast('删除失败');
                        }
                    })
                    window.location.reload()
                }
                else {
                    history.push('/login')
                }
            }},
            {text:'取消',onPress:() => {console.log('取消成功')}}
        ])
       
    }

    return (
        <>
            <NavBar
                rightContent={
                    <IconFont type='icon-bianji'
                        onClick={() => setShow(true)}
                    />
                }
            >
                我的清单
            </NavBar>
            <WhiteSpace/>
            <WhiteSpace/>
            <WhiteSpace/>
            <List>
                {
                    planData.list.map((item,index) => (
                        <CheckboxItem key={item+index} >
                            {item.plan}
                            <Button type="warning" size="small" inline
                                            style={{
                                                float:'right',
                                                zIndex:100
                                            }}
                                            onClick={() => deleteplan(item.plan)}
                                        >
                                            删
                            </Button>
                        </CheckboxItem>
                        
                    ))
                }

            </List>
            <Modal
                popup  //是否弹窗模式
                visible= {show} //是否显示  false不能为字符串的形式
                animationType="slide-up" //弹窗出来的方式
            >
            <List renderHeader={() => <div>添加清单</div>} className="popup-list">
                <TextareaItem placeholder='输入计划' autoHeight ='rows' onChange = {val => handleChange(val) }/>
                <List.Item>
                <Button type="primary" onClick={() => {add()}}>添加</Button>
                </List.Item>
            </List>
            </Modal>  
           

        </>
    )

}


export default Checklist


 