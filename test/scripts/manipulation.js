
/**
 * dom manipulation.
 * tests for adding/removing dom elements,
 * moving, wrapping, inserting etc.
 */

describe( 'dom manipulation', function() {

    describe( '.remove()', function() {

        it( messages.collection , function() {

            var $remove = $('#remove-fixture').remove();
            ( $remove ).should.be.an.instanceOf(Object);
            ( $remove ).should.be.an.instanceOf($);

        });

        it( 'should have been removed from the dom', function() {

            var remove = $('#remove-fixture').length;
            ( remove ).should.be.equal( 0 );

        });

    });

});
