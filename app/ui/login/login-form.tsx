"use client";

import { useFormState, useFormStatus } from "react-dom";
import { logInUser, State } from "@/app/login/actions";

function LoginSubmitButton() {
	const status = useFormStatus();
	return (
		<>
			<button
				type="submit"
				disabled={status.pending}
				className="bg-orange-600 text-gray-50 py-1 px-5 rounded font-semibold
        disabled:bg-slate-600 hover:bg-orange-400 hover:text-gray-900"
			>
				{status.pending ? "Processing..." : "Sign In"}
			</button>
		</>
	);
}

export default function LoginForm() {
	const initialState: State = {};
	const [state, loginAction] = useFormState(logInUser, initialState);

	return (
		<form
			action={loginAction}
			className="flex flex-col gap-4 max-w-lg p-4 mx-auto bg-gradient-to-b
      from-gray-900 to-gray-950 rounded-md border-2 border-gray-800"
		>
			<div className="form-group form-header">
				<h1 className="text-center text-2xl font-semibold text-gray-400">
					Sign Up
				</h1>
			</div>

			{state?.errors?.form && (
				<div className="form-group form-errors">
					<ul className="form-errors p-2 bg-red-500/75 rounded flex flex-col gap-1 text-sm font-semibold">
						{state?.errors?.form?.map((form_error, index) => {
							return <li key={index}>{form_error}</li>;
						})}
					</ul>
				</div>
			)}

			<div className="form-group email-field flex flex-col gap-2">
				<label htmlFor="login-email">Email:</label>
				<input
					type="text"
					name="email"
					id="login-email"
					className="py-1 px-2 bg-gray-200 rounded text-gray-900 placeholder:text-gray-500"
					placeholder="Enter email..."
					required
				/>

				{state?.errors?.email && (
					<ul className="form-errors p-2 bg-red-500/75 rounded flex flex-col gap-1 text-sm font-semibold">
						{state?.errors?.email?.map((form_error, index) => {
							return <li key={index}>{form_error}</li>;
						})}
					</ul>
				)}
			</div>

			<div className="form-group password-field flex flex-col gap-2">
				<label htmlFor="login-password">Password:</label>
				<input
					type="password"
					name="password"
					id="login-password"
					className="py-1 px-2 bg-gray-200 rounded text-gray-900 placeholder:text-gray-500"
					placeholder="Enter Password..."
					required
				/>

				{state?.errors?.password && (
					<ul className="form-errors p-2 bg-red-500/75 rounded flex flex-col gap-1 text-sm font-semibold">
						{state?.errors?.password?.map((form_error, index) => {
							return <li key={index}>{form_error}</li>;
						})}
					</ul>
				)}
			</div>

			<div className="form-group submit">
				<LoginSubmitButton />
			</div>
		</form>
	);
}
