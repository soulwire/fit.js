# Fit.js

    fit( theThing, /* into */ theOtherThing );
    
Fit.js has a very simple purpose and that is to help you fit _things_ into other _things_. The concept it probably best illustrated by the [demo page](http://soulwire.github.io/fit.js/).

#### __tl;dr__ [Here's a fiddle](http://jsfiddle.net/soulwire/s8zb1fdf/) showing how to use it.
- - -

Here are a few simple examples, that should be quite self explanatory.

Given some markup:

    <div id="foo">
        <div id="bar"></div>
    </div>

You might want to fit `bar` into `foo` whilst maintaining it's original aspect ratio

    fit( bar, foo );
    
You can control how it fits, like this

    fit( bar, foo, { cover: true } );
    
Or this

    fit( bar, foo, { hAlign: fit.RIGHT } );
    
or any combination of the options below

    fit( bar, foo, {
        
        // Alignment
        hAlign: fit.CENTER, // or fit.LEFT, fit.RIGHT
        vAlign: fit.CENTER, // or fit.TOP, fit.BOTTOM
        
        // Fit within the area or fill it all (true)
        cover: false,

        // Fit again automatically on window resize
        watch: false,
        
        // Apply computed transformations (true) or just
        // return the transformation definition (false)
        apply: true
    });

You can also pass a callback and use this to transform `bar` in whatever way you wish. The callback is passed a `transform` object that contains all the information you should need.

Here's an example of fitting text by setting the font size of `bar` such that it fills `foo`

    fit( bar, foo, function( transform ) {
        var style = window.getComputedStyle( bar );
        var size = parseFloat( style.fontSize );
        bar.style.fontSize = size * transform.scale + 'px';
    });

You can also simply use one of the built in methods of transforming DOM elements

    // Translates and scales the object (default)
    fit( bar, foo, fit.cssTransform );
    
    // uses left, top, width and height
    fit( bar, foo, fit.cssPosition );
    
    // uses margin-left, margin-top, width and height
    fit( bar, foo, fit.cssMargin );
    
But fit.js was designed to be used with any kind of rectangular object, not just DOM elements

    var area = { x: 20, y: 20, width: 400, height: 300 };
    var rect = { x: 0, y: 0, width: 100, height: 120 };
    fit( rect, area );
    
If you are using the DOM, you can tell fit to run again whenever the window resizes. To do this, simply set the `watch` option to `true`

    // This will trigger a fit each time the window resizes
    var watching = fit( bar, foo, { watch: true } );
    
    // You can stop watching at any time
    watching.off();
    
    // And start watching again
    watching.on();
    
    // And trigger a fit manually too
    watching.trigger();
    
For some visual examples, check out the [demo page](http://soulwire.github.io/fit.js/).

### Why?

Sometimes, the standard CSS properties just can't manipulate elements to fit in the way you want them to, or your fit methods need to be more dynamic, or you're not using the DOM at all and need to perform these computations more abstractly. Either way, if you've ever needed to work out how an object of any size should fit into another of any size, or find yourself writing the same code to do this over and over again, you'll understand how fit.js might be useful.

### Appendix
    
If you contribute to the script (thanks!) then generate a minified version like so (assuming you have installed [uglifyjs](http://lisperator.net/uglifyjs/)):

    uglifyjs fit.js --comments /copy/i -cmo fit.min.js
