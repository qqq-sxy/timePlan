//容器组件为父组件
import React,{useState,useEffect} from 'react'
import cookie from 'react-cookies'
import { useHistory } from 'react-router-dom'
import {Modal} from 'antd-mobile'


import {
    reqShowPlan,
    reqDelete
} from '../../api/index'

import { FailToast,SuccessToast } from '../../utils/Hint'

import {TimeClassification} from '../../utils/GetTime'

import myContext from '../../utils/createContext'
import HomeUI from '../../components/homeUI/HomeUI'


function Home() {

    const [dateTimeTask,setDateTimeTask] = useState({list:[]})
    

    const [buttonValue1,setButtonValue1] = useState('显示')
    const [buttonValue2,setButtonValue2] = useState('显示')
    const [buttonValue3,setButtonValue3] = useState('显示')
    const [limitNumber1,setLimitNumber1] = useState('1')
    const [limitNumber2,setLimitNumber2] = useState('1')
    const [limitNumber3,setLimitNumber3] = useState('1')

    const history = useHistory()

    //官方文档 中提到的建议    不要在循环，条件或嵌套函数中调用 Hook,确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们
    const reqPreper = () => {
        const user_id = cookie.load('token')
        if(user_id) {
            reqShowPlan({user_id}).then((res) => {
                let result = res.data
                if(result.code === 0) {
                    setDateTimeTask({...dateTimeTask,list:result.data})
                }
                else {
                    FailToast(result.msg)
                }
            })
            //按时间分类

        }
        else {
            history.push('/login')
        }
    }

    //删除计划
    const deleteplan = (date,time,task) => {
        Modal.alert('确认删除','是否确认?',[
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
                    window.location.reload()
                }
                else {
                    history.push('/login')
                }
            }},
            {text:'取消',onPress:() => {console.log('取消成功')}}

        ])
    }    

    let {oneWeek,twoWeek,moreWeek} = TimeClassification(dateTimeTask.list)

    useEffect(() => {reqPreper()},[])




    const changeButtonValue = (a) => {
        

        if (buttonValue1 === '显示' && a === 1){
            setButtonValue1('隐藏')
            setLimitNumber1('100000')
        }
        else if(buttonValue1 === '隐藏' && a === 1){
            setButtonValue1('显示')
            setLimitNumber1('1')

        }
        else if(buttonValue2 === '显示' && a === 2){
            setButtonValue2('隐藏')
            setLimitNumber2('100000')
        }
        else if(buttonValue2 === '隐藏' && a === 2){
            setButtonValue2('显示')
            setLimitNumber2('1')
        }
        else if(buttonValue3 === '显示' && a === 3){
            setButtonValue3('隐藏')
            setLimitNumber3('100000')
        }
        else {
            setButtonValue3('显示')
            setLimitNumber3('1')
        }
    }


   
    return (
        <>

            <myContext.Provider 
                value={{
                    oneWeek:oneWeek,
                    twoWeek:twoWeek,
                    moreWeek:moreWeek,
                    buttonValue1:buttonValue1,
                    buttonValue2:buttonValue2,
                    buttonValue3:buttonValue3,
                    limitNumber1:limitNumber1,
                    limitNumber2:limitNumber2,
                    limitNumber3:limitNumber3,
                    dateTimeTask:dateTimeTask
                }} 
            >
                    <HomeUI 
                        changeButtonValue={changeButtonValue}
                        deleteplan={deleteplan}
                    />
            </myContext.Provider>
            
        </>
    )
}

export default Home

