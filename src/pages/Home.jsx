import "../styles/Home.css";
import { SinglePost } from "../components/SinglePost";
import { Sidebar } from "../components/Sidebar";
import { SubredditSidebar } from "../components/SubredditSidebar";
import { Routes, Route } from "react-router-dom";

export const Home = () => {
	return (
		<div className="reddit-body">
			<div className="container">
				<div className="row">
					<hr />
					<div className="col-md-9">
						<SinglePost />
					</div>
					<div className="col-md-3">
						<Sidebar />
						<SubredditSidebar />
					</div>
				</div>
			</div>
		</div>
	);
};
