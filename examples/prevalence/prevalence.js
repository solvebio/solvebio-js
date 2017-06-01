SolveBio.init({
  accessToken: '<ACCESS TOKEN>'
});

// All TCGA cancer types
var CANCER_TYPES = [
  'SKCM', 'LIHC', 'UCEC', 'STAD',
  'LUAD', 'LUSC', 'BRCA', 'HNSC',
  'BLCA', 'KIRC', 'COAD', 'CESC',
  'PAAD', 'LGG', 'ESCA', 'PRAD',
  'KIRP', 'SARC', 'READ', 'THCA',
  'ACC', 'GBM', 'UCS', 'OV',
  'TGCT', 'KICH', 'PCPG', 'CHOL', 'UVM'
];

$("#form-query").submit(function(event) {
  var fields = [
    {
      'name': 'prevalence',
      'data_type': 'double',
      'expression': 'prevalence("TCGA/SomaticMutations", entity=record.entity, sample_field="patient_barcode", filters=[["cancer_abbreviation", record.cancer_type]])'
    }
  ];

  var gene = $("#form-query input[name=gene]").val();
  var records = _.map(CANCER_TYPES, function(t) {
    return {
      cancer_type: t, 
      entity: ['gene', gene]
    };
  });

  SolveBio.Annotator(fields, true)
    .annotate(records)
    .catch(function(response) {
      alert("Error: " + response.detail);
    })
    .then(function(response) {
      // console.log(response);
      var results = _.sortBy(response.results, 'prevalence');
      results.reverse();
      var x = _.map(results, 'cancer_type');
      var y = _.map(results, function(r) { return r.prevalence * 100.0; });

      Plotly.plot('form-query-output',
        [{
          x: x, 
          y: y,
          type: 'bar',
          name: gene
        }],
        {
          title: 'Prevalence of mutations in select genes across TCGA cancer types'
        }
      );
    });

  event.preventDefault();
});
