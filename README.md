# solvebio-js
SolveBio Javascript SDK

## Usage

### Initialize SolveBio
```javascript
// Initialize SolveBio Javascript client with your API key.
SolveBio.init({
  accessToken: <YOUR API KEY>
});
```

### Retrieve a specific dataset
```javascript
var dataset = SolveBio.Dataset('ClinVar/Variants');

dataset.retrieve()
  .then(function(response) {
    console.log(response);
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
    console.log(response.results);
  });
```

### Pagination: Retrieve the list of all datasets
```javascript
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
   console.log(datasets);
 });
```

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