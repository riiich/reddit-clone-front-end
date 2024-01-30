import "../styles/VoteButton.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export const VoteButton = ({ post }) => {
	const upvotePost = () => {
		console.log("upvoted");
	};

	const downvotePost = () => {
		console.log("downvoted");
	};
	return (
		<>
			{/* Section to Display Votes */}
			<div className="col-md-1">
				<div className="d-flex flex-column votebox">
					<div className="p-2">
						<FaArrowUp className="upvote" onClick={() => upvotePost(post.id)} />
					</div>
					<div className="p-2 votecount">{post.voteCount}</div>
					<div className="p-2">
						<FaArrowDown className="downvote" onClick={() => downvotePost(post.id)} />
					</div>
				</div>
			</div>
		</>
	);
};
