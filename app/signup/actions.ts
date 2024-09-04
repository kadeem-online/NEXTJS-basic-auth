"use server";

import { User } from "@/lib/sequelize";
import { hashPassword } from "@/lib/utils";
import { z } from "zod";
const bcrypt = require("bcrypt");

// Blueprint for the state
export type State = {
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		password_confrimation?: string[];
	};
};

// Schema for new user using zod
const NewUserSchema = z.object({
	id: z.number(),
	name: z
		.string({
			required_error: "Name is required!",
		})
		.min(3, { message: "Name must be 3 or more characters!" })
		.regex(/^[a-zA-Z]+$/, {
			message: "Name can only contain alphabet characters!",
		}),
	email: z
		.string({
			required_error: "Email address is required!",
		})
		.email({ message: "Invalid email address!" }),
	password: z
		.string({
			required_error: "Password field required!",
		})
		.min(8, { message: "Password must be 8 or more characters!" }),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// User sign up schema: 'id' is autoincremented and 'createdAt' will be passed Date.now()
// and 'updatedAt' has no initial value.
const NewUserSignUpSchema = NewUserSchema.omit({
	id: true,
	updatedAt: true,
	createdAt: true,
});

/**
 * Verifies the submitted details and signs up a new user if valid. A new session
 * will be started with this user if successful.
 *
 * @param formData {FormData} - FormData from the sign up form.
 */
export async function signUpUser(
	state: State | void,
	formData: FormData
): Promise<State | void> {
	const name = (formData.get("name") as string) || "";
	const email = (formData.get("email") as string) || "";
	const password = (formData.get("password") as string) || "";
	const passsword_confirmation =
		(formData.get("password-confirmation") as string) || "";

	// validate form fields
	const schemaValidation = NewUserSignUpSchema.safeParse({
		name,
		email,
		password,
	});

	if (!schemaValidation.success) {
		return {
			errors: schemaValidation.error.flatten().fieldErrors,
		};
	}

	if ((await INTERNAL_checkEmailAvailability(email)) === false) {
		return {
			errors: {
				email: ["Email address is already in use"],
			},
		};
	}

	try {
		const newUser = await INTERNAL_registerNewUser(name, email, password);
	} catch (error) {}

	return;
}

/**
 * Checks if a given email address is available or not.
 *
 * @param email {string} the email to be checked;
 * @returns {boolean}
 */
async function INTERNAL_checkEmailAvailability(
	email: string
): Promise<Boolean> {
	try {
		const results = await User.findOne({
			where: {
				email,
			},
		});
		return results === null;
	} catch (error) {
		console.log("Email Availability Check Failed: ", error);
		throw new Error("FAILED TO CHECK EMAIL AVAILABILITY.");
	}
}

/**
 *
 * @param name {string} - name of the user
 * @param email {email} - email adress of the user
 * @param password {password} - password of the user
 * @returns
 */
async function INTERNAL_registerNewUser(
	name: string,
	email: string,
	password: string
): Promise<User> {
	try {
		const hashedPassword: string = await hashPassword(password);
		return await User.create({
			email,
			password: hashedPassword,
			name,
		});
	} catch (error) {
		console.log("Failed to register new user: ", error);
		throw new Error("USER REGISTRATION FAILURE.");
	}
}
