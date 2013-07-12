/*!
* FillWindow.js 1.1
*
* Copyright 2013, Jerad Gallinger - http://jeradgallinger.ca
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Tue Jul 12 8:30:00 2013 -0500
*
* A jQuery plugin that fits an element (or elements) to the size of the document window.
*
* Credit to bv for the workaround to Mobile Safari's $( window ).height() bug:
* http://bugs.jquery.com/ticket/6724
*
*/

( function ( $ ) { 

  "use strict";

  // All CSS values in this plugin (`height`, `paddingBottom`, etc.) are unitless, which jQuery interprets as px.
  $.fn.fillWindow = function( options ) {
    var $this,
        settings,
        adjustment,
        height,
        paddingTop,
        paddingBottom,
        borderTopWidth,
        borderBottomWidth,
        borderWidth,
        outerHeight,
        newPadding,
        totalPadding,
        // Mobile Safari does not properly measure $( window ).height().
        // Checking for window.innerHeight provides a workaround.
        windowHeight = parseInt( ( window.innerHeight ? window.innerHeight : $( window ).height() ), 10 );

    settings = {
      // - `alignment`: the vertical alignment of the element's contents.
      //   alignment has possible values of null,
      //   `top` (which pushes content to the top of the element by assigning all padding to the bottom), and
      //   `bottom` (which pushes content to the bottom of the element using padding on the top)
      
      // - `offset`: the number of pixels larger or smaller than windowHeight to make the element.
      //   A negative number will make the element smaller than windowHeight by that number of pixels.
      //   A positive number will make the element larger than windowHeight by that number of pixels.
      //   (offset must be a number with no unit, or a function that returns a number with no unit)
      
      // - `borderBox`: If borderBox is `true`, fillWindow will calculate padding based on the CSS border-box box model.
      alignment: null,
      offset: 0,
      borderBox: false
    };

    if ( options ) {
      $.extend( settings, options );
    }

    // `adjustment` equals either the return value of `settings.offset` (if `settings.offset` is a function),
    // or simply `settings.offset` (if it's not a function)
    adjustment = ( $.isFunction( settings.offset ) ) ? settings.offset() : settings.offset;

    this.each( function() {
      $this = $( this );
      height = $this.height();
      paddingTop = parseInt( $this.css( 'padding-top' ), 10 );
      paddingBottom = parseInt( $this.css( 'padding-bottom' ), 10 );
      borderTopWidth = parseInt( $this.css( 'border-top-width' ), 10 );
      borderBottomWidth = parseInt( $this.css( 'border-bottom-width' ), 10 );
      borderWidth = borderTopWidth + borderBottomWidth;
      outerHeight = $this.outerHeight();

      function paddingAmount() {
        if ( settings.borderBox === true ) {
          totalPadding = windowHeight - borderWidth + adjustment;
        } else {
          totalPadding = windowHeight - height - borderWidth + adjustment;
        }
        if ( ( settings.alignment === 'top' ) || ( settings.alignment === 'bottom' ) ) {
          return Math.ceil( totalPadding );
        } else {
          return Math.ceil( ( ( totalPadding ) ) / 2 );
        }
      }

      function assignPadding( $element ) {
        // If the window is taller than the element, pad the element so that it is as tall as the window.
        // Otherwise, make the element's padding equal 0.
        newPadding = ( windowHeight > height ) ? paddingAmount() : 0;
        if ( settings.alignment === 'top' ) {
          $element.css( 'padding-bottom', newPadding );
        } else if ( settings.alignment === 'bottom' ) {
          $element.css( 'padding-top', newPadding );
        } else {
          // Rounding the padding when `totalPadding` (in `paddingAmount()`) is an odd number avoids
          // sub-pixel rendering issues due to half-pixels in `padding-top` and `padding-bottom`.
          $element.css( 'padding-top', Math.ceil( newPadding ) );
          $element.css( 'padding-bottom', Math.floor( newPadding ) );
        }
      }

      // If the element is shorter than the window, fit the element to the window;
      // OR if the element is taller than the window and has padding-top or padding-bottom,
      // remove the padding-top and -bottom from the element
      if ( ( outerHeight < windowHeight ) || ( ( outerHeight > windowHeight ) && ( ( paddingTop !== 0 ) || ( paddingBottom !== 0 ) ) ) ) {
        assignPadding( $this );
      }

    } );
    
    return this;
  }
} )( jQuery );