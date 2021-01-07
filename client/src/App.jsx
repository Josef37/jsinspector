import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Instances from "./components/Instances";

function App() {
  return <Switch>
    <Route path="/:id" render={(routeProps) => <Instances id={routeProps.match.params.id} />} />
    <Route><Home /></Route>
  </Switch>
}

export default App
