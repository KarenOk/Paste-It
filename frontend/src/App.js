import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste/CreatePaste";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
	return (
		<>
			<Router>
				<Route
					path="/create"
					exact
					render={(props) => (
						<div className="app">
							<header className="">
								<Link to="/">
									<h1> PasteIt </h1>
								</Link>
								<div className="submit-cont">
									<button> Publish Paste</button>
								</div>
							</header>
							<CreatePaste />
						</div>
					)}
				/>
				<Route path="/" exact component={LandingPage} />
			</Router>
		</>
	);
}

export default App;
