import { getUserInformation } from "@/app/profile/data";

type ProfileGreetingProps = {};

export default async function ProfileGreeting(props: ProfileGreetingProps) {
	const user = await getUserInformation();
	return (
		<p className="greeting text-gray-300 font-semibold text-2xl">
			Welcome {user?.name}
		</p>
	);
}
