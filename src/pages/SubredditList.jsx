import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../components/Sidebar";

export const SubredditList = () => {
	const [subreddits, setSubreddits] = useState([]);

	useEffect(() => {
		const getAllSubreddits = async () => {
			try {
				const res = await axios.get("http://localhost:8080/api/r");

				setSubreddits(res.data);
            } catch (err) {
				console.log(err);
			}
		};

		getAllSubreddits();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<hr />
				<div className="col-md-9">
					<h2>List of Subreddits</h2>
					<ul>
						{subreddits?.map((s) => (
							<li key={s.subRedditId}>
								<Link to={`/view-subreddit/${s.subRedditId}`}>{s.subRedditName}</Link>
							</li>
						))}
					</ul>
				</div>
                <div className="col-md-3">
                    <Sidebar />
                </div>
			</div>
		</div>
	);
};
