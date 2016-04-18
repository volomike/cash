
/**
 * dom collection.
 * tests for changing dom collections
 * with methods like .add(), .filter(),
 * .first(), .get(), etc
 */

describe( 'dom collections', function() {

    describe( '.add()', function() {

        it( messages.collection , function() {

            var $fixture = $('#traversal-fixture');
            var $add = $fixture.add('.class-fixture');
            ( $add ).should.be.an.instanceOf(Object);
            ( $add ).should.be.an.instanceOf($);

        });

        it( messages.elements(4), function() {

            var $fixture = $('#traversal-fixture');
            var $add = $fixture.add('.class-fixture');
            ( $add.length ).should.be.equal( 4 );

        });

    });

});
