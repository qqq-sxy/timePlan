var express = require('express');
var router = express.Router();


const jwt = require('jsonwebtoken')
const md5 = require('blueimp-md5') //用于加密密码
//引入发送邮件
const nodemail = require('../sendmail')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;









const {connection} = require('../Mysql')

//连接数据库
connection.connect((err) => {
  if(err) {
      console.log("数据库连接失败");
  }
  console.log("数据库连接成功");
})

//注册接口
router.post('/register',function(req,res) {
  const {username,password,email} = req.body
  const password1 = md5(password)
  //用JWT将用户信息加密
  //jwt.sign(要加密的数据，秘钥)
  const user_id = jwt.sign({username},'logindatatoken')
  
  //查询语句
  let find1 = "SELECT * FROM user WHERE username = '"+username+"'";
  let find2 = "SELECT * FROM user WHERE email = '"+email+"'";
  //插入语句
  let insert = 'INSERT INTO user (id,username,password,email,user_id) VALUES (0,?,?,?,?)';
  //执行sql语句
  connection.query(find1,function(err,result) {
    if(err) {
      console.log('[错误]' + err);
      return;
    }
    if(result.length) {
      console.log('账号已存在');
      res.send({code :1, msg :'用户名已存在!'})
      return;
    
    }

    else {
      connection.query(find2,function(err,result) {
        if(err) {
          console.log('[错误]' + err);
          return;
        }

        if(result.length) {
          console.log('邮箱已存在');
          res.send({code :1, msg :'邮箱已存在!'})
          return;
        }
        else {
          let inserInfo = [username,password1,email,user_id];
          connection.query(insert,inserInfo,function(err,result) {
            if(err) {
              console.log('[错误]' + err);
              return;
            }
            const data = {username}
            res.send({code : 0 , data})
          })
        }
          
      })
    }
  })
})


//登录接口
router.post('/login',function(req,res) {
  const {username,password} = req.body
  const password1 = md5(password)
  
  //查询语句
  let find1 = "SELECT * FROM user WHERE username = '"+username+"'";
  let find2 = "SELECT * FROM user WHERE password = '"+password1+"'";
  //执行sql语句
  connection.query(find1,function(err,result) {
    if(err) {
      console.log('[错误]' + err);
      return;
    }
    if(result.length) {
      connection.query(find2,function(err,result){
        if(err) {
          console.log('[错误]' + err);
          return;
        }
        if(result.length) {
          res.send({code:0,token:result[0].user_id})
        }
        else {
          res.send({code:1,msg:'密码错误!'})
        }
      }) 
    
    }
    else {
      res.send({code:1,msg:'该账号未注册!'})
    }
       
      })
  
})

//计划入表
router.post('/home/addplan',function(req,res) {
  const {date,time,task,user_id} = req.body

  let find =  "SELECT * FROM user WHERE user_id = '"+user_id+"'";
  let insert = 'INSERT INTO datetimetask (id,date,time,task,user_id) VALUES (0,?,?,?,?)'
  connection.query(find,function(err,result) {
    if(err) {
      console.log('[错误]' + err);
    }
    if(result.length) {
      console.log(result);
      let inserInfo = [date,time,task,user_id];
      connection.query(insert,inserInfo,function(err,result) {
        if(err) {
          console.log('[错误]' + err);
          return;
        }
        res.send({code : 0,msg: '添加成功'})
      })
    }
    else {
      res.send({code : 1,msg : '添加失败'})
    }
  })

})


//将计划渲染出来都
router.post('/home',function(req,res) {
  const {user_id} = req.body

  let find1 =  "SELECT * FROM user WHERE user_id = '"+user_id+"'"
  let find2 =  "SELECT * FROM datetimetask WHERE user_id = '"+user_id+"'"
  
  connection.query(find1,function(err,result) {
    if(err) {
      console.log('[错误]' + err);
    }
    if(result.length){
      connection.query(find2,function(err,result) {
        if(err) {
          console.log('[错误]' + err);
          return
        }
        if(result.length) {
          let len = result.length
          let data = []
          for(let i = 0 ; i<len ;i++){
            data.push(result[i])
          }
          // console.log(data);
          res.send({code : 0,data})
          // console.log('jj');
        }
        else {
          res.send({code : 1, msg : '还未写入计划'})
        }
      })
    }
    else {
      res.send({code:1,msg:'该账号已丢失，请重新注册!'})
    }
  })
})


