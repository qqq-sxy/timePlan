import { useState,useImperativeHandle,useRef} from 'react';
import { Calendar } from 'antd-mobile';
import { useDispatch } from 'redux-react-hook'


import {
  dateSuccess,
  timeSuccess
} from '../../redux/actions'


import PlanInput from '../planinput/PlanInput';

const now = new Date();


function AddPlan ({cRef}) {

const childRef = useRef()
const dispatch = useDispatch()



const showModal = () => {
  childRef.current.showModal()
}
 
const [state,setState] = useState({show: false})




useImperativeHandle(cRef, () => ({
      becomeShow:() => {
          setState({
              show:true
          })
      }
}))



//将时间给dispatch出去
const addPlanAction = (a,b) => {
  dispatch(dateSuccess(a))
  dispatch(timeSuccess(b))

}


//确认
const onConfirm = (startTime) => {
    //将日期与时间给分开
    let date = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate()
    let time = startTime.getHours() + ':' + String(startTime.getMinutes()).padStart(2, "0"); //padStart()  用另一个字符串填充当前字符串(可以多次)，直到字符串达到给定的长度
    addPlanAction(date,time)
    setState({show: false})
    showModal()
    
  }


//取消
const onCancel = () => {
    setState({show: false})
  }


  
return (
      <>
        <PlanInput cRef={childRef} />
        <Calendar
          type= 'one'   //选择类型 one : 单日   range : 日期区间
          pickTime= 'true' //是否选择时间
          visible={state.show} //是否显示日历
          onCancel={onCancel}//关闭时回调
          onConfirm={onConfirm}//确认时回调
          minDate={new Date(+now - 5184000000)} //最小日期
          maxDate={new Date(+now + 31536000000)} //最大日期

        />
      </>
    );
  
}


export default AddPlan


