"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUpUser, State } from "@/app/signup/actions";

type SignUpFormProps = {
	className?: string;
};

async function onPageSignUpValidation(
	state: State | void,
	formData: FormData
): Promise<State | void> {
	// Check if passwords match
	const password = (formData.get("password") as string) || "";
	const password_confrimation =
		(formData.get("password-confirmation") as string) || "";

	if (password.length < 8) {
		return {
			errors: {
				password: ["Password must be 8 or more characters!"],
			},
		};
	}

	if (password !== password_confrimation) {
		return {
			errors: {
				password_confrimation: ["Passwords must match!"],
			},
		};
	}

	return await signUpUser(undefined, formData);
}

function SignUpSubmitButton() {
	const status = useFormStatus();
	return (
		<>
			<button
				type="submit"
				disabled={status.pending}
				className="bg-orange-600 text-gray-50 py-1 px-5 rounded font-semibold
        disabled:bg-slate-600 hover:bg-orange-400 hover:text-gray-900"
			>
				{status.pending ? "Processing..." : "Sign Up"}
			</button>
		</>
	);
}

export default function SignUpForm(props: SignUpFormProps) {
	const initialState: State = { errors: {} };
	const [state, action] = useFormState(onPageSignUpValidation, initialState);

	return (
		<>
			<form
				action={action}
				className={`${props.className} flex flex-col gap-4 max-w-lg p-4 mx-auto
        bg-gradient-to-b from-gray-900 to-gray-950 rounded-md border-2 border-gray-800`}
			>
				<div className="form-group form-header">
					<h1 className="text-center text-2xl font-semibold text-gray-400">
						{" "}
						Sign Up
					</h1>
				</div>

				<div className="form-group name-field flex flex-col gap-2">
					{state?.errors?.name && (
						<ul className="form-errors p-2 bg-red-500/75 rounded flex flex-col gap-1 text-sm font-semibold">
							{state.errors.name.map((form_error, index) => {
								return <li key={index}>{form_error}</li>;
							})}
						</ul>
					)}
					<label htmlFor="signup-name">Name:</label>
					<input
						type="text"
						name="name"
						id="signup-name"
						className="py-1 px-2 bg-gray-200 rounded text-gray-900 placeholder:text-gray-500"
						placeholder="Enter name..."
						required
					/>
				</div>

				<div className="form-group email-field flex flex-col gap-2">
					{state?.errors?.email && (
						<ul className="form-errors p-2 bg-red-500/75 rounded flex flex-col gap-1 text-sm font-semibold">
							{state.errors.email.map((form_error, index) => {
								return <li key={index}>{form_error}</li>;
							})}
						</ul>
					)}
					<label htmlFor="signup-email">Email:</label>
					<input
						type="text"
						name="email"
						id="signup-email"
						className="py-1 px-2 bg-gray-200 rounded text-gray-900 placeholder:text-gray-500"
						placeholder="Enter email..."
						required
					/>
				</div>

				<div className="form-group password-field flex flex-col gap-2">
					{state?.errors?.password && (
						<ul className="form-errors p-2 bg-red-500/75 rounded flex flex-col gap-1 text-sm font-semibold">
							{state.errors.password.map((form_error, index) => {
								return <li key={index}>{form_error}</li>;
							})}
						</ul>
					)}
					<label htmlFor="signup-password">Password:</label>
					<input
						type="password"
						name="password"
						id="signup-password"
						className="py-1 px-2 bg-gray-200 rounded text-gray-900 placeholder:text-gray-500"
						placeholder="Enter password..."
						required
					/>
				</div>

				<div className="form-group password-field flex flex-col gap-2">
					{state?.errors?.password_confrimation && (
						<ul className="form-errors p-2 bg-red-500/75 rounded flex flex-col gap-1 text-sm font-semibold">
							{state.errors.password_confrimation.map((form_error, index) => {
								return <li key={index}>{form_error}</li>;
							})}
						</ul>
					)}
					<label htmlFor="signup-password-confirmation">
						Confirm Password:
					</label>
					<input
						type="password"
						name="password-confirmation"
						id="signup-password-confirmation"
						className="py-1 px-2 bg-gray-200 rounded text-gray-900 placeholder:text-gray-500"
						placeholder="Enter password..."
					/>
				</div>

				<div className="form-group submit-field">
					<SignUpSubmitButton />
				</div>
			</form>
		</>
	);
}
