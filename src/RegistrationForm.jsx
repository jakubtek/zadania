import React, { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validate = () => {
		const newErrors = {};
		if (!formData.firstName) newErrors.firstName = "First name is required";
		if (!formData.lastName) newErrors.lastName = "Last name is required";
		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long";
		}
		return newErrors;
	};

	const handleSubmit = e => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length === 0) {
			// Brak błędów, można przesłać dane
			console.log("Form submitted:", formData);
			// Zresetuj formularz po przesłaniu
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
			});
			setErrors({});
		} else {
			// Ustaw błędy w stanie
			setErrors(validationErrors);
		}
	};

	return (
		<div className='registration-form'>
			<h2>Register form</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='firstName'>First Name:</label>
					<input
						type='text'
						id='firstName'
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
					/>
					{errors.firstName && <p className='error'>{errors.firstName}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='lastName'>Last Name:</label>
					<input
						type='text'
						id='lastName'
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
					/>
					{errors.lastName && <p className='error'>{errors.lastName}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
					/>
					{errors.email && <p className='error'>{errors.email}</p>}
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
					{errors.password && <p className='error'>{errors.password}</p>}
				</div>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}

export default RegistrationForm;
