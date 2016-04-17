
/**
 * utilities.
 * tests for utilities such as $.each, $.map,
 * $.extend, $.matches... etc
 */

describe( 'utilities', function() {

    describe( '$.each()', function() {

        it( 'should be a function' , function() {

            should.exist( $.each );
            ( $.each ).should.be.an.instanceOf(Function);

        });

        it( 'should iterate over array', function() {

            var arr = [1, 2, 3, 4, 5];
            var loops = 0;
            var total = 0;
            var keys = 0;

            $.each( arr , function( value, key ) {
                loops += 1;
                total += value;
                keys = key;
            });

            loops.should.equal( 5 );
            total.should.equal( 15 );
            keys.should.equal( 4 );

        });

        it( 'should iterate over collection', function() {

            var $arr = $('h3');
            var result = 0;
            var $el;

            $.each( $arr , function( el ) {
                result += 1;
                $el = $(el);
            });

            result.should.equal( 3 );
            ( $el ).should.be.an.instanceOf( Object );
            ( $el ).should.be.an.instanceOf( $ );
            ( result ).should.be.equal( 3 );
            ( $el.length ).should.be.equal( 1 );

        });

    });

    describe( '$( [ "array" ] ).each()', function() {

        it( 'should iterate over array', function() {

            var arr = [ 1, 2, 'x', 'y' ];
            var result = 0;
            var total = 0;

            $(arr).each( function( val ) {
                result += 1;
                total += '' + val;
            });

            result.should.equal( 4 );
            total.should.equal( '012xy' );

        });

    });

    describe( '$( ".element" ).each()', function() {

        it( 'should iterate over collection', function() {

            var $arr = $('h3');
            var result = 0;
            var $el;

            $arr.each( function( el ) {
                result += 1;
                $el = $(el);
            });

            result.should.equal( 3 );
            ( $el ).should.be.an.instanceOf( Object );
            ( $el ).should.be.an.instanceOf( $ );
            ( result ).should.be.equal( 3 );
            ( $el.length ).should.be.equal( 1 );

        });

    });

});
