
/**
 * attributes.
 * testing attribute getting/setting such
 * as .addClass(), .data(), .attr()
 */

describe( 'attributes', function() {



    describe( '.hasClass()', function() {

        describe( 'when run on single element', function() {

            describe( 'when checking for a single class', function() {

                it( 'should return true if class is present' , function() {

                    var has = $('#attribute-fixture').hasClass('attribute-class');
                    has.should.be.true();

                });

                it( 'should return false if class is missing' , function() {

                    var hasNot = $('#attribute-fixture').hasClass('attribute-classy');
                    hasNot.should.be.false();

                });

            });

            describe( 'when checking for multiple classes', function() {

                it( 'should return true when all classes present' , function() {

                    var has = $('#attribute-fixture').hasClass('soggy foggy moggy');
                    has.should.be.true();

                });

                it( 'should return false when any class is missing' , function() {

                    var hasNot = $('#attribute-fixture').hasClass('soggy foggy moggy doggy');
                    hasNot.should.be.false();

                });

            });

        });

        describe( 'when checking whole collection', function() {

            describe( 'when checking for a single class', function() {

                it( 'should return true if class is present on any element' , function() {

                    var has = $('#hasclass1, #hasclass2, #hasclass3').hasClass('z');
                    has.should.be.true();

                });

                it( 'should return false if class is missing on all elements' , function() {

                    var hasNot = $('#hasclass1, #hasclass2, #hasclass3').hasClass('pie');
                    hasNot.should.be.false();

                });

            });

            describe( 'when checking for multiple classes', function() {

                it( 'should return true when any element matches all classes' , function() {

                    var has = $('#hasclass1, #hasclass2, #hasclass3').hasClass('y z');
                    has.should.be.true();

                });

                it( 'should return false when all elements dont match all classes' , function() {

                    var hasNot = $('#hasclass1, #hasclass2, #hasclass3').hasClass('a b pie');
                    hasNot.should.be.false();

                });

            });

        });

    });

});
