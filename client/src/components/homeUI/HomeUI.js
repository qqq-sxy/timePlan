import {useContext,useRef} from 'react'


import {
    NavBar,
    Card,
    WingBlank,
    WhiteSpace
} from 'antd-mobile'

import {
    InsertRowAboveOutlined, 
    PlusOutlined
} from '@ant-design/icons'

import { createFromIconfontCN } from '@ant-design/icons'



import '../../assets/CSS/home.css'
//获取当前的日期和星期
import {GetTime} from '../../utils/GetTime'
import myContext from '../../utils/createContext'
import CarouselPic from '../carouselpic/CarouselPic'
import AddPlan from '../../containers/addPlan/AddPlan'

const IconFont = createFromIconfontCN({scriptUrl: 'http://at.alicdn.com/t/font_2682321_z8ggmircfaq.js'})

function HomeUI(props) {


    const {oneWeek,twoWeek,moreWeek,buttonValue1,buttonValue2,buttonValue3,limitNumber1,limitNumber2,limitNumber3} = useContext(myContext)
    const {changeButtonValue,deleteplan} = props
    
    const childRef = useRef()


    const showCalendar = () => {
        childRef.current.becomeShow()
    }

   
    return (

        <>
            <AddPlan cRef={childRef} />

            <NavBar
                leftContent={[<InsertRowAboveOutlined key='0'/>]}
                rightContent={[<PlusOutlined key='1' onClick={showCalendar}/>]}
                style={{position: 'fixed' ,width:'100%', top: -1,zIndex:100 } }
            >               
                {GetTime()}    
            </NavBar>
            <WhiteSpace size="xl"/>
            <WingBlank>
                <WhiteSpace size="xl"/>
                <CarouselPic/>
                <WhiteSpace size="xl"/>

    
                <Card>
                    <Card.Header
                        title="本周"
                        style={{
                                backgroundColor: "#d81e06",
                                fontWeight:"800",
                                borderTopLeftRadius:'10px',
                                borderTopRightRadius:'10px'
                        }}
                        extra={<span onClick={()=>{changeButtonValue(1)}}>{buttonValue1}</span>}
                    />
                    <Card.Body>
                        <ul style={{padding:0}}>
                            
                            {
                                limitNumber1>1?    oneWeek.map((item,index) => {
                                                            return (
                                                                <li key={item+index} style={{height:'90px',borderBottom:'1px solid #dee1e6'}}>
                                                                    <span style={{float:"left",width:'90px',color:"#d81e06",paddingRight:10,marginRight:10,borderRight:'1px solid #ffe6e6'}}>
                                                                        <h4>{item.date}</h4>
                                                                        <p>{item.time}</p>
                                                                    </span>
                                                                    <span style={{float:'left'}} >
                                                                        <h3 style={{width:'180px'}}>{item.task}</h3>
                                                                        
                                                                    </span>
                                                                    <IconFont 
                                                                        type='icon-shanchu1'
                                                                        style={{
                                                                            marginTop:25,
                                                                            fontSize:'20px',
                                                                            color:'#ff0000'
                                                                        }}
                                                            
                                                                        onClick={() => {deleteplan(item.date,item.time,item.task)}}
                                                                    >
                                                                                
                                                                    </IconFont>
                                                                </li>
                                                                
                                                                
                                                            )
                                                        }) 
                                                    :
                                                    <li onClick={()=>{changeButtonValue(1)}}>
                                                        <IconFont type="icon-yeshengdongwubaohu" style = {{fontSize:'30px'}}/>&nbsp;
                                                       
                                                    </li>
         
                            }
                            
                                              
                        </ul>
                    </Card.Body>  
                </Card>

                <WhiteSpace size="xl"/>

                <Card>
                    <Card.Header
                        title="下周"
                        style={{
                            backgroundColor: "#108ee9",
                            fontWeight:"800",
                            borderTopLeftRadius:'10px',
                            borderTopRightRadius:'10px'
                        }}
                        extra={<span onClick={()=>{changeButtonValue(2)}}>{buttonValue2}</span>}
                    />
                    <Card.Body>
                        <ul style={{padding:0}}>
                            {
                                limitNumber2>1?    twoWeek.map((item,index) => {
                                                            return (
                                                                <li key={item+index} style={{height:'90px',borderBottom:'1px solid #dee1e6'}}>
                                                                    <span style={{float:"left",width:'90px',color:"#108ee9",paddingRight:10,marginRight:10,borderRight:'1px solid #ffe6e6'}}>
                                                                        <h4>{item.date}</h4>
                                                                        <p>{item.time}</p>
                                                                    </span>
                                                                    <span style={{float:'left'}}>
                                                                        <h3 style={{width:'180px'}}>{item.task}</h3>
                                                                    </span>
                                                                    <IconFont 
                                                                        type='icon-shanchu4'
                                                                        style={{
                                                                            marginTop:25,
                                                                            fontSize:'22px',
                                                                        }}
                                                            
                                                                        onClick={() => deleteplan(item.date,item.time,item.task)}
                                                                    >
                                                                                
                                                                    </IconFont>
                                                                </li>
                                                                
                                                                
                                                            )
                                                        }) 
                                                    :
                                                    <li onClick={()=>{changeButtonValue(3)}}>
                                                        <IconFont type="icon-yeshengdongwubaohu" style = {{fontSize:'30px'}}/>&nbsp;
                                                    </li>
         
                            }
                        
                        </ul>
                    </Card.Body>  
                </Card>

                <WhiteSpace size="xl"/>

                <Card style={{ marginBottom: 50}}>
                    <Card.Header
                        title="2周以后"
                        style={{
                            backgroundColor: "#29cb8c",
                            fontWeight:"800",
                            borderTopLeftRadius:'10px',
                            borderTopRightRadius:'10px'
                        }}
                        extra={<span onClick={()=>{changeButtonValue(3)}}>{buttonValue3}</span>}
                    />
                    <Card.Body>
                        <ul style={{padding:0}}>
                            {
                                limitNumber3>1?    moreWeek.map((item,index) => {
                                                            return (
                                                                <li key={item+index} style={{height:'90px',borderBottom:'1px solid #dee1e6'}}>
                                                                    <span style={{float:"left",width:'90px',color:"#29cb8c",paddingRight:10,marginRight:10,borderRight:'1px solid #ffe6e6'}}>
                                                                        <h4>{item.date}</h4>
                                                                        <p>{item.time}</p>
                                                                    </span>
                                                                    <span style={{float:'left'}} >
                                                                        <h3 style={{width:'180px'}}>{item.task}</h3>
                                                                    </span>
                                                                    <IconFont 
                                                                        type='icon-shanchux'
                                                                        style={{
                                                                            marginTop:25,
                                                                            fontSize:'22px',
                                                                        }}
                                                            
                                                                        onClick={() => deleteplan(item.date,item.time,item.task)}
                                                                    >
                                                                                
                                                                    </IconFont>
                                                                </li>
                                                                
                                                                
                                                            )
                                                        }) 
                                                    :
                                                    <li onClick={()=>{changeButtonValue(3)}}>
                                                        <IconFont type="icon-yeshengdongwubaohu" style = {{fontSize:'30px'}}/>&nbsp;
                                                    </li>
                            }
                        </ul>
                    </Card.Body>  
                </Card>
            </WingBlank>
        </>
    )
}

export default HomeUI






