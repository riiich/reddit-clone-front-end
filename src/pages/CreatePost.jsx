import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/CreatePosts.css";

export const CreatePosts = () => {
	const [postInfo, setPostInfo] = useState({
		postTitle: "",
		subRedditName: "",
		url: "",
		description: "",
	});
	const [subreddits, setSubreddits] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getSubreddits = async () => {
			try {
				const res = await axios.get("http://localhost:8080/api/r");

				setSubreddits(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getSubreddits();
	}, []);

	const createPost = async (e) => {
		e.preventDefault();

		if (!localStorage.getItem("authToken")) {
			console.log("User not authenticated...");
			return;
		}

		try {
			await axios.post("http://localhost:8080/api/posts", postInfo, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					"Content-Type": "application/json",
				},
			});

			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	const discardPost = () => {
		navigate("/");
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// using a dynamic object to state object with whatever property has been changed
		setPostInfo((prevForm) => ({ ...prevForm, [name]: value }));
	};

	return (
		<div className="container">
			<div className="row">
				<hr />
				<div className="create-post-container col-md-9">
					<form className="post-form" onSubmit={createPost}>
						<div className="form-group">
							<div className="create-post-heading">Create Post</div>
							<hr />
							<input
								type="text"
								name="postTitle"
								className="form-control"
								value={postInfo.postTitle}
								onChange={handleInputChange}
								style={{ marginTop: "5px" }}
								placeholder="Post Title..."
							/>

							<input
								type="text"
								name="url"
								className="form-control"
								value={postInfo.url}
								onChange={handleInputChange}
								style={{ marginTop: "5px" }}
								placeholder="URL..."
							/>

							<select
								className="form-control"
								name="subRedditName"
								value={postInfo.subRedditName}
								onChange={handleInputChange}
								style={{ marginTop: "10px" }}
							>
								<option value="" disabled>
									Select a subreddit...
								</option>
								{subreddits.map((s) => (
									<option key={s.subRedditId} value={s.subRedditName}>
										{s.subRedditName}
									</option>
								))}
							</select>

							<textarea
								name="description"
								value={postInfo.description}
								onChange={handleInputChange}
								style={{ width: "100%", marginTop: "5px" }}
								placeholder="Description"
							></textarea>

							<div>
								<div className="float-right" style={{ marginTop: "5px" }}>
									<button type="button" className="btnDiscard" onClick={discardPost}>
										Discard
									</button>
									<button type="submit" className="btnCreatePost">
										Post
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	);
};
