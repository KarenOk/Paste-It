import React, { useState } from "react";
import "./CreatePaste.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import successImg from "../../images/publish_success-2.svg";
import { BASE_URL } from "../../BASE_URL";

const CreatePaste = () => {
	const [content, setContent] = useState("");
	const [paste, setPaste] = useState(null);
	const [loading, setLoading] = useState(false);

	const publishPaste = async () => {
		setLoading(true);
		try {
			let res = await Axios({
				method: "POST",
				url: "/pastes",
				baseURL: BASE_URL,
				data: { content },
			});
			let data = res.data.data;
			setPaste(data);
		} catch (err) {
			console.log(err.response.data);
			setPaste(null);
		}
		setLoading(false);
	};

	return (
		<div className="app">
			<header className="">
				<Link to="/">
					<h1> PasteIt </h1>
				</Link>
				<div className="submit-cont">
					<button
						disabled={!content || loading || paste}
						onClick={publishPaste}
					>
						{loading ? "Publishing..." : "Publish Paste"}
					</button>
				</div>
			</header>
			<main className="create-paste">
				<div className="container">
					{paste ? (
						<div className="success-message">
							<img src={successImg} alt="" />
							<h2> Your content was published successfully.</h2>
							<p>
								Access your content on any device using the following link:{" "}
								<Link to={`/${paste["key"]}`}>
									{`${window.location.origin}/${paste["key"]}`}
								</Link>
								. This link expires in 24 hours.
							</p>
						</div>
					) : (
						<textarea
							onChange={(e) => setContent(e.target.value)}
							placeholder="Input some text here..."
						></textarea>
					)}
				</div>
			</main>
		</div>
	);
};

export default CreatePaste;
