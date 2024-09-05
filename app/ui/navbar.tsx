import { verifySession } from "@/lib/sessions";
import Link from "next/link";
import LogoutForm from "./logout-form";

function SignOutButton() {}

export default async function Navbar() {
	const session = await verifySession();

	const nav_links_list = [
		{ href: "/", label: "Home", visible: true },
		{ href: "/profile", label: "Profile", visible: session !== null },
		{ href: "/login", label: "Sign In", visible: session === null },
		{ href: "/signup", label: "Sign Up", visible: session === null },
	];

	return (
		<div className="py-5 border-b border-gray-900 bg-gray-950 sticky">
			<div className="container">
				<nav className="font-semibold text-orange-300">
					<ul className="nav-list flex justify-center items-center gap-4">
						{nav_links_list.map((navlink, index) => {
							if (navlink.visible) {
								return (
									<li key={index}>
										<Link
											href={navlink.href}
											className="underline underline-offset-4 hover:text-purple-300"
										>
											{navlink.label}
										</Link>
									</li>
								);
							}
						})}

						{session !== null && (
							<li key={"logout"}>
								<LogoutForm
									label="Sign Out"
									className="underline underline-offset-4 hover:text-purple-300"
								/>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</div>
	);
}
