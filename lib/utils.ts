const bcrypt = require("bcrypt");

export async function hashPassword(password: string) {
	try {
		const saltRounds = 10;
		const salt: string = await bcrypt.genSalt(saltRounds);
		const hashedPassword: string = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		console.log("Password hash failure: ", error);
		throw new Error("PASSWORD HASHING FAILED");
	}
}
