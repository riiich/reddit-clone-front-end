import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { CreatePosts } from "./pages/CreatePost";
import { CreateSubreddit } from "./pages/CreateSubreddit";
import { SubredditList } from "./pages/SubredditList";
import { ViewPost } from "./components/ViewPost";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/create-post" element={<CreatePosts />} />
					<Route path="/create-subreddit" element={<CreateSubreddit />} />
					<Route path="/post/:id" element={<ViewPost />} />
					<Route path="/subreddits" element={<SubredditList />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
