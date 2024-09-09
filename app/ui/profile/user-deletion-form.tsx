"use client";

import {
	DeleteUserProfile,
	ProfileDeletionState,
	EndUserSession,
} from "@/app/profile/actions";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

function UserDeletionFormSubmitButton() {
	const submission = useFormStatus();

	return (
		<button
			disabled={submission.pending}
			type="submit"
			className="bg-red-600 py-1 px-3 rounded font-medium text-gray-50"
		>
			{submission.pending ? "Deleting..." : "Delete Profile"}
		</button>
	);
}

function handleDeletionStateMessage(state: ProfileDeletionState | void) {
	if (typeof state === "undefined") {
		return;
	}

	if (state.success === null) {
		return;
	}

	if (state.message !== undefined) {
		if (!state.success) {
			toast.error(state.message, {
				duration: 5000,
			});
		}

		if (state.success) {
			toast.success(state.message, {
				duration: 5000,
			});
			EndUserSession();
		}
	}
}

export default function UserDeletionForm() {
	const initialState: ProfileDeletionState = { success: null };
	const [state, profileDeletionAction] = useFormState(
		DeleteUserProfile,
		initialState
	);

	handleDeletionStateMessage(state);

	return (
		<form action={profileDeletionAction}>
			<input type="hidden" name="delete-profile" />
			<UserDeletionFormSubmitButton />
		</form>
	);
}
