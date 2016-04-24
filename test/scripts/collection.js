
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

    describe( '.eq()', function() {

        it( messages.collection , function() {

            var $fixture = $('#fixtures section');
            var $eq = $fixture.eq(0);
            ( $eq ).should.be.an.instanceOf(Object);
            ( $eq ).should.be.an.instanceOf($);

        });

        it( '.eq(0) should return #selector-fixture', function() {

            var $fixture = $('#fixtures section');
            var $eq = $fixture.eq(0);
            ( $eq.length ).should.be.equal( 1 );
            ( $eq.is('#selector-fixture') ).should.be.true();

        });

        it( '.eq(-1) should return #last-fixture', function() {

            var $fixture = $('#fixtures section');
            var $eq = $fixture.eq(-1);
            ( $eq.length ).should.be.equal( 1 );
            ( $eq.is('#last-fixture') ).should.be.true();

        });

    });

    describe( '.filter()', function() {

        it( messages.collection , function() {

            var $fixture = $('#traversal-fixture div');
            var $filter = $fixture.filter('.deep');
            ( $filter ).should.be.an.instanceOf(Object);
            ( $filter ).should.be.an.instanceOf($);

        });

        describe( '.filter() by classname', function() {

            it( messages.elements(3), function() {

                var $fixture = $('#traversal-fixture div');
                var $filter = $fixture.filter('.deep');
                ( $filter.length ).should.be.equal( 3 );

            });

        });

        describe( '.filter() by id', function() {

            it( messages.elements(1), function() {

                var $fixture = $('#traversal-fixture div');
                var $filter = $fixture.filter('#multiple-id');
                ( $filter.length ).should.be.equal( 1 );

            });

            it( 'should have "#traversal-fixture" as an ancestor', function() {

                var $fixture = $('#traversal-fixture div');
                var $filter = $fixture.filter('#multiple-id');
                var $ancestor = $filter.closest('#traversal-fixture');
                ( $ancestor.length ).should.be.equal( 1 );

            });

        });

        describe( '.filter() by data-attr', function() {

            it( messages.elements(1), function() {

                var $fixture = $('#traversal-fixture div');
                var $filter = $fixture.filter('[data-filter]');
                ( $filter.length ).should.be.equal( 1 );

            });

        });

    });

});
