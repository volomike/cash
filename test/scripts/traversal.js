

/**
 * dom traversal.
 * test for all the traversal methods
 * such as `.find(), .children(), .next()` etc.
 */

describe( 'dom traversal', function() {

    describe( '.children()', function() {

        it( messages.collection , function() {

            var $fixture = $('#traversal-fixture');
            var children = $fixture.children();
            ( children ).should.be.an.instanceOf(Object);
            ( children ).should.be.an.instanceOf($);

            var childrenfilter = $fixture.children('.first');
            ( childrenfilter ).should.be.an.instanceOf(Object);
            ( childrenfilter ).should.be.an.instanceOf($);

        });

        it( messages.elements(1), function() {

            var $fixture = $('#traversal-fixture');
            var children = $fixture.children();
            ( children.length ).should.be.equal( 5 );

            var childrenfilter = $fixture.children('.first');
            ( childrenfilter.length ).should.be.equal( 1 );

        });

    });

});
