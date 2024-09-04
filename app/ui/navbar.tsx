import Link from "next/link";

export default function Navbar() {
	return (
		<div className="py-5 border-b border-gray-900 bg-gray-950 sticky">
			<div className="container">
				<nav className="font-medium text- text-orange-300">
					<ul className="nav-list flex justify-center items-center">
						<li>
							<Link href="/">Home</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
