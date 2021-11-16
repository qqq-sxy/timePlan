//防抖函数
export default function Debounce(func, wait) {
    let timeout; // 创建一个标记用来存放定时器的返回值
    return function () {
        timeout && clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉
        // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 func 函数
        timeout = setTimeout(() => { 
            func.apply(this, arguments)
        }, wait)
    }
}