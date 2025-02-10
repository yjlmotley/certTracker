import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => {
	// <footer className="footer mt-auto py-3 text-center">
	// 	<p>
	// 		Made with <i className="fa fa-heart text-danger" /> by{" "}
	// 		<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
	// 	</p>
	// </footer>
	return (
		<footer class="bg-success bg-gradient py-4" id="footer">
			<div class="container">
				{/* <!-- Main Footer Content --> */}
				{/* <div class="row mb-4"> */}
				<div class="row">
					{/* <!-- Company Info --> */}
					<div class="col-md-3 mb-4">
						<h3 class="text-white fw-bold">Cert Tracker</h3>
						<p class="text-light">Empowering self-paced learning through better organization and tracking.</p>
					</div>

					{/* <!-- Quick Links --> */}
					<div class="col-md-3 mb-4">
						<h4 class="text-white">Quick Links</h4>
						<ul class="list-unstyled text-light">
							<li><a href="#" class="text-light text-decoration-none">Features</a></li>
							<li><a href="#" class="text-light text-decoration-none">Pricing</a></li>
							<li><a href="#" class="text-light text-decoration-none">Blog</a></li>
							<li><a href="#" class="text-light text-decoration-none">Support</a></li>
						</ul>
					</div>

					{/* <!-- Resources --> */}
					<div class="col-md-3 mb-4">
						<h4 class="text-white">Resources</h4>
						<ul class="list-unstyled text-light">
							<li><a href="#" class="text-light text-decoration-none">Documentation</a></li>
							<li><a href="#" class="text-light text-decoration-none">API Reference</a></li>
							<li><a href="#" class="text-light text-decoration-none">Community</a></li>
							<li><a href="#" class="text-light text-decoration-none">Learning Guides</a></li>
						</ul>
					</div>

					{/* <!-- Newsletter --> */}
					<div class="col-md-3 mb-4">
						<h4 class="text-white">Stay Updated</h4>
						<div class="input-group mt-3">
							<input type="email" class="form-control" placeholder="Enter your email" />
							<button class="btn btn-dark">Subscribe</button>
						</div>
						{/* <!-- Social Links --> */}
						<div class="mt-4">
							<a href="https://github.com/yjlmotley" class="text-light mx-2" target="_blank" rel="noopener noreferrer">
								<i class="bi bi-github"></i>
							</a>
							{/* <a href="#" class="text-light mx-2"><i class="bi bi-twitter"></i></a> */}
							<a href="https://www.linkedin.com/in/yjlmotley" class="text-light mx-2" target="_blank" rel="noopener noreferrer">
								<i class="bi bi-linkedin"></i>
							</a>
							<a href="mailto:yejuleemotley@gmail.com" class="text-light mx-2"><i class="bi bi-envelope"></i></a>
						</div>
					</div>
				</div>

				{/* <!-- Social Links --> */}
				{/* <div class="row mb-4">
					<div class="col text-center">
						<a href="#" class="text-light mx-2"><i class="bi bi-github"></i></a>
						<a href="#" class="text-light mx-2"><i class="bi bi-twitter"></i></a>
						<a href="#" class="text-light mx-2"><i class="bi bi-linkedin"></i></a>
						<a href="#" class="text-light mx-2"><i class="bi bi-envelope"></i></a>
					</div>
				</div> */}

				{/* <!-- Bottom Bar --> */}
				<div class="row border-top border-light pt-4">
					<div class="col-md-6 text-center text-md-start text-light">
						© 2025 Cert Tracker. All rights reserved.
					</div>
					<div class="col-md-6 text-center text-md-end">
						<a href="#" class="text-light text-decoration-none me-3">Privacy Policy</a>
						<a href="#" class="text-light text-decoration-none me-3">Terms of Service</a>
						{/* <a href="#" class="text-light text-decoration-none">Cookie Policy</a> */}
					</div>
				</div>
			</div>
		</footer>
	);
}

