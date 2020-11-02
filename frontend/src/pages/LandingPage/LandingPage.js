import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../../images/clipboard-white.svg";

const LandingPage = () => {
	return (
		<div className="landing">
			<nav className="box-1">
				<a href="#!" className="logo-cont">
					<img src={logo} alt="Paste It" className="logo" />
				</a>
				<a href="#!"> About </a>
				<a href="#!"> Contact </a>
				<a href="#!"> Contribute </a>
			</nav>

			<header className="box-2">
				<h1>PasteIt</h1>
			</header>

			<div className="box-3">
				<p>
					Online clipboard. Share text over the internet by generating a unique
					URL. Others can access the contents of the taste via this URL.
				</p>
			</div>

			<div className="box-4">
				<Link to="/create">
					<button> Get Started </button>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
