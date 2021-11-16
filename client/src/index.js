import React from 'react'
import ReactDOM from 'react-dom'

import {HashRouter,Switch,Route} from 'react-router-dom'
// import {Provider} from 'react-redux'
import {StoreContext} from 'redux-react-hook'

import './assets/CSS/index.css'

import store from './redux/store'


//引入自定义的组件
import Main from './containers/main/Main'
import Register from './containers/register/Register'
import Login from './containers/login/Login'

// import TimedOut from './containers/timedOut/TimedOut'


// import PullDownToRefresh from './containers/pulldowntorefresh/PullDownToRefresh'



ReactDOM.render(

        <StoreContext.Provider value={store}>
            <HashRouter>
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    {/* 必须放在最后面，否则在它之后的路由会不起作用 */}
                    <Route component={Main}/>
                </Switch>
            </HashRouter>
        </StoreContext.Provider>

    //  <PullDownToRefresh/>
    ,document.getElementById('root')
)