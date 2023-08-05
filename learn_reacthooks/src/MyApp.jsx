import CounterClass from "./CounterClass";
import CounterHook from "./CounterHook";
import ChangeTitle from "./02-useEffect的使用/ChangeTitle";
import useMyReducer from "./06_useReducer的使用/App";
import { useContext } from "react";
import { UserContext, ThemeContext } from "./03-useContext的使用/context";

function App() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  return (
    <div className="App">
      <h1>App Component</h1>
      <CounterClass />
      <div>--------------------------------------------------------</div>
      <CounterHook />
      <div>--------------------------------------------------------</div>
      <ChangeTitle />
      <div>
        <h2>User: {user.name}</h2>
        <h2>Theme: {theme.color}</h2>
      </div>
      <div>--------------------------------------------------------</div>
      <useMyReducer /> 
    </div>
  );
}

export default App;
