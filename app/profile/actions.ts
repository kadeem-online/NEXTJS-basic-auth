"use server";

import { User } from "@/lib/sequelize";
import { deleteSession, verifySession } from "@/lib/sessions";

export type ProfileDeletionState = {
	success: boolean | null;
	message?: string;
};

export async function EndUserSession() {
	await deleteSession();
}

export async function DeleteUserProfile(
	state: ProfileDeletionState | void,
	formData: FormData
): Promise<ProfileDeletionState | void> {
	// Get the user ID from the session
	const current_session = await verifySession();
	if (current_session === null || !current_session?.id) {
		return {
			success: false,
			message: "Invalid user session, please log in and try again!",
		};
	}

	// Delete the user from the database
	try {
		const user = await User.findByPk(current_session.id);
		if (user === null) {
			return {
				success: false,
				message: "Trouble deleting the profile, please login and try again!",
			};
		}

		const message = `Successfully deleted profile for ${user.email}.`;

		await user.destroy();

		return {
			success: true,
			message,
		};
	} catch (error) {
		return {
			success: false,
			message: "ERROR 500: Server Failure!" + error,
		};
	}
}
