import { deleteSession } from "@/lib/sessions";

type LogoutFormProps = {
	className?: string;
	label: string;
};

async function logout() {
	"use server";

	await deleteSession();
	return;
}

export default function LogoutForm(props: LogoutFormProps) {
	return (
		<form action={logout}>
			<button type="submit" className={props.className}>
				{props.label}
			</button>
		</form>
	);
}