//删除计划
router.post('/deleteplan',function(req,res) {
  const {date,time,task,user_id} = req.body
  //要加别名 p 否则会报语法错误 
  let delete1 = "DELETE p FROM datetimetask p WHERE  p.user_id = '"+user_id+"' and p.date = '"+date+"'  and  p.time = '"+time+"' and    p.task = '"+task+"' " 
  connection.query(delete1,function(err,result) {
    if(err) {
      console.log('[错误]'+ err);
    }
    res.send({code:0,msg:'删除成功'})
  })
})



//请求信息
router.post('/center',function(req,res) {
  const {user_id} = req.body
  let find = "SELECT * FROM user WHERE user_id = '"+user_id+"'"
  connection.query(find,function(err,result) {
    if(err) {
      console.log('[错误]'+err)
    }
    if(result.length){
      let username = result[0].username
      let email = result[0].email
      
      res.send({code:0,info:{username,email}})
    }
    else {
      res.send({code:1,msg:'查找不到用户'})
    }
  })
})



//添加清单计划
router.post('/checklist',function(req,res) {
  const {user_id,plan} = req.body
  let insert = 'INSERT INTO listplan (id,plan,user_id) VALUES (0,?,?)'
  let inserInfo = [plan,user_id];
  connection.query(insert,inserInfo,function(err,result) {
    if(err) {
      console.log('[错误]'+err);
    }
    res.send({code:0,msg:'添加成功'})
  })
})

//查询清单计划
router.post('/showchecklist',function(req,res) {
  const {user_id} = req.body
  let find =  "SELECT * FROM listplan WHERE user_id = '"+user_id+"'"
  connection.query(find,function(err,result) {
    if(err) {
      console.log('[错误]'+err);
    }
    if(result.length){
      let len = result.length
      let data = []
      for(let i = 0 ; i<len ;i++){
        data.push(result[i])
      }
      console.log(data);
      res.send({code : 0,data})
      // console.log('jj');
    }
    else {
      res.send({code : 1, msg : '还未写入清单计划'})
    }
    
  })
})

//删除清单计划
router.post('/delchecklist',function(req,res) {
  const {user_id,plan} = req.body
  let delete1 = "DELETE p FROM listplan p WHERE  p.user_id = '"+user_id+"' and p.plan = '"+plan+"' " 
  connection.query(delete1,function(err,result) {
    if(err) {
      console.log('[错误]'+err);
    }
    res.send({code:0,msg:'删除成功'})
  })

})

var Initcode = 0

//获取验证码
router.post('/center/changepassword',function(req,res) {

  const {user_id} = req.body
  let find = "SELECT * FROM user WHERE user_id = '"+user_id+"'" ;

  //生成6位随机数
  const createSixNum = () => {
    var Num = "";
    for(var i = 0; i<6;i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

  
  var code =  createSixNum();//这是用来生成随机六位数的
  Initcode = code//将验证码保存到全局，用于修改密码时与输入的验证码进行比对


  connection.query(find,(err,result) => {//find4  是一个用于在数据库中查找是否存在该邮箱的SQL语句
    if(err) {
      console.log('[错误]' + err);
    }
    if(result.length) {
        let email = result[0].email
        var mail = {
                    //发件人
                    from:'3469998737@qq.com',
                    //主题
                    subject:'修改密码',
                    //收件人
                    to:email,
                    //邮件内容，HTML 格式
                    text:'你的验证码为'+code+',有效期为五分钟!'
                };
                nodemail(mail)
            res.send({code:0,msg:'验证码发送成功'})
    }
    else {
        res.send({code:1,msg:'验证码发送失败'})
    }
  })
})


//修改密码
router.post('/changepassword',function(req,res) {
  const {user_id,password,code} = req.body
  let find = "SELECT * FROM user WHERE user_id = '"+user_id+"'" 
  let change1 = "UPDATE user set password = '"+password+"' WHERE user_id =  '"+user_id+"'"
  connection.query(find,function(err,result) {
    if(err) {
      console.log('[错误]'+err)
    }
    if(result.length) {
      console.log(Initcode);
      if(code !== Initcode) {
        res.send({code:1,msg:'验证码错误'})
      }
      else {
        connection.query(change1,function(err,result) {
          if(err){
            console.log('[错误]'+err)
          }
          res.send({code:0,msg:'修改成功'})
        })
      }
    }
  })
})
