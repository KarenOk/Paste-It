import React, { useState, useEffect } from "react";
import "./ViewPaste.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../BASE_URL";
import copy from "../../images/copy.svg";
import loader from "../../images/loader.gif";

const ViewPaste = props => {
	const [copied, setCopied] = useState(false);
	const [paste, setPaste] = useState(null);

	useEffect(() => {
		const key = props.match.params.id;

		(async function () {
			try {
				const res = await Axios({
					method: "GET",
					url: "/pastes/" + key,
					baseURL: BASE_URL
				});
				setPaste(res.data.data);
			} catch (err) {
				console.log(err.response.data);
				props.history.push("/");
			}
		})();
	}, []);

	useEffect(() => {
		if (copied) {
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		}
	}, [copied]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(paste["content"]).then(() => {
			setCopied(true);
		});
	};

	return (
		<div className="app">
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

			<main className="view-paste">
				{paste ? (
					<div className="content">
						{navigator && (
							<button className={copied ? "copied" : ""} disabled={copied} onClick={copyToClipboard}>
								{copied ? (
									"Copied!"
								) : (
									<>
										<img src={copy} alt="" />
										Copy to Clipboard
									</>
								)}
							</button>
						)}

						<pre> {paste["content"]}</pre>
					</div>
				) : (
					<div className="content loader">
						<img src={loader} alt="" />
						<p> Loading...</p>
					</div>
				)}
			</main>
		</div>
	);
};

export default ViewPaste;
