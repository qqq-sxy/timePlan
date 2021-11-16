import ajax from './ajax'

//注册
export const reqRegister = (user) => ajax('/register',user,'POST')
//登录
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST')
//计划入表
export const reqDateTimeTask = ({date,time,task,user_id}) => ajax('/home/addplan',{date,time,task,user_id},'POST')
//将存入的计划给渲染到页面上来
export const reqShowPlan = ({user_id}) => ajax('/home',{user_id},'POST')
//删除计划
export const reqDelete = ({date,time,task,user_id}) => ajax('/deleteplan',{date,time,task,user_id},'POST')
//请求用户信息
export const reqUserInfo = ({user_id}) => ajax('/center',{user_id},'POST')
//上传清单计划
export const reqList = ({user_id,plan}) => ajax('/checklist',{user_id,plan},'POST')
//删除清单计划
export const reqDelList = ({user_id,plan}) => ajax('/delchecklist',{user_id,plan},'POST')
//显示清单计划
export const reqShowList = ({user_id}) => ajax('/showchecklist',{user_id},'POST')
//获取验证码
export const reqGetCode = ({user_id}) => ajax('/center/changepassword',{user_id},'POST')
//修改密码
export const reqChangePassword = ({user_id,password,code}) => ajax('/changepassword',{user_id,password,code},'POST')