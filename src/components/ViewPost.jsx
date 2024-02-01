import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ViewPost.css";
import { Sidebar } from "./Sidebar";
import { SubredditSidebar } from "./SubredditSidebar";

export const ViewPost = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState({
		text: "",
		postId: "",
		username: "",
		duration: "",
	});

	const postComment = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post("http://localhost:8080/api/comments", {
				postId: id,
				username: comment.username,
				text: comment.text,
			}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                }
            });

			console.log(res.data);
			// reset comment when comment is posted
			setComment({
				text: "",
				postId: "",
				username: "",
				duration: "",
			});

			getCommentsForPost();
		} catch (err) {
			console.log(err);
		}
	};

	const getPostById = async () => {
		try {
			const res = await axios.get(`http://localhost:8080/api/posts/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
				},
			});

			setPost(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const getCommentsForPost = async () => {
		try {
			const res = await axios.get(`http://localhost:8080/api/comments/post/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
				},
			});

			setComments(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleCommentText = (e) => {
		setComment({ ...comment, text: e.target.value });
	};

	useEffect(() => {
		getPostById();
		getCommentsForPost();
	}, [id]);

	return (
		<div className="container">
			<div className="row">
				<hr />
				<div className="col-md-9">
					<div className="row post">
						<div className="col-md-1">
							{/* VOTE BUTTON COMPONENT */}
							{/*  */}
							{/*  */}
						</div>
						<div className="col-md-11">
							<span>
								<span className="subreddit-text">
									<Link className="post-url" to="">
										{post?.subRedditName}
									</Link>
								</span>
								<span>
									. Posted
									<span>{post?.duration}</span>
									by
									{post?.userName ? (
										<Link className="username" to="">
											{post.userName}
										</Link>
									) : (
										<Link className="username" to="">
											Anonymous
										</Link>
									)}
								</span>
							</span>
							<hr />
							<Link className="post-title" to={post?.url}>
								{post?.postTitle}
							</Link>
							<div>
								<p className="post-text" /*dangerouslySetInnerHTML={} */></p>
							</div>
							<div className="post-comment">
								<form onSubmit={postComment}>
									<div className="form-group">
										<textarea
											className="form-control"
											value={comment.text}
											onChange={handleCommentText}
											placeholder="Comment..."
										/>
									</div>
									<button type="submit" className="login float-right">
										Post Comment
									</button>
								</form>
							</div>
							<div style={{ marginTop: "60px" }}>
								{comments?.map((c) => (
									<div className="comment" key={c.id}>
										<div className="username">
											<Link to={`/user/${c?.userName}`}>{c.userName}</Link>
										</div>
										<div>
											<p>{c?.duration}</p>
										</div>
										<b>{c?.text}</b>
										<hr />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-3">
				<Sidebar />
				<SubredditSidebar />
			</div>
		</div>
	);
};
