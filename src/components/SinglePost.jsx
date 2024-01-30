import "../styles/SinglePost.css";
import { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VoteButton } from "./VoteButton";

export const SinglePost = () => {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get("http://localhost:8080/api/posts");
				
				setPosts(res.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, []);

	const goToPost = (postId) => {
		// Navigate to the post detail page using React Router
		navigate(`/post/${postId}`);
	};

	return (
		<div>
			{posts.map((post) => (
				<div className="row post" key={post.id}>
					<VoteButton post={post} />
					{/* Section to Display Post Information */}
					<div className="col-md-11">
						<span className="subreddit-info">
							<span className="subreddit-text">
								<a className="posturl" href="#">
									{post.subredditName}
								</a>
							</span>
							<span>
								Posted by <a href="#">u/{post.userName}</a>
							</span>
							<span>&nbsp;{post.duration}</span>
						</span>
						<hr />
						<div className="post-title">
							<a className="postname" href={post.url}>
								{post.postName}
							</a>
						</div>
						<div>
							<p className="post-text">{post.description}</p>
						</div>
						<hr />
						<span>
							<a className="btnCommments" role="button">
								<FaComments />
								Comments ({post.commentCount})
							</a>
							<button className="login" onClick={() => goToPost(post.id)}>
								Read Post
							</button>
						</span>
					</div>
				</div>
			))}
		</div>
	);
};
