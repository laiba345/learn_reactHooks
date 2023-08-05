# learn_reactHooks
## 学习了Hooks之前的redux其实就是一个弟弟

## 认识和体验Hooks
1. Hook 是 React 16.8 的新增特性，它可以让我们在不编写class的情况下使用state以及其他的React特性（比如生命周期）
2. 了解函数式组件的缺陷

3. class组件相对于函数式组件的优势？
- class组件可以定义自己的**state**，用来保存组件自己内部的状态；
    - 函数式组件不可以，因为函数每次调用都会产生新的临时变量；
- class组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑；
    - 比如在componentDidMount中发送网络请求，并且该生命周期函数只会执行一次；
    - 函数式组件在学习hooks之前，如果在函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求；
- class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate等；
    -函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以只让它们调用一次；

4. class组件的问题
- 复杂
    - 比如componentDidMount中，可能就会包含大量的逻辑代码：包括网络请求、一些事件的监听（还需要在
componentWillUnmount中移除）；
    - 而对于这样的class实际上非常难以拆分：因为它们的逻辑往往混在一起，强行拆分反而会造成过度设计，增加代码的复杂度；

- 难以理解的class
- 组件复用状态很难
    - 状态的复用需要通过高阶组件
    - 像我们之前学习的redux中connect或者react-router中的withRouter，这些高阶组件设计的目的就是为了状态的复用；
    - 或者类似于Provider、Consumer来共享一些状态，但是多次使用Consumer时，我们的代码就会存在很多嵌套；

5. Hooks出现
- 它可以让我们在**不编写class的情况下使用state以及其他的React特性**；
- 但是我们可以由此延伸出非常多的用法，来让我们前面所提到的问题得到解决；

6. Hook的使用场景：
- Hook的出现基本可以代替我们之前所有使用class组件的地方；
- 但是如果是一个旧的项目，你并不需要直接将所有的代码重构为Hooks，因为它完全向下兼容，你可以渐进式的来使用它；
- Hook只能在函数组件中使用，不能在类组件，或者函数组件之外的地方使用；

7. 为什么使用hooks？ - 将上面简单讲一下

## 案例：计数器案例
1. 创建组件的快捷方式 
- rfce 函数式组件
- 包裹memo rmc
    - react中的memo； 在 React 项目中，memo 是一种优化技术，用于减少组件的重新渲染，从而提高应用程序的性能。memo 是一个高阶组件（Higher-Order Component），它与 React 的函数组件一起使用。
2. 进行页面显示的时候，我们经常把页面呈现在APP组件当中，index.js只是作为一个总体渲染的一个出口
3. 书写完相应的组件需要将内容完全暴露出去

4. 练习； hooks组件，amazing
```
import { memo, useState } from "react";

function CounterHooks(props) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h2>当前计数：{counter}</h2>
      <button onClick={(e) => setCounter(counter+1)}>+1</button>
      <button onClick={(e) => setCounter(counter-1)}>-1</button>
    </div>
  );
}

export default memo(CounterHooks);
```

## useState（钩入状态）
1. useState解析
- useState来自react，需要从react中导入，它是一个hook；
    ✓ 参数：初始化值，如果不设置为undefined；
    ✓ 返回值：数组，包含两个元素；
        ➢ 元素一：当前状态的值（第一调用为初始化值）；
        ➢ 元素二：设置状态值的函数；
- 点击button按钮后，会完成两件事情：
    ✓ 调用setCount，设置一个新的值；
    ✓ 组件重新渲染，并且根据新的值返回DOM结构；
- Hooks是一个个函数；
- **使用原则**； 只能在顶层使用
    - 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用
    - 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。
