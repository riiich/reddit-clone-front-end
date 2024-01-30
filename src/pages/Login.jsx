import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";	// for toast notification
import axios from "axios";
import "../styles/Login.css";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
	const [loginRequestForm, setLoginRequestForm] = useState({
		username: "",
		password: "",
	});
	const [isError, setIsError] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	// set loginRequest state with the username and password
	const handleChange = (e) => {
		const { name, value } = e.target;

		setLoginRequestForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// handle api call
	const handleSubmit = async (e) => {
		e.preventDefault();

		// validation
		const validation = {};
		if (!loginRequestForm.username.trim()) {
			validation.username = "Please provide a valid username!";
		}

		if (!loginRequestForm.password.trim()) {
			validation.password = "Please provide a password!";
		}

		if (Object.keys(validation).length > 0) {
			setErrors(validation);
			setIsError(true);
			return;
		}

		try {
			// clear errors if there are no errors
			setErrors({});

			const res = await axios.post("http://localhost:8080/api/auth/login", loginRequestForm);
			console.log("reach here?");
			console.log(loginRequestForm.username);

			toast.success("Login successful!");

			// store the user information in local storage
			localStorage.setItem("username", res.data.username);
			localStorage.setItem("authToken", res.data.authToken);
			localStorage.setItem("refreshToken", res.data.refreshToken);
			localStorage.setItem("expiresAt", res.data.expiresAt);

			setTimeout(() => {
				navigate("/");
			}, 1500);
			// console.log(res.data);
		} catch (err) {
			console.log(err);
			toast.error("Login failed! Please Try Again.");
		}
	};

	// handle token refresh when the component mounts
	useEffect(() => {
		const refreshToken = async () => {
			try {
				// confirm if there is a refresh token and username in the local storage
				const storedRefreshToken = localStorage.getItem("refreshToken");
				const storedUserName = localStorage.getItem("username");

				if(!storedRefreshToken || !storedUserName) {
					console.log("There is no refresh token or username stored in local storage. Consider logging in again!");
					return;
				}

				const refreshTokenPayload = {
					refreshToken: storedRefreshToken,
					username: storedUserName,
				};

				// using the current refresh token, make an api call to renew it
				const res = await axios.post(
					"http://localhost:8080/api/auth/refresh/token",
					refreshTokenPayload
				);

				// update the refresh token and auth token in local storage
				localStorage.setItem("authToken", res.data.authToken);
				localStorage.setItem("expiresAt", res.data.expiresAt);
			} catch (err) {
				console.log(err);
				navigate("/login");	 // navigate user back to login page to re-log back in
			}
		};

		const storedExpiration = localStorage.getItem("expiresAt");
		if (storedExpiration) {
			const expireTime = new Date(storedExpiration).getTime();
			const currTime = new Date().getTime();

			const timeThreshold = 5 * 60 * 1000; // 5 minutes before the refresh token expires, then renew it

			// get new token if the expiration time is about to expire
			if (expireTime - currTime < timeThreshold) {
				refreshToken();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="login-section">
				<div className="row justify-content-center">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<div className="card">
							<div className="card-header" style={{ textAlign: "center" }}>
								<h4>Login</h4>
							</div>
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<div className="form-group row">
										<label
											htmlFor="username"
											className="col-md-4 col-form-label text-md-right"
										>
											Username
										</label>
										<div className="col-md-6">
											<input
												type="text"
												id="username"
												className={`form-control ${
													errors.username ? "is-invalid" : ""
												}`}
												name="username"
												value={loginRequestForm.username}
												onChange={handleChange}
												// required
												autoFocus
											/>
											{errors.username && (
												<span className="invalid-feedback">{errors.username}</span>
											)}
										</div>
									</div>

									<div className="form-group row">
										<label
											htmlFor="password"
											className="col-md-4 col-form-label text-md-right"
										>
											Password
										</label>
										<div className="col-md-6">
											<input
												type="password"
												id="password"
												className={`form-control ${
													errors.password ? "is-invalid" : ""
												}`}
												name="password"
												value={loginRequestForm.password}
												onChange={handleChange}
												// required
											/>
											{errors.password && (
												<span className="invalid-feedback">{errors.password}</span>
											)}
										</div>
									</div>

									<span className="col-md-6 offset-md-4">
										<button type="submit" className="login">
											Login
										</button>
										<span style={{ paddingLeft: "15px" }}>
											New to SpringReddit? <Link to="/signup">Sign Up</Link>
										</span>
									</span>
									{isError && (
										<div className="login-failed">
											<p className="login-failed-text">
												Login Failed. Please check your credentials and try again.
											</p>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-3"></div>
				</div>
			</div>
			<ToastContainer position="top-center" hideProgressBar={true} autoClose={3000} theme="colored" closeOnClick />
		</>
	);
};
