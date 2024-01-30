import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
	const navigate = useNavigate();

	const createPost = () => {
		navigate("/create-post");
	};

    const createSubreddit = () => {
		navigate("/create-subreddit");	
	};

	return (
		<div className="sidebar">
			<img src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png" alt="" />
			<div style={{ textAlign: "center", fontSize: "1em" }}>
				Welcome to the ultra bootleg Reddit Clone home page. Come here to check in with your favorite
				subreddits!
			</div>
			<div style={{ textAlign: "center" }}>
				<button className="btnCreatePost" onClick={createPost}>
					Create Post
				</button>
			</div>
            <div style={{textAlign: "center"}}>
                <button className="btnCreateSubreddit" onClick={createSubreddit}>Create Subreddit</button>
            </div>
		</div>
	);
};
