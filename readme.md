# FillWindow.js

A simple jQuery plugin to make a website section fill the browser window.

## How do I use it?

Include jQuery and FillWindow.js in your webpage. Target an element or elements with ``fillWindow()``. The elements that are shorter than the window's height will be resized to the height of the window on page load. (Elements that are already taller than the window won't be affected.)

## Making it fully responsive

To make FillWindow fully responsive to window resize events, add something like the following to your $( document ).ready() function:

```javascript
$( document ).ready( function() {
  function resizer() {
    $( '.element' ).fillWindow();
  }

  function startResize() {
    $( window ).resize( resizer );
  }

  function endResize() {
    $( window ).off( 'resize', resizer );
  }

  startResize();
  window.setTimeout( resizer, 75 );
} );
```

startResize() binds the window resize event handler. window.setTimeout( resizer, 75 ) fires fillWindow() once the document has loaded.

(Credit to http://stackoverflow.com/a/13268437/2140241 for the resizer()/startResize() idea.)

## Options

By default, ``fillWindow()`` adds equal padding to the top and bottom of the target element to fit it to the window. ``fillWindow()`` takes an optional ``options`` object, which can include the following items:

``alignment``: the vertical alignment of the element's contents. ``alignment`` has possible values of ``null``  (which assigns equal padding to the top and bottom), ``top`` (which pushes content to the top of the element by assigning all padding to the bottom), and ``bottom`` (which pushes content to the bottom of the element using padding on the top). Default: ``null``.
      
``offset``: the number of pixels larger or smaller than windowHeight to make the element. A negative number will make the element smaller than windowHeight by that number of pixels. A positive number will make the element larger than windowHeight by that number of pixels. (``offset`` must be a number with no unit, or a function that returns a number with no unit). Default: ``0``.
      
Example usage:

```javascript
$( '.element' ).fillWindow( { 
  alignment: 'bottom',
  offset: 20
} );

$( '.element2' ).fillWindow( { 
  offset: function() {
    return -( $( '#some-other-element' ).outerHeight() );
  }
} );
```

## Examples

You can see the plugin in action at http://gordoncressy.com.

## Changelog

### 1.2

- Removed borderBox option. (Turns out it was unnecessary in the first place.)

## TODO
- [ ] Add option "resize". This would allow the user to bind FillWindow to the window resize event automatically, without having to write a handler themselves.