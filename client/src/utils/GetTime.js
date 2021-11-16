//获取当前日期
export function GetTime() {
    let time = new Date()
    //年份
    let year = time.getFullYear()
    //月份
    let month = time.getMonth() +1
    //日份
    let day = time.getDate()
    //星期
    let week1 = time.getDay()

    let week = ''
    if(week1 === 1) {week = '一'}
    else if(week1 === 2) {week = '二'}
    else if(week1 === 3) {week = '三'}
    else if(week1 === 4) {week = '四'}
    else if(week1 === 5) {week = '五'}
    else if(week1 === 6) {week = '六'}
    else  {week = '天'}

    
    // return year +  '年' + month + '月' + day + '日' +' ' + '周' + week
    return (`${year}年${month}月${day}日 周${week} `)
}


//得出当前时间 一周  两周以及之后更长时间的范围
export function TimeClassification(datetimetask) {
    let pastWeek = []
    let oneWeek = []
    let twoWeek = []
    let moreWeek = []
    //分离后台传过来的时间
    let len = datetimetask.length
    for(let i =0 ; i<len;i++) {
        //数据库传来的时间
        let datetime = datetimetask[i].date.replace(/-/g,"/") + ' ' + datetimetask[i].time
        let date = new Date(datetime)
        //当前的时间
        let now = new Date()
        //计算时间差
        let dateDiff = date.getTime() - now.getTime() //时间差的毫秒数
        
        if(dateDiff < 0) pastWeek.push(datetimetask[i]) //时间已经过去
        else if(0 < dateDiff  && dateDiff < 604800000) {//在一周内
            oneWeek.push(datetimetask[i])
        }
        else if(dateDiff >= 604800000 && dateDiff <= 1209600000){//在两周内
            twoWeek.push(datetimetask[i])
        }
        else{
            moreWeek.push(datetimetask[i])
        }

    }

    TimeSort(pastWeek)
    TimeSort(oneWeek)
    TimeSort(twoWeek)
    TimeSort(moreWeek)

    return {pastWeek,oneWeek,twoWeek,moreWeek}
}



//将数组按照时间排序
function TimeSort(list) {
    list.sort(function(a,b) {
        return (new Date(a.date.replace(/-/g,"/") + ' ' + a.time) - new Date(b.date.replace(/-/g,"/") + ' ' + b.time))
    })
}