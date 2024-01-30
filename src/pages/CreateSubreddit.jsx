import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateSubreddit.css";

export const CreateSubreddit = () => {
	const [subredditInfo, setSubredditInfo] = useState({
		title: "",
		description: "",
	});
	const navigate = useNavigate();

	const createSubreddit = () => {
		navigate("/list-subreddits");
	};

	const discard = () => {
		navigate("/");	
	};

	const handleChange = (e) => {
		const {name, value} = e.target;

		setSubredditInfo((s) => ({...s, [name]: value}));
	};


	return (
		<div className="container">
			<div className="row">
				<div className="create-subreddit-container">
					<form className="post-form" onSubmit={createSubreddit}>
						<div className="form-group">
							<div className="create-subreddit-heading">Create Subreddit</div>
							<hr />
							<input
								type="text"
								className="form-control"
								name="title"
								value={subredditInfo.title}
								onChange={handleChange}
								style={{ marginTop: "5px" }}
								placeholder="Title"
							/>
							<textarea
								type="text"
								name="description"
								value={subredditInfo.description}
								onChange={handleChange}
								style={{ width: "100%", marginTop: "5px" }}
								placeholder="Description"
							></textarea>
							<div>
								<div className="float-right" style={{ marginTop: "5px" }}>
									<button type="button" className="btnDiscard" onClick={discard}>
										Discard
									</button>
									<button type="submit" className="btnCreateSubreddit">
										Create
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-3">
					<div className="sidebar">
						<h5 className="guidelines">Posting to Reddit Clone</h5>
						<hr />
						<ul>
							<li>Remember the human</li>
							<hr />
							<li>Behave like you would in real life</li>
							<hr />
							<li>Don't spam</li>
							<hr />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
