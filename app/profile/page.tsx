import ProfileGreeting from "@/app/ui/profile/greeting";
import ProfileGreetingSkeleton from "@/app/ui/profile/skeletons";
import { Suspense } from "react";
import UserDeletionForm from "../ui/profile/user-deletion-form";

export default async function Page() {
	return (
		<>
			<section id="profile">
				<div className="container max-w-lg py-5 flex flex-col gap-5">
					<Suspense fallback={<ProfileGreetingSkeleton />}>
						<ProfileGreeting />
					</Suspense>

					<UserDeletionForm />
				</div>
			</section>
		</>
	);
}
