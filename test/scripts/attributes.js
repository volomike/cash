
/**
 * attributes.
 * testing attribute getting/setting such
 * as .addClass(), .data(), .attr()
 */

describe( 'attributes', function() {



    describe( '.addClass()', function() {

        describe( 'when no argument, an integer, or falsey value', function() {

            it( 'should return a cash collection, and not change classList' , function() {

                var $fixture = $('#addClass1');
                var initial = $fixture[0].classList.toString();

                var $empty = $fixture.addClass('');
                ( $empty ).should.be.an.instanceOf(Object);
                ( $empty ).should.be.an.instanceOf($);

                var $undefined = $fixture.addClass( undefined );
                ( $undefined ).should.be.an.instanceOf(Object);
                ( $undefined ).should.be.an.instanceOf($);

                var $null = $fixture.addClass( null );
                ( $null ).should.be.an.instanceOf(Object);
                ( $null ).should.be.an.instanceOf($);

                var $integer = $fixture.addClass( 3 );
                ( $integer ).should.be.an.instanceOf(Object);
                ( $integer ).should.be.an.instanceOf($);

                var final = $fixture[0].classList.toString();

                ( final ).should.be.equal( initial );

            });

        });

        describe( 'when run on single element', function() {

            it( messages.collection , function() {

                var $fixture = $('#addClass1');
                var $add = $fixture.addClass('cashtest');
                ( $add ).should.be.an.instanceOf(Object);
                ( $add ).should.be.an.instanceOf($);

            });

            describe( 'when adding a single class', function() {

                it( 'should have the new class' , function() {

                    var $fixture = $('#addClass1').addClass('benjamin');
                    var has = $fixture.hasClass('benjamin');
                    has.should.be.true();

                });

            });

            describe( 'when adding multiple classes', function() {

                it( 'should have multiple new classes' , function() {

                    var $fixture = $('#addClass1').addClass('frank lin');
                    var has = ( $fixture.hasClass('frank') && $fixture.hasClass('lin') );
                    has.should.be.true();

                });

            });

        });

        describe( 'when run on collection of elements', function() {

            it( messages.collection , function() {

                var $fixture = $('#addClass1, #addClass2');
                var $add = $fixture.addClass('cashtest');
                ( $add ).should.be.an.instanceOf(Object);
                ( $add ).should.be.an.instanceOf($);

            });

            describe( 'when adding a single class', function() {

                it( 'whole collection should have the new class' , function() {

                    $('#addClass1, #addClass2').addClass('collection');
                    var $add1 = $('#addClass1');
                    var $add2 = $('#addClass2');
                    var has = ( $add1.hasClass('collection') && $add2.hasClass('collection') );
                    has.should.be.true();

                });

            });

            describe( 'when adding multiple classes', function() {

                it( 'whole collection should have multiple new classes' , function() {

                    $('#addClass1, #addClass2').addClass('jeffer son');
                    var $add1 = $('#addClass1');
                    var $add2 = $('#addClass2');
                    var has = (
                        ( $add1.hasClass('jeffer') && $add1.hasClass('son') ) &&
                        ( $add2.hasClass('jeffer') && $add2.hasClass('son') )
                    );
                    has.should.be.true();

                });

            });

        });

    });

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