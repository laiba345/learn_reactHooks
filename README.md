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


2. 认识useState
- 如果函数的逻辑过于复杂，可以在函数外部定义一个新的函数，在点击事件当中进行调用
- useState会帮助我们定义一个 state变量，useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。
    - ✓ 一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。
- useState接受唯一一个参数，在第一次组件被调用时使用来作为初始化值。（如果没有传递参数，那么初始化值为undefined）。
- useState的返回值是一个数组，我们可以通过数组的解构，来完成赋值会非常方便

3. 为什么叫 useState 而不叫 createState?
- “create” 可能不是很准确，因为 state 只在组件首次渲染的时候被创建。
- 在下一次重新渲染时，useState 返回给我们当前的 state。
- 如果每次都创建新的变量，它就不是 “state”了。
- 这也是 Hook 的名字总是以 use 开头的一个原因。

## useEffect
1.  目前我们已经通过hook在函数式组件中定义state，那么类似于生命周期这些呢？
- Effect Hook 可以让你来完成一些类似于class中生命周期的功能；
- 事实上，类似于网络请求、手动更新DOM、一些事件的监听，都是React更新DOM的一些副作用（Side Effects）；
- 所以对于完成这些功能的Hook被称之为 Effect Hook；

2. 案例假如我们现在有一个需求：页面的title总是显示counter的数字

3. useEffect的解析
- 通过useEffect的Hook，可以告诉React需要在渲染后执行某些操作；
- useEffect要求我们传入一个回调函数，在React执行完更新DOM操作之后，就会回调这个函数；
- 默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个回调函数；

4. 需要清除Effect（清除机制）
- 比如我们之前的事件总线或Redux中手动调用subscribe；
- 都需要在componentWillUnmount有对应的取消订阅；
- Effect Hook通过什么方式来模拟componentWillUnmount呢？
- useEffect一直可以进行渲染，一旦更新就能进行渲染

5. useEffect传入的回调函数A本身可以有一个返回值，这个返回值是另外一个回调函数B：
- type EffectCallback = () => (void | (() => void | undefined));

6. 为什么要在effect中返回一个函数？
- 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数；
- 如此可以将添加和移除订阅的逻辑放在一起；
- 它们都属于 effect 的一部分；

7. React何时清除effect？
- React 会在组件更新和卸载的时候执行清除操作；
- 正如之前学到的，effect 在每次渲染的时候都会执行；

8. 使用多个Effect（可以使用多个useEffect）可以定义多个；
- 使用Hook的其中一个目的就是解决class中生命周期经常将很多的逻辑放在一起的问题：
    - 比如网络请求、事件监听、手动修改DOM，这些往往都会放在componentDidMount中；
- 使用Effect Hook，我们可以将它们分离到不同的useEffect当中
    - 见demo
- Hook 允许我们按照代码的用途分离它们， 而不是像生命周期函数那样：
    -  React 将按照 effect 声明的顺序依次调用组件中的每一个 effect；
- !!! 书写多个自己抽取到自定义hook当中，当别的地方想要使用的时候，可以直接进行调用

9. Effect性能优化
- 默认情况下，useEffect的回调函数会在每次渲染时都重新执行，但是这会导致两个问题：
    - **某些代码我们只是希望执行一次即可**，类似于componentDidMount和componentWillUnmount中完成的事情；（比如网
络请求、订阅和取消订阅）；
    - 另外，多次执行也会导致一定的性能问题；

- 我们如何决定useEffect在什么时候应该执行和什么时候不应该执行呢？
    - useEffect实际上有两个参数：
        - 参数一：执行的回调函数；
        - 参数二：该useEffect在哪些state发生变化时，才重新执行；（受谁的影响）
            - 传入一个空数组;
    - 即：useEffect(回调函数, [])
          - useEffect(() => {}, [count]) 只是收到count的影响;
          - 写了空数组，写在那些操作也只会执行一次
    - useEffect可以模拟之前class组件的生命周期

10. 案例练习； 受count影响的Effect

11. 但是，如果一个函数我们不希望依赖任何的内容时，也可以传入一个空的数组 []：
    - 那么这里的两个回调函数分别对应的就是componentDidMount和componentWillUnmount生命周期函数了；

！！！ 函数式组件 + Hooks上述两个，就已经可以取代class组件

## 马上要讲的内容
1. 特殊场景才会用到的Hooks
2. 性能优化的Hooks
3. 自定义Hooks
4. react18 新增的hooks

## useContext
1. useContext的使用
- 在之前的开发中，我们要在组件中使用共享的Context有两种方式：
    - 类组件可以通过 类名.contextType = MyContext方式，在类中获取context；
    - 多个Context或者在函数式组件中通过 MyContext.Consumer 方式共享context
- 但是多个Context共享时的方式会存在大量的嵌套：
    - Context Hook允许我们通过Hook来直接获取某个Context的值；
- react中context的使用; 创建一个Context对象、提供数据、消费数据
- 注意事项：
    - 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重新渲染，并使用最新传递给 MyContext provider的context value 值。
        - 即依赖的数据发生变化时，会进行重新渲染操作
```
在 React 中，Context 是一种用于在组件树中共享数据的机制，
避免了通过 props 一层层传递数据的繁琐过程。Context 可以帮助你在组件之间共享数据，类似于全局变量。
使用 Context，你可以在一个地方提供数据（通常称之为“提供者”），然后在应用程序的其他地方访问这些数据（通常称之为“消费者”）。
这样可以简化组件之间传递数据的流程，并让数据共享更加方便。
```

## useReducer（用的很少，了解）
- 很多人看到useReducer的第一反应应该是redux的某个替代品，其实并不是
- useReducer仅仅是useState的一种替代方案：
    - 在某些场景下，如果state的处理逻辑比较复杂，我们可以通过useReducer来对其进行拆分；
    - **或者这次修改的state需要依赖之前的state时，也可以使用**
- index.js是最后一个出口，App里面也可以包含很多别的组件；作为子组件的形式来使用！ 

## useCallback
1. useCallback实际的目的是为了进行性能的优化。
    - 每次新定义他返回的是同一个函数
2. 如何进行性能的优化呢？
    - useCallback会返回一个函数的 memoized（记忆的） 值；
    - 在依赖不变的情况下，多次定义的时候，返回的值是相同的；
3. useCallback性能优化的点:
- 当需要将一个函数传递给子组件时, 最好使用useCallback进行优化, 将优化之后的函数, 传递给子组件
