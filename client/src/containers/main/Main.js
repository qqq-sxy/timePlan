import { Route,Switch} from 'react-router-dom'

import Home from '../home/Home'
import Buttom from '../../components/bottom/Bottom'
import Checklist from '../checklist/Checklist'
import TimedOut from '../timedOut/TimedOut'
import Center from '../center/Center'
import ChangePassword from '../changepassword/ChangePassword'


function Main() {
    return (
        <>      
                <Switch>
                    <Route exact path="/"   component={Home}/>
                    <Route path="/home"  component={Home}/>
                    <Route path="/checklist" component={Checklist}/>
                    <Route path="/timedout" component={TimedOut}/>
                    <Route path="/center" component={Center}/>
                    <Route path="/changepassword" component={ChangePassword}/>
                </Switch>
                
                <Buttom/>
            
        </>
    )
}
export default Main