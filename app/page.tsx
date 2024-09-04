"use client";

export default function Home() {
	return (
		<>
			<main className="container max-w-lg py-5 flex flex-col gap-5">
				{/* Contains the comment box allowing logged in users to make a post */}
				<section className="post">
					<div className="wrapper">
						<p className="italic">Post creation box goes here.</p>
					</div>
				</section>

				{/* Feed section returns posts based on their recency */}
				<section className="main-feed">
					<div className="wrapper">
						<p className="italic">Posts feed goes here.</p>
					</div>
				</section>
			</main>
		</>
	);
}
