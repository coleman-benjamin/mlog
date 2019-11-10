/*
    Controller

    This is to be extended when creating controllers, and it will automatically be brought into the Express router.
    When extending, you must at minimum specify a list of routes (more details below)
*/
class Controller {
	constructor() {
        /*
            Express router
         */
		this.router = require("express").Router({
			caseSensitive: true
		});

        /*
            this.routes is to be overridden in the constructor of your controller.

            It will contain an array of objects containing the following definition :

            path : string : URL path for the route
            method : string : HTTP method ("get", "post", "put", "delete")
            handler : function : method to be called for the route
            middleware : function : specify a middleware function **OPTIONAL**

            Example :
            this.routes = [
                { path : "/mypath", method : "get", handler : this.myFunction }
            ]
         */
		this.routes = [];

        /*
            Optional : set a URL prefix for the controller's routes.

            Example :
            this.prefix = "/my/prefix"

            Using the example above for this.routes, the fully URL path would be registered as : /my/prefix/mypath
         */
		this.prefix = "";
	}

    /*
        This is used when starting the application to "register" the routes defined in the extended controllers
     */
	registerRoutes(app) {
		this.routes.forEach((route) => {
			if (route.middleware) {
				this.router[route.method](route.path, route.middleware, route.handler);
			} else {
				this.router[route.method](route.path, route.handler);
			}
		});
		app.use((this.prefix ? this.prefix : "/"), this.router);
	}
}

module.exports = Controller;
