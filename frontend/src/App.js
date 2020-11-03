import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste/CreatePaste";
import LandingPage from "./pages/LandingPage/LandingPage";
import ViewPaste from "./pages/ViewPaste/ViewPaste";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/new" exact component={CreatePaste} />
					<Route path="/:id" exact component={ViewPaste} />
					<Route path="/" exact component={LandingPage} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
