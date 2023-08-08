import React, { memo, useCallback } from 'react'
import { useMemo, useState } from 'react'


const HelloWorld = memo(function(props) {
  console.log("HelloWorld被渲染~")
  return <h2>Hello World</h2>
})

// 计算函数本身，可以将这些内容放到外面(公用的)
function calcNumTotal(num) {
  // console.log("calcNumTotal的计算过程被调用~")
  let total = 0
  for (let i = 1; i <= num; i++) {
    total += i
  }
  return total
}

const App = memo(() => {
  const [count, setCount] = useState(0)

  // const result = calcNumTotal(50)

  // 1.不依赖任何的值, 进行计算；优化的其实是返回值，并不是那个函数
  const result = useMemo(() => {
    return calcNumTotal(50)
  }, []) // 空数组表示没有依赖任何值，对返回结果作一个依赖

  // 2.依赖count
  // const result = useMemo(() => {
  //   return calcNumTotal(count*2)
  // }, [count])

  // 3.useMemo和useCallback的对比
  function fn() {}
  // const increment = useCallback(fn, [])
  // const increment2 = useMemo(() => fn, [])

  // 4.使用useMemo对子组件渲染进行优化
  // const info = { name: "why", age: 18 }
  const info = useMemo(() => ({name: "why", age: 18}), [])

  return (
    <div>
      <h2>计算结果: {result}</h2>
      <h2>计数器: {count}</h2>
      <button onClick={e => setCount(count+1)}>+1</button>

      {/* 传入的info没有改变的时候 */}
      <HelloWorld result={result} info={info} />
    </div>
  )
})

export default App