import {useEffect,useState} from 'react'
import { useHistory } from 'react-router'
import cookie from 'react-cookies'

import {
    Modal,
    NavBar,
    Card,
    WingBlank,
    Button
} from 'antd-mobile'

import {
    reqShowPlan,
    reqDelete
} from '../../api/index'
import {TimeClassification} from '../../utils/GetTime'
import {FailToast,SuccessToast} from '../../utils/Hint'





function TimedOut() {

    const [state,setState] = useState({list:[]})

    const history = useHistory()

    //挑出超时的计划
    const reqShow = () => {
        const user_id = cookie.load('token')
        if(user_id) {
            reqShowPlan({user_id}).then((res) => {
                let result = res.data
                if(result.code === 0) {
                    setState({...state,list:result.data})
                }
                else {
                    FailToast(result.msg)
                }
            })
        }
        else {
            history.push('/login')
        }
    }

     //删除计划
     const deleteplan = (date,time,task) => {
        Modal.alert("确认删除",'是否确认?',[
            {text:'确认',onPress:() => {
                const user_id = cookie.load('token')
                if(user_id) {
                    reqDelete({date,time,task,user_id}).then((res) => {
                        let result = res.data
                        if(result.code === 0){
                            SuccessToast(result.msg)
                        }
                        else{
                            FailToast('删除失败')
                        }
                    })
                }
                else {
                    history.push('/login')
                }
            }},
            {text:'取消',onPress:() => {console.log('取消成功');}}
        ])
        
      
    }    


    useEffect(() => {reqShow()},[])


    let {pastWeek} = TimeClassification(state.list)
     

    return (
        <>
            <NavBar>计划已超时</NavBar>        

            <WingBlank>
                {
                        pastWeek.map((item,index) => {
                            return (

                                <Card key={item+index} style={{marginTop:20}}>
                                    <Card.Header
                                        title={item.date}
                                        style={{
                                                backgroundColor: "#dee1e6",
                                                fontWeight:"800",
                                                borderTopLeftRadius:'10px',
                                                borderTopRightRadius:'10px'
                                        }}
                                        extra={<span>{item.time}</span>}
                                    />
                                    <Card.Body>                                  
                                        {item.task}  
                                        <Button type="warning" size="small" inline
                                            style={{
                                                float:'right',
                                            }}
                                            onClick={() => deleteplan(item.date,item.time,item.task)}
                                        >
                                            删
                                        </Button>
                                    </Card.Body>  
                                </Card>                                                                  
                            )
                        }) 
                }

                
            </WingBlank>
        </>
    )
}
export default TimedOut