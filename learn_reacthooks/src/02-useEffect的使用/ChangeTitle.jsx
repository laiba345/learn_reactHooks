import React, { memo, useState, useEffect } from "react";

const changeTitle = memo(() => {
  const [count, setCounter] = useState(200);

  // 负责告知react，在执行完当前组件渲染之后要执行的副作用代码
  useEffect(() => {
    // 当前传入的回调函数会在组件被渲染完成后，自动执行(渲染完成以后)
    // 网络请求、DOM操作(修改标题)、事件监听
    document.title = count;

    // 返回值：回调函数 => 组件被重新渲染或组件卸载的时候执行
    return () => {

    }
  });

  return (
    <div>
      <h2>当前计数为：{count}</h2>
      <button onClick={(e) => setCounter(count + 1)}>+1</button>
    </div>
  );
});

export default changeTitle;
