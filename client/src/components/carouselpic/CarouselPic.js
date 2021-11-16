import { Carousel, WingBlank } from 'antd-mobile'

import img1 from '../../assets/pictures/1.jpg'
import img2 from '../../assets/pictures/2.jpg'
import img3 from '../../assets/pictures/3.jpg'

import '../../assets/CSS/carouse.css'

function CarouselPic() {

    const state = {
      data:[img1,img2,img3],
      imgHeight: 167
    }

    return (
        <WingBlank>
          <Carousel className="space-carousel"
            // frameOverflow="visible" //设置 slider frame 的 overflow 样式
            cellSpacing={10} //项目之间的间距，以px为单位
            slideWidth={0.8} //手动设置项目宽度. 可以是slideWidth="20px"，也可以是相对容器的百分比slideWidth={0.8}
            autoplay //是否自动切换
            infinite  //是否循环播放
            style={{
              padding: '16px',
              background: '#fff',
              overflow: 'hidden',
              
            }}
          >
            {
              state.data.map((item,index) => {
                return (
                  <span
                    key={item+index}
                    style={{
                      display: 'block',
                      position: 'relative',
                      top: state.slideIndex === index ? -10 : 0,
                      height: state.imgHeight,
                      boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <img
                      src={`${item}`}
                      alt=""
                     
                      style={{ width: '100%', height :'110%' ,verticalAlign: 'top',  touchAction:'none'}}
                    />
                  </span>
                )
              })
            }

          </Carousel>
        </WingBlank>
    )
}


export default CarouselPic







// import {WingBlank,Carousel} from 'antd-mobile'
// import {useState,useEffect} from 'react'

// import img1 from '../../assets/pictures/1.jpg'
// import img2 from '../../assets/pictures/2.jpg'
// import img3 from '../../assets/pictures/3.jpg'
// import '../../assets/CSS/carouselPic.css'


// function CarouselPic() {
//     const [images,setImages] = useState([img1, img2, img3])
//     const [imageIndex,setImageIndex] = useState(0)
//     const [timer,setTimer] = useState(null)


//     useEffect(() => start(),[])


//     useEffect(() => {
//         return () => {
//           stop()
//         }
//       }, []);


//     // const pre = () => {
//     //     if(imageIndex <= 0 ) {
//     //         setImageIndex(images.length - 1)
//     //     }else {
//     //         setImageIndex(imageIndex - 1)
//     //     }
//     //     setImageIndex(imageIndex)
//     // }

//     const next = () => {
//         if(imageIndex >= images.length -1 ){
//             setImageIndex(0)
//         }else {
//             setImageIndex(imageIndex+1)
//         }

//     }

//     const start = () => {
//         setTimer(setInterval(() => {
//             next()
//         },1000))
//         // console.log(timer);
//     }

//     const stop = () => {
//         clearInterval(timer)
//     }

//     const changeIndex = (e) => {
//         console.log('hhh');
//         setImageIndex(e)
//     }

//     return (
//         <>
//             <ul className='ul'>
//                         {
//                                 images.map((item,index) => {
//                                 //要有return这个返回值
//                                 return(
//                                     //用于显示当前imageIndex规定的图片，将其它的图片都隐藏掉
//                                     <li key={item+index} className={index === imageIndex? 'show' : 'hidden'}>
//                                         <img src={item} alt='轮播图'/>
//                                     </li>
//                                 )
//                             })
//                         }
//             </ul>

//             <ul className='spot' style={{width:images.length *20 + 'px'}}>
//                         {
//                             images.map((item,index) => {
//                                 return (
//                                     <li key={item+index}
//                                         className={index === imageIndex? 'black' : 'white'}
//                                         // onClick = {this.changeIndex(index)} 要用箭头函数，不然函数会一直自动执行
//                                         onClick = {()=> {changeIndex(index)}}

//                                     >

//                                     </li>
//                                 )
//                             })
//                         }
//             </ul>
//         </>
//     )
// }

// export default CarouselPic