import { useState,useEffect} from 'react'
import {TabBar} from 'antd-mobile'
import { createFromIconfontCN } from '@ant-design/icons'
import { useHistory } from "react-router-dom"

const IconFont = createFromIconfontCN({scriptUrl: 'http://at.alicdn.com/t/font_2682321_vwcwt9ycw1i.js'})

function Buttom() {

    const [color1,setColor1] = useState('')
    const [color2,setColor2] = useState('')
    const [color3,setColor3] = useState('')
    const [color4,setColor4] = useState('')

    let history = useHistory()

    useEffect(() => {aa()},[])
    const aa = () => {
        let path = history.location.pathname
        if(path === '/home'){
            setColor1('#108ee9')
            setColor2('#888888')
            setColor3('#888888')
            setColor4('#888888')

        }
        else if(path === '/checklist'){
            setColor1('#888888')
            setColor2('#108ee9')
            setColor3('#888888')
            setColor4('#888888')
        }
        else if(path === '/timedOut'){
            setColor1('#888888')
            setColor3('#108ee9')
            setColor2('#888888')
            setColor4('#888888')
        }
        else {
            setColor1('#888888')
            setColor4('#108ee9')
            setColor2('#888888')
            setColor3('#888888')
        }
    }

    const changeColor1 = () => {
        history.push('/home')
        aa()
    }
    const changeColor2 = () => {
        history.push('/checklist')
        aa()
    }
    const changeColor3 = () => {
        history.push('/timedOut')
        aa()
    }
    const changeColor4 = () => {
        history.push('/center')
        aa()
    }
    
    return (
        <div style={{position: 'fixed' ,width:'100%', bottom: -3 } }>      
            <TabBar>
                <TabBar.Item
                    title="Home"
                    key="home"
                    icon={<div style={{
                            width: '22px',
                            height: '22px',
                             }}>
                                <IconFont type='icon-home' style={{
                                    fontSize:'20px', color:color1
                                    }}
                                    onClick={changeColor1}
                                />
                          </div>
                        }
                />
                <TabBar.Item
                    title="List"
                    key="List"
                    icon={<div style={{
                            width: '22px',
                            height: '22px',
                            }}>
                               <IconFont type='icon-edit' style={{
                                    fontSize:'20px', color:color2
                                }}
                                onClick={changeColor2}
                                /> 
                            </div>
                        }
                />
                <TabBar.Item
                    title="timedout"
                    key="timedout"
                    icon={<div style={{
                            width: '22px',
                            height: '22px',
                            }}>
                                <IconFont type='icon-history' style={{
                                    fontSize:'20px', color:color3
                                }}
                                onClick={changeColor3}
                                />
                            </div>
                        }
                />
                <TabBar.Item
                    title="user"
                    key="user"
                    icon={<div style={{
                            width: '22px',
                            height: '22px',
                            }}>
                                <IconFont type='icon-user' style={{
                                    fontSize:'20px', color:color4
                                }}
                                onClick={changeColor4}
                                />
                            </div>
                        }
                />

            </TabBar>
        </div>
    )
}

export default Buttom
