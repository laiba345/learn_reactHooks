import React, { memo, useState, useCallback, useRef } from 'react'

// useCallback性能优化的点:
// 1.当需要将一个函数传递给子组件时, 最好使用useCallback进行优化, 将优化之后的函数, 传递给子组件

// props中的属性发生改变时, 组件本身就会被重新渲染
const HYHome = memo(function(props) {
  // 子组件可以通过解构赋值的写法来取到increment，
  const { increment } = props
  console.log("HYHome被渲染")
  return (
    <div>
      <button onClick={increment}>increment+1</button>

      {/* 100个子组件 */}
    </div>
  )
})

const App = memo(function() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("hello")

  // 闭包陷阱: useCallback
  // 根据count的值不同来进行更新，如果count值变换了就进行更新操作
  const increment = useCallback(function foo() {
    console.log("increment")
    setCount(count+1)
  }, [count]) 

  // 进一步的优化: 当count发生改变时, 也使用同一个函数(了解)
  // 做法一: 将count依赖移除掉, 缺点: 闭包陷阱
  // 做法二: useRef, 在组件多次渲染时, 返回的是同一个值
  // const countRef = useRef()
  // countRef.current = count
  // const increment = useCallback(function foo() {
  //   console.log("increment")
  //   setCount(countRef.current + 1)
  // }, [])

  // 普通的函数
  // const increment = () => {
  //   setCount(count+1)
  // }

  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={increment}>+1</button>

      <HYHome increment={increment}/>

      <h2>message:{message}</h2>
      <button onClick={e => setMessage(Math.random())}>修改message</button>
    </div>
  )
})


// function foo(name) {
//   function bar() {
//     console.log(name)
//   }
//   return bar
// }

// const bar1 = foo("why")
// bar1() // why
// bar1() // why

// 会创建一个新的函数
// const bar2 = foo("kobe")
// bar2() // kobe

// bar1() // why

export default App