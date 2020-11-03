import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../../images/clipboard-white.svg";

const LandingPage = () => {
	return (
		<div className="landing">
			<nav className="box-1">
				<Link to="/" className="logo-cont">
					<img src={logo} alt="Paste It" className="logo" />
				</Link>
				<a href="https://github.com/KarenOk/Paste-It/blob/master/README.md"> About </a>
				<a href="mailto:karenokonkwo29@gmail.com"> Contact </a>
				<a href="https://github.com/KarenOk/Paste-It"> Contribute </a>
			</nav>

			<header className="box-2">
				<h1>PasteIt</h1>
			</header>

			<div className="box-3">
				<p>
					Online clipboard. Share text over the internet by generating a unique URL. Others can access the
					contents of the paste via this URL.
				</p>
			</div>

			<div className="box-4">
				<Link to="/new">
					<button> Get Started </button>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
