[![Build Status](https://travis-ci.org/solvebio/solvebio-js.svg?branch=master)](http://travis-ci.org/solvebio/solvebio-js)

# solvebio-js

SolveBio Javascript SDK

## Features
* Full SolveBio Api binding
* Works in NodeJS and in the browser
* Support of promises
* Uses Angular, jQuery, Q or native promises if available
* Special build `solvebio-promises.js` includes [BlueBird](https://github.com/petkaantonov/bluebird) promises API
* Support [pagination](#retrieve-a-list-of-paged-results)

## Usage

### Install
#### npm
    npm install solvebio
Then `require('solvebio')` in your code.

#### bower
    bower install solvebio
Then add a `<script>` to your `index.html`:

```html
<!-- If you already have a promise library loaded, just include solvebio.js -->
<script src="/bower_components/solvebio/dist/solvebio.js"></script>

<!-- If you don't include solvebio-promises.js. This version is bundled with the BlueBird promise library. -->
<script src="/bower_components/solvebio/dist/solvebio-promises.js"></script>
```

### Initialize SolveBio
Initialize SolveBio Javascript client with your Oauth token.
Please contact us at [support@solvebio.com](mailto:support@solvebio.com?subject=[Oauth token request]) to get your Oauth token.
```javascript
var SolveBio = require('solvebio');

SolveBio.init({
  accessToken: <YOUR OAUTH TOKEN>
});
```

### Retrieve a specific dataset
```javascript
var dataset = SolveBio.Dataset('ClinVar/Variants');

dataset.retrieve()
  .then(function(response) {
    // Your code goes here...
  });
```

### Create filters
```javascript
var filter1 = SolveBio.Filter({
    gene_symbol: 'BRCA1'
  }), 
  filter2 = SolveBio.Filter({
    gene_symbol: 'BRCA2'
  });
  
var filter = filter1.or(filter2);
```
  
### Apply Filters and Retrieve query results
```javascript
dataset.filter(filter)
  .then(function(response) {
    // Your code goes here...
  });
```

### Retrieve a list of paged results
```javascript
var Promise = require('es6-promise').Promise;

function loadAll(promise) {
  var deferred = Promise.defer(),
    data = [];
    
  load(promise);
  
  return deferred.promise;
  
  function load(promise) {
    promise
      .then(function(response) {
        data = data.concat(response.data);
        if(response.next) {
          load(response.next());
        }
        else {
          deferred.resolve(data);
        }
      });
  }
}

loadAll(SolveBio.Dataset().all())
 .then(function(datasets) {
   // Your code goes here...
 });
```

## Example

An HTML example is provided at `examples/simple.html`. You can try
it by cloning the repository and opening the file in your browser.


## Developing

### Building from sources
First install Node/NPM then do this:

    sudo npm install -g grunt-cli

Then:

    npm install
    grunt build

### Contributing to solvebio-js
Use the `build:dev` task:

    npm install
    grunt build:dev
