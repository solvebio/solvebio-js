SolveBio.init({
  accessToken: 'ACCESS TOKEN'
});

// Beacon datasets given form input
var form = $("#form-beacons");

form.submit(function(event) {
  var query = form.find('input[name=query]').val();
  var visibility = form.find('select[name=visibility] option:selected').val();
  var output = $("#form-beacons-output");
  output.html('');

  // Pass the query through the entity_ids() function which
  // will find one or more variant IDs equivalent to the query.
  // Query can be any of the following:
  // * SBID (GRCH37-17-41244429-41244429-T)
  // * VCF style (chr7-117199644-ATCT-A)
  // * Gene AA (BRAF V600E)
  // * HGVS g/c/p (NC_000017.10:g.41244429C>T)
  SolveBio.Expression('entity_ids("variant", query)', 'string', true)
    .evaluate({
      query: query
    })
    .then(function(response) {
      // NOTE: There may be multiple entity IDs returned for a variant.
      var variant = _.get(response, 'result.0');

      if (!variant) {
        output.append('Variant could not be normalized</br>');
        return;
      }

      output.append('Normalized variant IDs: </br>');
      output.append(_.get(response, 'result').join("</br>"));
      output.append('</br></br>');

      // Runs a beacon query for a single variant against all
      // available public or private datasets.
      // The variant must be a valid SolveBio ID (SBID)
      // Visibility can be "public" or "private"
      return SolveBio.Expression('beacon(variant, "variant", visibility=visibility)', 'object', false)
        .evaluate({
          variant: variant,
          visibility: visibility
        });
    })
    .then(function(response) {
      if(response) {
        var datasets = _.get(response, 'result.found');

        if(_.get(datasets, 'length')) {
          output.append("Found " + datasets.length + " beacons:</br>");
          output.append(datasets.join("</br>"));
        }
        else {
          output.append("No beacons matched the variant.");
        }
      }
    })
    .catch(function(response) {
      output.text('Error: ' + _.get(response, 'detail'));
    });

  event.preventDefault();
});
