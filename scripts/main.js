
window.onload = function() {
    
    var COLORS = [
        '#F7CD1F',
        '#F06050',
        '#2CC185',
        '#8FD7CF',
        '#FF3577',
        '#0ACDC7',
        '#A7D773'
    ].sort( function() { return 0.5 - Math.random(); } );
        
    var examples = document.querySelectorAll( '.example' );
    var codes = document.querySelectorAll( '.code' );
    var down = document.querySelector( '.down' );
    var i, n, el, code, func, foo, bar, indent, regex, top = true;

    // Format code

    for ( i = 0, n = codes.length; i < n; i++ ) {

        code = codes[i];

        indent = /\S/.exec( code.textContent ).index;
        regex = new RegExp( '^\\s{' + indent + '}', 'gm' );

        code.innerHTML = code.textContent
            
            // comments
            .replace( /(\/\/.+)/gm, '<span class="comment">$1</span>' )
            
            // trim lines
            .replace( /\n\s+$/g, '' )
            
            // indentation
            .replace( regex, '' );
    }

    // Trigger examples

    for ( i = 0, n = examples.length; i < n; i++ ) {

        el = examples[i];

        code = el.querySelector( 'pre' );
        func = new Function( 'foo', 'bar', code.textContent );

        foo = el.querySelector( '.foo' );
        bar = el.querySelector( '.bar' );

        bar.style.backgroundColor = bar.style.color = COLORS[ i % COLORS.length ];
        func( foo, bar );
    }

    window.addEventListener( 'scroll', function() {

        var isTop = window.pageYOffset < 50;
        if ( isTop !== top ) {
            down.style.opacity = ( top = isTop ) ? 1.0 : 0.0;
        }
    });
};