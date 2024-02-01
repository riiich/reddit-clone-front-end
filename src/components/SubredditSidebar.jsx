import "../styles/SubredditSidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const SubredditSidebar = () => {
	const [subreddits, setSubreddits] = useState([]);
	const [displayAll, setDisplayAll] = useState(false);

	useEffect(() => {
		const getSubreddits = async () => {
			try {
				const res = await axios.get("http://localhost:8080/api/r");

				if (res.data.length > 3) {
					setSubreddits(res.data.slice(0, 3));
					setDisplayAll(true);
				} else {
					setSubreddits(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		};

		getSubreddits();
	}, []);

	return (
		<div className="sidebar-view-subreddit">
			<div style={{ color: "black", fontWeight: "bold" }}>Browse Subreddits</div>
			<hr />
			{subreddits?.map((subreddit) => (
				<div key={subreddit.subRedditId}>
					<span>
						<a href={`/view-subreddit/${subreddit.id}`}>r/ {subreddit.subRedditName}</a>
						<hr />
					</span>
				</div>
			))}
			{displayAll && (
				<div style={{ textAlign: "center" }}>
					<a style={{ fontWeight: "bold" }} href="/subreddits">
						View All
					</a>
				</div>
			)}
		</div>
	);
};
