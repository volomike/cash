
/**
 * cash object.
 * simply make sure cash exists, and properly
 * binds to "$".
 */

describe( '💰 (cash-dom)', function() {

    describe( 'cash object', function() {

        it( 'should be registered', function() {

            should.exist( window.cash );

        });

        it( 'should be bound to "$"', function() {

            ( window.$ ).should.be.equal( window.cash );

        });

    });

});
