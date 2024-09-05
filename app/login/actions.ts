"use server";

import { boolean, z } from "zod";
import { User } from "@/lib/sequelize";
import { createSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export type State = {
	errors?: {
		email?: string[];
		password?: string[];
		form?: string[];
	};
};

const loginFormDataSchema = z.object({
	email: z
		.string({
			required_error: "Email adress field is required!",
		})
		.email({ message: "Invalid email address!" }),
	password: z
		.string({
			required_error: "Password field is required!",
		})
		.min(1, { message: "Password field is required!" }),
});

export async function logInUser(
	state: State | void,
	formData: FormData
): Promise<void | State> {
	const validateFields = loginFormDataSchema.safeParse({
		email: (formData.get("email") as string) || "",
		password: (formData.get("password") as string) || "",
	});

	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
		};
	}

	const { email, password } = validateFields.data;

	const user = await INTERNAL_verifyUser(email, password);

	if (user === null) {
		return {
			errors: {
				form: ["Please check your email and password and try again."],
			},
		};
	}

	// Start a new session and redirect to profile page
	await createSession(user.id);
	redirect("/profile");
}

async function INTERNAL_verifyUser(
	email: string,
	password: string
): Promise<User | null> {
	try {
		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (user === null) {
			return null;
		}

		const password_is_correct: boolean = await bcrypt.compare(
			password,
			user.password
		);
		if (password_is_correct) {
			return user;
		}

		return null;
	} catch (error) {
		console.log("Error Fetching User: ", error);
		throw new Error("VERIFICATION FAILURE!");
	}
}
