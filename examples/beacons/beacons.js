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