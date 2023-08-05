import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./06_useReducer的使用/App"
import { UserContext, ThemeContext } from "./03-useContext的使用/context"

// 基础的渲染流程不能忘记
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // 使用Context最外面需要包裹
  <UserContext.Provider value={{ name:'hk', level:99 }}>
    <ThemeContext.Provider value={{ color:'yellow', size:30 }}>
      <App />
    </ThemeContext.Provider>
  </UserContext.Provider>
)