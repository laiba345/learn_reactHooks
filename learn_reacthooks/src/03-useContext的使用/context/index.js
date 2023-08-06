import { createContext } from "react";

// context都是自定义出来的，传入数据都是在最外侧的index.js中执行的;
const UserContext = createContext()
const ThemeContext = createContext()

export {
    UserContext,
    ThemeContext
}