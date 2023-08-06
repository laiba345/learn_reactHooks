import React, { memo, useReducer } from 'react'
// import { useState } from 'react'

function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 }
    case "decrement":
      return { ...state, counter: state.counter - 1 }
    case "add_number":
      return { ...state, counter: state.counter + action.num }
    case "sub_number":
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}

// useReducer+Context => redux

const useMyReducer = memo(() => {
  // const [count, setCount] = useState(0)
  // 可以从useReducer中解构出很多的内容;
  /* 
    1、所有state
    2、dispatch函数
    用于处理非常复杂的数据，用处很少，如果很复杂的话，还是用redux的普通用法
  */
  const [state, dispatch] = useReducer(reducer, { counter: 0, friends: [], user: {} })

  // const [counter, setCounter] = useState()
  // const [friends, setFriends] = useState()
  // const [user, setUser] = useState()

  // 结构都是写在return() 当中
  return (
    <div>
      {/* <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count+1)}>+1</button>
      <button onClick={e => setCount(count-1)}>-1</button>
      <button onClick={e => setCount(count+5)}>+5</button>
      <button onClick={e => setCount(count-5)}>-5</button>
      <button onClick={e => setCount(count+100)}>+100</button> */}

      <h2>当前计数: {state.counter}</h2>
      {/* dispatch进行派发action */}
      <button onClick={e => dispatch({type: "increment"})}>+1</button>
      <button onClick={e => dispatch({type: "decrement"})}>-1</button>
      <button onClick={e => dispatch({type: "add_number", num: 5})}>+5</button>
      <button onClick={e => dispatch({type: "sub_number", num: 5})}>-5</button>
      <button onClick={e => dispatch({type: "add_number", num: 100})}>+100</button>
    </div>
  )
})

export default useMyReducer