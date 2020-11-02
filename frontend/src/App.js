import "./App.css";
import CreatePaste from "./pages/CreatePaste/CreatePaste";

function App() {
	return (
		<div className="app">
			<header className="">
				<h1> PasteIt </h1>
				<div className="submit-cont">
					<button> Publish Paste</button>
				</div>
			</header>
			<CreatePaste />
		</div>
	);
}

export default App;
