# whosie

## Setup

To run the project in development, you need the following tooling installed:

- [NodeJS](http://nodejs.org/)
- [Gulp.js](http://gulpjs.com/)
- [Bower](http://bower.io/)

Once all tools are installed, you can then run the following commands to install the relevant project dependencies:

```npm install```
```bower install```

With all dependencies in place, you can now go ahead and fire up the server by running the following command:

```gulp serve:dev```

This command will run a local Node server, and serve the application from the ```App``` and ```.tmp``` without any optimisation commands perform. This will allow you to work in development mode and test efficiently without having to wait for long compilation streams.

## Deployment

If you are deploying to a development server or to production, you should run the following command:

```gulp serve:prod```

This will run a multitude of commands and perform optimisations to your code and application structure. This will allow you to test your application in the context of how your production application will perform from a code standpoint.

I recommend running this as a command in CI system such as Codeship.
