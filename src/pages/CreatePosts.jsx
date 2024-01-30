import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CreatePosts.css";

export const CreatePosts = () => {
	const [postInfo, setPostInfo] = useState({
		postName: "",
		url: "",
		subredditName: "",
		description: "",
	});
	const [subreddits, setSubreddits] = useState([]);
	const navigate = useNavigate();

    useEffect(() => {
        const getSubreddits = async () => {
            const res = await axios.get("http://localhost:8080/api/r");

            setSubreddits(res.data);
        };

        getSubreddits();
    }, []);

	const createPost = () => {};

	const handleChange = () => {};

	const discardPost = () => {};

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
								name="postName"
								className="form-control"
								value={postInfo.postName}
								onChange={handleChange}
								style={{ marginTop: "5px" }}
								placeholder="Post Title..."
							/>

							<input
								type="text"
								name="url"
								className="form-control"
								value={postInfo.url}
								onChange={handleChange}
								style={{ marginTop: "5px" }}
								placeholder="URL..."
							/>

							<select
								className="form-control"
								name="subredditName"
								value={postInfo.subredditName}
								onChange={handleChange}
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
								onChange={handleChange}
								style={{ width: "100%", marginTop: "5px" }}
								placeholder="Enter your post description..."
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
