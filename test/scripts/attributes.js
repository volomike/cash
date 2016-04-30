
/**
 * attributes.
 * testing attribute getting/setting such
 * as .addClass(), .data(), .attr()
 */

describe( 'attributes', function() {

    describe( '.addClass()', function() {

        describe( 'when an integer, or falsey value', function() {

            it( 'should not change classList' , function() {

                var $fixture = $('#addClass1');
                var initial = $fixture[0].className;

                var $empty = $fixture.addClass('');
                var $integer = $fixture.addClass( 3 );
                var $null = $fixture.addClass( null );
                var $undefined = $fixture.addClass( undefined );

                ( $empty ).should.be.an.instanceOf(Object);
                ( $empty ).should.be.an.instanceOf($);
                ( $undefined ).should.be.an.instanceOf(Object);
                ( $undefined ).should.be.an.instanceOf($);
                ( $null ).should.be.an.instanceOf(Object);
                ( $null ).should.be.an.instanceOf($);
                ( $integer ).should.be.an.instanceOf(Object);
                ( $integer ).should.be.an.instanceOf($);

                var final = $fixture[0].className;

                ( final ).should.be.equal( initial );

            });

        });

        describe( 'when adding a single class', function() {

            it( 'should have the new class' , function() {

                var $fixture1 = $('#addClass1');
                var $fixture2 = $('#addClass2');
                var $fixture3 = $('#addClass1, #addClass2');

                var $add1 = $fixture1.addClass('benjamin');
                var $add2 = $fixture3.addClass('franklin');

                ( $fixture1.hasClass('benjamin') ).should.be.true();
                ( $fixture1.hasClass('franklin') ).should.be.true();
                ( $fixture2.hasClass('franklin') ).should.be.true();

                ( $add1 ).should.be.an.instanceOf(Object);
                ( $add1 ).should.be.an.instanceOf($);
                ( $add2 ).should.be.an.instanceOf(Object);
                ( $add2 ).should.be.an.instanceOf($);

            });

        });

        describe( 'when adding multiple classes', function() {

            it( 'should have the new classes' , function() {

                var $fixture1 = $('#addClass1');
                var $fixture2 = $('#addClass2');
                var $fixture3 = $('#addClass1, #addClass2');

                var $add1 = $fixture1.addClass('cash money');
                var $add2 = $fixture3.addClass('equals rich');

                ( $fixture1.hasClass('cash') ).should.be.true();
                ( $fixture1.hasClass('money') ).should.be.true();
                ( $fixture1.hasClass('equals') ).should.be.true();
                ( $fixture1.hasClass('rich') ).should.be.true();
                ( $fixture2.hasClass('equals') ).should.be.true();
                ( $fixture2.hasClass('rich') ).should.be.true();

                ( $add1 ).should.be.an.instanceOf(Object);
                ( $add1 ).should.be.an.instanceOf($);
                ( $add2 ).should.be.an.instanceOf(Object);
                ( $add2 ).should.be.an.instanceOf($);

            });

        });

    });

    describe( '.attr()', function() {

        var $fixture = $('#attribute-fixture');
        var $attr1 = $fixture.attr();
        var $attr2 = $fixture.attr( null );
        var $attr3 = $fixture.attr( undefined );
        var $attr4 = $fixture.attr( 5 );
        var $attr5 = $fixture.attr( "" );
        var $attr6 = $fixture.attr( true );
        var $attr7 = $fixture.attr( false );

        var $hasattr = $fixture.attr( 'data-💰' );
        var $hasnotattr = $fixture.attr( 'extraordinary' );

        describe( 'when no argument passed', function() {
            it( messages.collection , function() {
                ( $attr1 ).should.be.an.instanceOf(Object);
                ( $attr1 ).should.be.an.instanceOf($);
            });
        });

        describe( 'when null', function() {
            it( messages.collection , function() {
                ( $attr2 === undefined ).should.be.true();
            });
        });

        describe( 'when undefined', function() {
            it( messages.collection , function() {
                ( $attr3 === undefined ).should.be.true();
            });
        });

        describe( 'when integer', function() {
            it( messages.collection , function() {
                ( $attr4 === undefined ).should.be.true();
            });
        });

        describe( 'when boolean', function() {
            it( messages.collection , function() {
                ( $attr6 === undefined ).should.be.true();
                ( $attr7 === undefined ).should.be.true();
            });
        });

        describe( 'when empty string', function() {
            it( messages.collection , function() {
                ( $attr5 === undefined ).should.be.true();
            });
        });

        describe( 'when provided a single string argument', function() {
            it( 'should return value when attribute exists' , function() {
                $hasattr.should.be.equal( 'cash' );
            });
            it( 'should return "undefined" when attribute doesnt exist' , function() {
                ( $hasnotattr === undefined ).should.be.true();
            });
        });

    });

    describe( '.hasClass()', function() {

        describe( 'when checking for a single class', function() {

            it( 'should return true if class is present' , function() {

                var has = $('#attribute-fixture').hasClass('attribute-class');
                has.should.be.true();

                has = $('#hasclass1, #hasclass2, #hasclass3').hasClass('z');
                has.should.be.true();

            });

            it( 'should return false if class is missing' , function() {

                var hasNot = $('#attribute-fixture').hasClass('attribute-classy');
                hasNot.should.be.false();

                hasNot = $('#hasclass1, #hasclass2, #hasclass3').hasClass('moolah');
                hasNot.should.be.false();

            });

        });

        describe( 'when checking for a multiple classes', function() {

            it( 'should return true if all classes are present' , function() {

                var has = $('#hasclass1').hasClass('x y');
                has.should.be.true();

                has = $('#hasclass1, #hasclass2, #hasclass3').hasClass('a b');
                has.should.be.true();

            });

            it( 'should return false if any classes are missing' , function() {

                var hasNot = $('#hasclass1').hasClass('y z');
                hasNot.should.be.false();

                hasNot = $('#hasclass1, #hasclass2, #hasclass3').hasClass('y z');
                hasNot.should.be.false();

            });

        });

    });

    describe( '.removeClass()', function() {

        describe( 'when an integer, or falsey value', function() {

            it( 'should not change classList' , function() {

                var $fixture = $('#removeClass1');
                var initial = $fixture[0].classList.toString();

                var $empty = $fixture.removeClass('');
                var $integer = $fixture.removeClass( 3 );
                var $null = $fixture.removeClass( null );
                var $undefined = $fixture.removeClass( undefined );

                ( $empty ).should.be.an.instanceOf(Object);
                ( $empty ).should.be.an.instanceOf($);
                ( $undefined ).should.be.an.instanceOf(Object);
                ( $undefined ).should.be.an.instanceOf($);
                ( $null ).should.be.an.instanceOf(Object);
                ( $null ).should.be.an.instanceOf($);
                ( $integer ).should.be.an.instanceOf(Object);
                ( $integer ).should.be.an.instanceOf($);

                var final = $fixture[0].classList.toString();

                ( final ).should.be.equal( initial );

            });

        });

        describe( 'when no arguments', function() {

            it( 'should remove all classes on a single element' , function() {

                var $fixture = $('#removeClass1')
                                    .clone()
                                    .attr('id','')
                                    .appendTo( $('attribute-fixture') );

                $fixture.removeClass();
                ( $fixture[0].className ).should.equal( '' );

                ( $fixture ).should.be.an.instanceOf(Object);
                ( $fixture ).should.be.an.instanceOf($);

            });

        });


        describe( 'when removing single class', function() {

            it( 'should not have the "a" or "aa" class' , function() {

                var $fixture = $('#removeClass1');
                var $fixture2 = $('#removeClass2');
                var $fixture3 = $('#removeClass1, #removeClass2');

                var $remove1 = $fixture.removeClass('a');
                var $remove2 = $fixture3.removeClass('aa');

                ( $fixture.hasClass('a') ).should.be.false();
                ( $fixture.hasClass('aa') ).should.be.false();
                ( $fixture2.hasClass('aa') ).should.be.false();

                ( $remove1 ).should.be.an.instanceOf(Object);
                ( $remove1 ).should.be.an.instanceOf($);
                ( $remove2 ).should.be.an.instanceOf(Object);
                ( $remove2 ).should.be.an.instanceOf($);

            });

        });


        describe( 'when removing multiple classes', function() {

            it( 'should not have the "b", "bb", "c" or "cc" classes', function() {

                var $fixture1 = $('#removeClass1');
                var $fixture2 = $('#removeClass2');
                var $fixture3 = $('#removeClass1, #removeClass2');

                var $remove1 = $fixture1.removeClass('b bb');
                var $remove2 = $fixture3.removeClass('c cc');

                ( $fixture1.hasClass('b') ).should.be.false();
                ( $fixture1.hasClass('bb') ).should.be.false();
                ( $fixture1.hasClass('c') ).should.be.false();
                ( $fixture1.hasClass('cc') ).should.be.false();
                ( $fixture2.hasClass('c') ).should.be.false();
                ( $fixture2.hasClass('cc') ).should.be.false();

                ( $remove1 ).should.be.an.instanceOf(Object);
                ( $remove1 ).should.be.an.instanceOf($);
                ( $remove2 ).should.be.an.instanceOf(Object);
                ( $remove2 ).should.be.an.instanceOf($);

            });

        });


    });

    describe( '.toggleClass()', function() {

        describe( 'when an integer, or falsey value', function() {

            it( 'should not change classList' , function() {

                var $fixture = $('#addClass1');
                var initial = $fixture[0].className;

                var $empty = $fixture.toggleClass('');
                var $integer = $fixture.toggleClass( 3 );
                var $null = $fixture.toggleClass( null );
                var $undefined = $fixture.toggleClass( undefined );

                ( $empty ).should.be.an.instanceOf(Object);
                ( $empty ).should.be.an.instanceOf($);
                ( $undefined ).should.be.an.instanceOf(Object);
                ( $undefined ).should.be.an.instanceOf($);
                ( $null ).should.be.an.instanceOf(Object);
                ( $null ).should.be.an.instanceOf($);
                ( $integer ).should.be.an.instanceOf(Object);
                ( $integer ).should.be.an.instanceOf($);

                var final = $fixture[0].className;

                ( final ).should.be.equal( initial );

            });

        });

        describe( 'when toggling a single class', function() {

            it( 'should add the class if it was missing' , function() {

                var $fixture1 = $('#toggleClass1');
                var $fixture2 = $('#toggleClass2');
                var $fixture3 = $('#toggleClass1, #toggleClass2');

                var $toggle1 = $fixture1.toggleClass('tinky');
                var $toggle2 = $fixture3.toggleClass('winky');

                ( $fixture1.hasClass('tinky') ).should.be.true();
                ( $fixture1.hasClass('winky') ).should.be.true();
                ( $fixture2.hasClass('winky') ).should.be.true();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

            it( 'should remove the class if it existed', function() {

                var $fixture1 = $('#toggleClass1');
                var $fixture2 = $('#toggleClass2');
                var $fixture3 = $('#toggleClass1, #toggleClass2');

                var $toggle1 = $fixture1.toggleClass('a');
                var $toggle2 = $fixture3.toggleClass('aa');

                ( $fixture1.hasClass('a') ).should.be.false();
                ( $fixture1.hasClass('aa') ).should.be.false();
                ( $fixture2.hasClass('aa') ).should.be.false();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

            it( 'should add class, and remove class' , function() {

                var $fixture1 = $('#toggleClass1');
                var $fixture2 = $('#toggleClass2');
                var $fixture3 = $('#toggleClass1, #toggleClass2');

                var $toggle = $fixture3.toggleClass('xx');

                ( $fixture1.hasClass('xx') ).should.be.false();
                ( $fixture2.hasClass('xx') ).should.be.true();

                ( $toggle ).should.be.an.instanceOf(Object);
                ( $toggle ).should.be.an.instanceOf($);

            });

            it( 'should force add classes', function() {

                var $fixture1 = $('#toggleClass1');
                var $fixture2 = $('#toggleClass2');
                var $fixture3 = $('#toggleClass1, #toggleClass2');

                var $toggle1 = $fixture1.toggleClass('force', true);
                var $toggle2 = $fixture3.toggleClass('unforce', true);

                ( $fixture1.hasClass('force') ).should.be.true();
                ( $fixture1.hasClass('unforce') ).should.be.true();
                ( $fixture2.hasClass('unforce') ).should.be.true();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

            it( 'should force remove classes', function() {

                var $fixture1 = $('#toggleClass1');
                var $fixture2 = $('#toggleClass2');
                var $fixture3 = $('#toggleClass1, #toggleClass2');

                var $toggle1 = $fixture1.toggleClass( 'force', false );
                var $toggle2 = $fixture3.toggleClass( 'unforce', false );

                ( $fixture1.hasClass('force') ).should.be.false();
                ( $fixture1.hasClass('unforce') ).should.be.false();
                ( $fixture2.hasClass('unforce') ).should.be.false();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

        });

        describe( 'when toggling multiple classes', function() {

            it( 'should add the classes if they were missing' , function() {

                var $fixture1 = $('#toggleMulti1');
                var $fixture2 = $('#toggleMulti2');
                var $fixture3 = $('#toggleMulti1, #toggleMulti2');

                var $toggle1 = $fixture1.toggleClass('fluffy wuffy');
                var $toggle2 = $fixture3.toggleClass('green blue');

                ( $fixture1.hasClass('fluffy') ).should.be.true();
                ( $fixture1.hasClass('wuffy') ).should.be.true();
                ( $fixture1.hasClass('green') ).should.be.true();
                ( $fixture1.hasClass('blue') ).should.be.true();
                ( $fixture2.hasClass('green') ).should.be.true();
                ( $fixture2.hasClass('blue') ).should.be.true();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

            it( 'should remove the classes if they existed', function() {

                var $fixture1 = $('#toggleMulti1');
                var $fixture2 = $('#toggleMulti2');
                var $fixture3 = $('#toggleMulti1, #toggleMulti2');

                var $toggle1 = $fixture1.toggleClass('a aa');
                var $toggle2 = $fixture3.toggleClass('b bb');

                ( $fixture1.hasClass('a') ).should.be.false();
                ( $fixture1.hasClass('aa') ).should.be.false();
                ( $fixture1.hasClass('b') ).should.be.false();
                ( $fixture1.hasClass('bb') ).should.be.false();
                ( $fixture2.hasClass('b') ).should.be.false();
                ( $fixture2.hasClass('bb') ).should.be.false();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

            it( 'should force add multiple classes', function() {

                var $fixture1 = $('#toggleMulti1');
                var $fixture2 = $('#toggleMulti2');
                var $fixture3 = $('#toggleMulti1, #toggleMulti2');

                var $toggle1 = $fixture1.toggleClass('force superforce', true );
                var $toggle2 = $fixture3.toggleClass('unforce superunforce', true );

                ( $fixture1.hasClass('force') ).should.be.true();
                ( $fixture1.hasClass('superforce') ).should.be.true();
                ( $fixture1.hasClass('unforce') ).should.be.true();
                ( $fixture1.hasClass('superunforce') ).should.be.true();
                ( $fixture2.hasClass('unforce') ).should.be.true();
                ( $fixture2.hasClass('superunforce') ).should.be.true();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

            it( 'should force remove multiple classes', function() {

                var $fixture1 = $('#toggleMulti1');
                var $fixture2 = $('#toggleMulti2');
                var $fixture3 = $('#toggleMulti1, #toggleMulti2');

                var $toggle1 = $fixture1.toggleClass('force superforce', false );
                var $toggle2 = $fixture3.toggleClass('unforce superunforce cc', false );

                ( $fixture1.hasClass('force') ).should.be.false();
                ( $fixture1.hasClass('superforce') ).should.be.false();
                ( $fixture1.hasClass('unforce') ).should.be.false();
                ( $fixture1.hasClass('superunforce') ).should.be.false();
                ( $fixture1.hasClass('cc') ).should.be.false();
                ( $fixture2.hasClass('unforce') ).should.be.false();
                ( $fixture2.hasClass('superunforce') ).should.be.false();
                ( $fixture2.hasClass('cc') ).should.be.false();

                ( $toggle1 ).should.be.an.instanceOf(Object);
                ( $toggle1 ).should.be.an.instanceOf($);
                ( $toggle2 ).should.be.an.instanceOf(Object);
                ( $toggle2 ).should.be.an.instanceOf($);

            });

        });

    });

});
