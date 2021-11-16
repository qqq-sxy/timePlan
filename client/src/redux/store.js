//applyMiddleware  是redux的原生方法，作用是将所有的中间件组成一个数组，依次执行
import {createStore,applyMiddleware} from 'redux'

//thunk是一个中间件,因为redux store仅支持同步数据流,使用thunk中间件可以请求异步数据流
import thunk from 'redux-thunk'
//这个与谷歌浏览器上的第三方组件redux来进行配合的
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from './reducers'


//向外暴露store对象
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
