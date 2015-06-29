Contribution Guide
===================

This document describes some points about contribution process for this project.
The project is being developed within community. Maintainer merges pull-requests, fixes critical bugs.

The maintainers of the project are:
- [Jeremie Cohen](http://github.com/jercoh)

## General notes

- In lieu of a formal styleguide, take care to maintain the existing coding style 
- Add unit tests for any new or changed functionality.
- Lint and test your code using `grunt test`.

### Building the sources for development
Use the `build:dev` task:

    grunt build:dev

And please:

### Always run `grunt test` before sending a PR
> This will also run `grunt eslint`

## Sending Pull-Requests

If you fixed or added something useful to the project, you can send pull-request. It will be reviewed by maintainer and accepted, or commented for rework, or declined. If you are new and don't know what you should do to send a PR, please see [this tutorial](https://gist.github.com/luanmuniz/da0b8d2152c4877f93c4)

Before sending you Pull Request please don't forget to check your code with `grunt test`. PR that don't pass tests will not be accept