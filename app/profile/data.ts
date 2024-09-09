import { User } from "@/lib/sequelize";
import { verifySession } from "@/lib/sessions";
import "server-only";

export async function getUserInformation(): Promise<null | User> {
	try {
		const session_information = await verifySession();
		if (session_information === null) {
			return null;
		}

		const user_id = session_information.id;
		if (user_id === undefined || typeof user_id !== "number") {
			return null;
		}

		return await User.findByPk(user_id, {
			attributes: ["id", "name", "email"],
		});
	} catch (error) {
		console.log("Failed to get user data: ", error);
		throw new Error("FAILED TO GET USER DETAILS");
	}
}
