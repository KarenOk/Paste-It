import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste/CreatePaste";
import LandingPage from "./pages/LandingPage/LandingPage";
import ViewPaste from "./pages/ViewPaste/ViewPaste";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route
						path="/new"
						exact
						render={(props) => (
							<div className="app" {...props}>
								<header className="">
									<Link to="/">
										<h1> PasteIt </h1>
									</Link>
									<div className="submit-cont">
										<Link to="/xyz">
											<button> Publish Paste</button>
										</Link>
									</div>
								</header>
								<CreatePaste />
							</div>
						)}
					/>
					<Route
						path="/:id"
						exact
						render={(props) => (
							<div className="app" {...props}>
								<header className="">
									<Link to="/">
										<h1> PasteIt </h1>
									</Link>
									<div className="submit-cont">
										<Link to="/new">
											<button> + New Paste</button>
										</Link>
									</div>
								</header>
								<ViewPaste />
							</div>
						)}
					/>

					<Route path="/" exact component={LandingPage} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
