# FillWindow.js

A simple jQuery plugin to make a website section fill the browser window.

## How do I use it?

Include jQuery and FillWindow.js in your webpage. Target an element or elements with ``fillWindow()``. The elements that are shorter than the window's height will be resized to the height of the window on page load. (Elements that are already taller than the window won't be affected.)

## Making it fully responsive

To make FillWindow fully responsive to window resize events, add something like the following to your $( 'document' ).ready() function:

```javascript
$( 'document' ).ready( function() {
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

By default, ``fillWindow()`` adds equal padding to the top and bottom of the target element to fit it to the window. ``fillWindow()`` takes an optional ``options`` argument. For now the only option is ``align``, which can have a value of ``'top'`` or ``'bottom'``. If ``align`` is set to ``'top'``, all of the padding is added to the bottom of the element, which pushes content to the top of the element. ``'bottom'`` does the opposite, pushing the content to the bottom of the element.

Example usage:

```javascript
$( '.element' ).fillWindow( { align: 'bottom' } );
```
## Examples

You can see the plugin in action at http://gordoncressy.com.

## TODO
- [ ] Add option "resize". This would allow the user to bind FillWindow to the window resize event automatically, without having to write a handler themselves.
- [ x ] Make it work on mobile devices.
  - Fixed on Mobile Safari.