
messages = {

    collection: 'should return Cash collection',
    elements: function(n) { return 'should return [ ' + n + ' ] elements'; }

};


    /**
     * before the tests run in karma we need to fill
     * the body with the correct HTML from our
     * fixture file.
     *
     * We use the html2js processor to do this.
     */

    before( function() {

        if( window.__html__ ) {

            document.body.innerHTML +=
                window.__html__['test/index.html'];

        }

    });
