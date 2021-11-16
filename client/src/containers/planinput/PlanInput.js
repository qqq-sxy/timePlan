import {useState,useImperativeHandle} from 'react'
import { Modal, List, Button, WingBlank, TextareaItem } from 'antd-mobile';
import { useMappedState } from 'redux-react-hook'
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom"

import {
  reqDateTimeTask
} from '../../api/index'

import {SuccessToast,FailToast} from '../../utils/Hint'

function PlanInput({cRef})  {
  
  const [state,setState] = useState(false)
  const [task,setTask] = useState('')


  const date = useMappedState(state => state.date)
  const time = useMappedState(state => state.time)

  let history = useHistory()


  const showModal =  () => {
    // e.preventDefault(); // 修复 Android 上点击穿透
    setState(true)
  }

  const onClose =  () => {
    setState(false)
  }

  const sendData = () => {
    const user_id = cookie.load('token')
    if(user_id){
      if(task) {
        reqDateTimeTask({date,time,task,user_id}).then((res) => {
          if(res.data.code === 0) {
            SuccessToast(res.data.msg)
          }
          else{
            FailToast(res.data.msg)
          }
        })
        window.location.reload()
      }
      else {
        FailToast('计划不能为空!')
      }
    }
    else {
      history.push('/login')
    }
   
  }

  useImperativeHandle(cRef,() => ({
      //aa即为子组件暴露给父组件的方法
      showModal : () => {
        showModal()
      }
  }))

return (
      <WingBlank>
        <Modal
          popup  //是否弹窗模式
          visible={state} //是否显示
          onClose={onClose} //点击X回调
          animationType="slide-up" //弹窗出来的方式
        >
          <List renderHeader={() => <div>计划安排</div>} className="popup-list">
            <TextareaItem placeholder='请输入事项' autoHeight ='rows' onChange={(val) => {setTask(val)}} />
            <List.Item>
              <Button type="primary" onClick={() => {onClose(); sendData()}}>保存</Button>
            </List.Item>
          </List>
        </Modal>
      </WingBlank>
    );
}


export default PlanInput