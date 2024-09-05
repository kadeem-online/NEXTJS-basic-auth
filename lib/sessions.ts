import "server-only";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SessionCookieType = {
	name: string;
	options: Partial<ResponseCookie>;
	duration: number;
};

type UserSessionPayload = {
	id: number;
};

const access_secret =
	(process.env.JWT_ACCESS_SECRET as string) || "jwt_access_string";
const key = new TextEncoder().encode(access_secret);
const encryption_algorithm: string = "HS256";

// Helper object: Session Cookie
const session_cookie: SessionCookieType = {
	name: "nextjs_auth_user_session",
	options: {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
	},
	duration: 60 * 60 * 1000, // 1 hour
};

/**
 * Encrypts the given payload using the set secret to generate a JWT token, which
 * is returned as a string.
 *
 * @param payload {any} - The data to be encoded
 * @returns {string}
 */
export async function encrypt(payload: any): Promise<string> {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: encryption_algorithm })
		.setIssuedAt()
		.setExpirationTime("1hour")
		.sign(key);
}

/**
 * Attempts to decode the JWT token against the key used for encryption. If the
 * JWT token is one generated on this application using the set secret, the decoded
 * JWT payload will be returned. Otherwise returns null on failure.
 *
 * @param jwt {string} - The encoded jwt to be decoded.
 * @returns {JWTPayload|null}
 */
export async function decrypt(jwt: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(jwt, key, {
			algorithms: [encryption_algorithm],
		});
		return payload;
	} catch (error) {
		return null;
	}
}

/**
 * Creates a new session for the given user.
 *
 * @param userId {number} - the id of the user in the database.
 */
export async function createSession(userId: number): Promise<void> {
	const expires = new Date(Date.now() + session_cookie.duration);
	const userPayload: UserSessionPayload = {
		id: userId,
	};
	const jwt_token = await encrypt(userPayload);

	cookies().set(session_cookie.name, jwt_token, {
		...session_cookie.options,
		expires,
	});
}

/**
 * Checks if the current user has an active valid session, If not returns null
 */
export async function verifySession(): Promise<null | UserSessionPayload> {
	const token = cookies().get(session_cookie.name)?.value;
	if (token === undefined) {
		return null;
	}

	const payload = await decrypt(token);
	if (payload === null) {
		return null;
	}

	try {
		const passed_payload = payload as UserSessionPayload;
		if (!passed_payload.id) {
			return null;
		}

		return passed_payload;
	} catch (error) {
		// TODO: Handle error
		return null;
	}
}

/**
 * Destroys the current user session if it exists and redirects the user to the
 * login route.
 */
export async function deleteSession() {
	cookies().delete(session_cookie.name);
	redirect("/login");
}
