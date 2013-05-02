/*!
* FillWindow.js 1.0
*
* Copyright 2013, Jerad Gallinger - http://jeradgallinger.ca
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Wed May 01 8:00:00 2013 -0500
*
* A jQuery plugin that fits an element (or elements) to the size of the document window.
* Takes an optional parameter align, which can be a value of 'top' or 'bottom'.
* If align === 'top', fillWindow assigns padding only to the bottom of the element.
* If align === 'bottom', fillWindow assigns padding only to the top of the element.
* By default, fillWindow assigns equal padding to the top and bottom of the element.
*
* Credit to bv for the workaround to Mobile Safari's $( window ).height() bug:
* http://bugs.jquery.com/ticket/6724
*
*/

( function ( $ ) { 
  
  "use strict";

  $.fn.fillWindow = function( options ) {
    var settings = {
          align: null
        },
        $this,
        height,
        newPadding,
        paddingTop,
        paddingBottom,
        thisTotalHeight,
        // Mobile Safari does not properly measure $( window ).height().
        // Checking for window.innerHeight provides a workaround.
        windowHeight = parseInt( ( window.innerHeight ? window.innerHeight : $( window ).height() ), 10 );
    
    function paddingAmount() {
      if ( ( settings.align === 'top' ) || ( settings.align === 'bottom' ) ) {
        return Math.ceil( windowHeight - height ) + 'px';
      } else {
        return Math.ceil( ( windowHeight - height ) / 2 ) + 'px';
      }
    }

    function assignPadding( $element ) {
      // If the window is taller than the element, pad the element so that it is as tall as the window.
      // Otherwise, make the element's padding equal 0.
      newPadding = ( windowHeight > height ) ? paddingAmount() : 0;
      if ( settings.align === 'top' ) {
        $element.css( 'padding-bottom', newPadding );
      } else if ( settings.align === 'bottom' ) {
        $element.css( 'padding-top', newPadding );
      } else {
        $element.css( 'padding-top', newPadding );
        $element.css( 'padding-bottom', newPadding );
      }
    }

    if ( options ) {
      $.extend( settings, options );
    }

    this.each( function() {
      $this = $( this );
      height = parseInt( $this.height(), 10 );
      paddingTop = parseInt( $this.css( 'padding-top' ), 10 );
      paddingBottom = parseInt( $this.css( 'padding-bottom' ), 10 );
      thisTotalHeight = height
                      + paddingTop
                      + paddingBottom;
      // If the element is shorter than the window, fit the element to the window;
      // OR if the element is taller than the window and has padding-top or padding-bottom,
      // remove the padding-top and -bottom from the element
      if ( ( thisTotalHeight < windowHeight ) || ( ( thisTotalHeight > windowHeight ) && ( ( paddingTop !== 0 ) || ( paddingBottom !== 0 ) ) ) ) {
        assignPadding( $this );
      }
    } );

  }
} )( jQuery );
