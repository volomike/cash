
describe( " 💰 (cash-dom)", function() {

    beforeEach( function() {

        if( window.__html__ ) {

            document.body.innerHTML +=
                window.__html__['test/testmocha.html'];

        }

    });


    /**
     * cash object.
     * simply make sure cash exists, and properly
     * binds to '$'.
     */

    describe( "cash object", function() {

        it( "should be registered", function() {
            should.exist( window.cash );
        });

        it( "should be bound to '$'", function() {
            ( window.$ ).should.be.equal( window.cash );
        });

    });

    describe( "identifiers", function() {

        it( "should be findable", function() {

        var id = $("#id-fixture");
            should.exist( id );
        });

        it( "should have length of 1", function() {
            var id = $("#id-fixture");
            ( id.length ).should.be.equal( 1 );
        });

    });




});
