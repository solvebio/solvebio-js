'use strict';

var SolveBio = require('./init')();

describe('Tests Annotator', function() {
    describe('Test annotate()', function() {
        var accessToken = 'fakeToken';
        var annotation,
            fields = [
                {
                    'name': 'variant_normalized',
                    'data_type': 'string',
                    'is_list': false,
                    'expression': 'entity_ids(\'variant\', record.variant)'
                }
            ],
            records = [
                {'variant': 'chr17 41244429 . C T .'},
                {'variant': 'NC_000017.10:g.41244429C>T'}
            ];

        beforeEach(function(done) {
            SolveBio.init({
                debug: true,
                accessToken: accessToken
            });

            annotation = SolveBio.Annotator(fields).annotate(records)
                .then(function(data){
                    done();
                    return data;
                });
        });

        it('Annotation URL should be /annotate', function(done) {
            annotation.then(function(data) {
                expect(data.url).toEqual('https://api.solvebio.com/v1/annotate');
                done();
            });
        });
    });
});
