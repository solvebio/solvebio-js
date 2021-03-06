SolveBio.init({
  accessToken: 'ACCESS TOKEN'
});

// Query datasets given form input
$("#form-query").submit(function(event) {
  var query = $("#form-query input[name=query]").val();
  var dataset = $("#form-query select[name=dataset] option:selected").val();
  var output = $("#form-query-output");
  $("#form-query-output").text("");

  // Query can be any of the following:
  // * SBID (GRCH37-17-41244429-41244429-T)
  // * VCF style (chr7-117199644-ATCT-A)
  // * Gene AA (BRAF V600E)
  // * HGVS g/c/p (NC_000017.10:g.41244429C>T)
  SolveBio.Expression('entity_ids("variant", query)', 'string', true)
    .evaluate({
      query: query
    })
    .catch(function(response) {
      output.text("Error: " + response.detail);
    })
    .then(function(response) {
      // NOTE: There may be multiple entity IDs returned for a variant.
      var variant = response.result[0];
      if (!variant) {
        output.text("Variant could not be normalized");
        return;
      }

      output.append("Normalized variant IDs: \n");
      output.append(response.result.join("\n"));
      output.append("\n\n");

      SolveBio.Expression('dataset_query(dataset, entities=[["variant", variant]], fields=fields)', 'object', true)
        .evaluate({
          variant: variant,
          dataset: dataset,
          // Optionally restrict output to a set of fields by passing a list of
          // field names to the "fields" parameter.
          fields: null
        })
        .catch(function(response) {
          window.alert("Query error: " + response.detail);
        })
        .then(function(response) {
          var records = response.result;
          if (records.length > 0) {
            records.map(function(r) {
              output.append(JSON.stringify(r) + "\n");
            });
          }
          else {
            output.append("No records were found for the variant.");
          }
        });
    });

  event.preventDefault();
});
