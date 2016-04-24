
/**
 * dom selection.
 * simple tests for returning the correct
 * collections when selecting by id/name/tag/attribute
 */

describe( 'dom selection', function() {

    /**
     * test for tag names and window.
     * $('h2') style collections
     */

    describe( 'tag names', function() {

        describe( 'window', function() {

            it( messages.collection , function() {

                var $tag = $(window);
                ( $tag ).should.be.an.instanceOf(Object);
                ( $tag ).should.be.an.instanceOf($);
                should( $(window)[0] ).be.equal( window );

            });

            it( messages.elements(1), function() {

                var $tag = $(window);
                ( $tag.length ).should.be.equal( 1 );

            });

        });

        describe( '<body>', function() {

            it( messages.collection , function() {

                var $tag = $('body');
                ( $tag ).should.be.an.instanceOf(Object);
                ( $tag ).should.be.an.instanceOf($);

            });

            it( messages.elements(1), function() {

                var $tag = $('body');
                ( $tag.length ).should.be.equal( 1 );

            });

        });

        describe( '<head>', function() {

            it( messages.collection , function() {

                var $tag = $('head');
                ( $tag ).should.be.an.instanceOf(Object);
                ( $tag ).should.be.an.instanceOf($);

            });

            it( messages.elements(1), function() {

                var $tag = $('head');
                ( $tag.length ).should.be.equal( 1 );

            });

        });

        describe( '<h3>', function() {

            it( messages.elements(3), function() {

                var $el = $('h3');
                ( $el.length ).should.be.equal( 3 );

            });

        });

        describe( '<u>', function() {

            it( messages.elements(0), function() {

                var $el = $('u');
                ( $el.length ).should.be.equal( 0 );

            });

        });

        describe( '<poppy>', function() {

            it( messages.elements(1), function() {

                var $el = $('poppy');
                ( $el ).should.be.an.instanceOf(Object);
                ( $el ).should.be.an.instanceOf($);
                ( $el.length ).should.be.equal( 1 );

            });

        });

        describe( '<poppycock>', function() {

            it( messages.elements(0), function() {

                var $el = $('poppycock');
                ( $el ).should.be.an.instanceOf(Object);
                ( $el ).should.be.an.instanceOf($);
                ( $el.length ).should.be.equal( 0 );

            });

        });

    });


    /**
     * test for identifiers
     * $('#myid') style collections
     */

    describe( 'identifiers', function() {

        describe( '#id-fixture', function() {

            it( messages.collection , function() {

                var id = $('#id-fixture');
                ( id ).should.be.an.instanceOf(Object);
                ( id ).should.be.an.instanceOf($);

            });

            it( messages.elements(1), function() {

                var id = $('#id-fixture');
                ( id.length ).should.be.equal( 1 );

            });

        });

        describe( '#multiple-id', function() {

            it( messages.collection , function() {

                var id = $('#multiple-id');
                ( id ).should.be.an.instanceOf(Object);
                ( id ).should.be.an.instanceOf($);

            });

            it( messages.elements(1), function() {

                var id = $('#multiple-id');
                ( id.length ).should.be.equal( 1 );

            });

            it( 'should be an "article" element', function() {

                var id = $('#multiple-id');
                ( id.is( 'article' ) ).should.be.true();

            });

        });

        describe( '#fake-fixture', function() {

            it( messages.elements(0), function() {

                var id = $('#fake-fixture');
                ( id.length ).should.be.equal( 0 );

            });

        });

    });


    /**
     * test for classes
     * $('.myclass') style collections
     */

    describe( 'classes', function() {

        describe( '.class-fixture', function() {

            it( messages.collection , function() {

                var classname = $('.class-fixture');
                ( classname ).should.be.an.instanceOf(Object);
                ( classname ).should.be.an.instanceOf($);

            });

            it( messages.elements(3), function() {

                var classname = $('.class-fixture');
                ( classname.length ).should.be.equal( 3 );

            });

        });

        describe( '.fake-class', function() {

            it( messages.elements(0), function() {

                var fakeclass = $('.fake-class');
                ( fakeclass.length ).should.be.equal( 0 );

            });

        });

    });


    /**
     * test for selecting with other methods
     * $( domEl ) style collections
     * $("[attribute]") , etc.
     */

    describe( 'other selectors', function() {

        describe( 'attribute selector', function() {

            it( messages.collection , function() {

                var typenode = $('[type]');
                ( typenode ).should.be.an.instanceOf(Object);
                ( typenode ).should.be.an.instanceOf($);
                ( typenode.length ).should.be.above( 0 );

                var typenode1 = $('[type=number]');
                ( typenode1 ).should.be.an.instanceOf(Object);
                ( typenode1 ).should.be.an.instanceOf($);
                ( typenode1.length ).should.be.equal( 1 );

                var typenode2 = $('[type="number"]');
                ( typenode2 ).should.be.an.instanceOf(Object);
                ( typenode2 ).should.be.an.instanceOf($);
                ( typenode2.length ).should.be.equal( 1 );

            });

        });

        describe( 'custom attribute selector', function() {

            it( messages.collection , function() {

                var attnode = $('[attribute]');
                ( attnode ).should.be.an.instanceOf(Object);
                ( attnode ).should.be.an.instanceOf($);

                var attnode2 = $('[attribute=functioning]');
                ( attnode2 ).should.be.an.instanceOf(Object);
                ( attnode2 ).should.be.an.instanceOf($);

            });

            it( messages.elements(1), function() {

                var attnode = $('[attribute]');
                ( attnode.length ).should.be.equal( 1 );

                var attnode2 = $('[attribute=functioning]');
                ( attnode2.length ).should.be.equal( 1 );

            });

        });

        describe( 'data selector', function() {

            it( messages.collection , function() {

                var datanode = $('[data-attribute]');
                ( datanode ).should.be.an.instanceOf(Object);
                ( datanode ).should.be.an.instanceOf($);

                var datanode2 = $('[data-attribute=data]');
                ( datanode2 ).should.be.an.instanceOf(Object);
                ( datanode2 ).should.be.an.instanceOf($);

            });

            it( messages.elements(1), function() {

                var datanode = $('[data-attribute]');
                ( datanode.length ).should.be.equal( 1 );

                var datanode2 = $('[data-attribute=data]');
                ( datanode2.length ).should.be.equal( 1 );

            });

        });

        describe( 'existing dom reference', function() {

            it( messages.collection , function() {

                var domnode = $('.class-fixture')[0];
                var cashnode = $( domnode );
                ( cashnode ).should.be.an.instanceOf(Object);
                ( cashnode ).should.be.an.instanceOf($);

            });

            it( messages.elements(1), function() {

                var domnode = $('.class-fixture')[0];
                var cashnode = $( domnode );
                ( cashnode.length ).should.be.equal( 1 );

            });

        });

    });


    /**
     * test for creating and selecting
     * a new element with a string of html like
     * $("<div></div>")
     */

    describe( 'html strings', function() {

        var newElementString =
            '<div class="string">' +
            '<span class="substring">x</span>' +
            '</div>';

        describe( 'build cash dom object', function() {

            it( 'should generate a new cash object', function() {

                var newElement = $( newElementString );
                ( newElement ).should.be.an.instanceOf(Object);
                ( newElement ).should.be.an.instanceOf($);
                ( newElement.length ).should.be.equal( 1 );

            });

        });

    });

});
