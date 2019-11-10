class PostController extends require("./Controller") {
	constructor() {
		this.prefix = "/auth";
		this.routes = [
			{ path: "/login", method: "post", handler: this.login },
			{ path: "/logout", method: "post", handler: this.logout }
		]
	}

	login(req, res) {

	}

	logout(req, res) {

	}
}

module.exports = new PostController();