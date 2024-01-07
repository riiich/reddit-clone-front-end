import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css";

export const SignUp = () => {
	const navigate = useNavigate();
	const [signupForm, setSignupForm] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [signupRequestPayload, setSignupRequestPayload] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target; //  gets the entire input from the html
		setSignupForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSignupRequestPayload({ ...signupForm });

		navigate("/login");
	};

	// make an api call to send sign up data to server
	useEffect(() => {
		const sendSignUpInfo = async () => {
			const res = await axios.post("http://localhost:8080/api/auth/signUp", {
				signupRequestPayload,
			});

        console.log(res.data);
		};

		sendSignUpInfo();
	}, [signupRequestPayload.email]);

	return (
		<div className="register-section">
			<div className="row justify-content-center">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<div className="card">
						<div className="card-header" style={{ textAlign: "center" }}>
							<h4>Register</h4>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<div className="form-group row">
									<label
										htmlFor="username"
										className="col-md-4 col-form-label text-md-right"
									>
										User Name
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="username"
											className="form-control"
											name="username"
											value={signupForm.username}
											onChange={handleChange}
											required
											autoFocus
										/>
										{signupForm.username &&
											!/^[a-zA-Z0-9_]+$/.test(signupForm.username) && (
												<span>Please provide a valid username</span>
											)}
									</div>
								</div>

								<div className="form-group row">
									<label htmlFor="email" className="col-md-4 col-form-label text-md-right">
										E-Mail Address
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="email"
											className="form-control"
											name="email"
											value={signupForm.email}
											onChange={handleChange}
											required
										/>
										{signupForm.email &&
											!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email) && (
												<span>Please provide a valid email</span>
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
											className="form-control"
											name="password"
											value={signupForm.password}
											onChange={handleChange}
											required
										/>
										{signupForm.password && signupForm.password.length < 6 && (
											<span>Password should be at least 6 characters long</span>
										)}
									</div>
								</div>

								<div className="most-bottom col-md-6 offset-md-4">
									<button type="submit" className="signup">
										Sign Up
									</button>
									<span style={{ paddingLeft: "15px" }}>
										Existing user? <a href="/login">Log In</a>
									</span>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	);
};
