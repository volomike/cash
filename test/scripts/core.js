
describe( '💰 (cash-dom)', function() {


    /**
     * cash object.
     * simply make sure cash exists, and properly
     * binds to "$".
     */

    describe( 'cash object', function() {

        it( 'should be registered', function() {

            should.exist( window.cash );

        });

        it( 'should be bound to "$"', function() {

            ( window.$ ).should.be.equal( window.cash );

        });

    });

});
