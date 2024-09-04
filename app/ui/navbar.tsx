import Link from "next/link";

export default function Navbar() {
	return (
		<div className="py-5 border-b border-gray-900 bg-gray-950 sticky">
			<div className="container">
				<nav className="font-semibold text-orange-300">
					<ul className="nav-list flex justify-center items-center gap-4">
						<li>
							<Link
								href="/"
								className="underline underline-offset-4 hover:text-purple-300"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/signup"
								className="underline underline-offset-4 hover:text-purple-300"
							>
								Sign Up
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
