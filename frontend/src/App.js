import "./App.css";

function App() {
	return (
		<div className="app">
			<header className="">
				<h1> PasteIt </h1>
				<div className="submit-cont">
					<button> Publish Paste</button>
				</div>
			</header>
			<main>
				<div className="container">
					<textarea></textarea>
				</div>
			</main>
		</div>
	);
}

export default App;
