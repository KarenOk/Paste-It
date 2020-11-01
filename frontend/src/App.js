import "./App.css";

function App() {
	return (
		<div className="app">
			<header className="">
				<h1> PasteIt </h1>
			</header>
			<main>
				<div className="container">
					<textarea></textarea>
					<div className="submit-cont">
						<button> Publish </button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
