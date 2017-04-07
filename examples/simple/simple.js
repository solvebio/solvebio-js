SolveBio.init({
    accessToken: 'ACCESS TOKEN'
});

// Try querying ClinVar for 10 records
var dataset = SolveBio.Dataset('ClinVar/Variants');
dataset.query({limit: 10})
    .then(function(response) {
        var pre = document.getElementById('clinvar');
        pre.innerHTML = '';
        pre.innerHTML += 'RCV Accession,Variant,Phenotype<br/>';
        response.results.forEach(function(row) {
            pre.innerHTML += row.rcv_accession + ',' + row.variant_sbid + ',' + row.phenotype + '<br/>';
        });
    });

// Try running Veppy (variant effect prediction)
// NOTE: Requires a valid accessToken
var expr = SolveBio.Expression('predict_variant_effects(variant)', 'object', true);
expr.evaluate({variant: 'GRCH37-7-140453136-140453136-T'})
    .then(function(response) {
        var pre = document.getElementById('effects');
        pre.innerHTML = '';
        pre.innerHTML += 'Transcript,Impact,SO Term<br />';
        response.result.forEach(function(res) {
            pre.innerHTML += res.transcript + ',' + res.impact + ',' + res.so_term + '<br />';
        });
    })
    .catch(function(response) {
        var pre = document.getElementById('effects');
        pre.innerHTML = '';
        pre.innerHTML += response.detail;
    });