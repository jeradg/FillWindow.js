# FillWindow.js

A simple jQuery plugin to make a website section fill the browser window.

## How do I use it?

Include jQuery and FillWindow.js in your webpage. Target an element or elements with ``fillWindow()``. The elements that are shorter than the window's height will be resized to the height of the window on page load. (Elements that are already taller than the window won't be affected.)

## Making it responsive

You can easily add a basic level of responsiveness by binding fillWindow to the window's resize event:

```javascript
$( window ).resize( $( '.element' ).fillWindow() );
```

## Options

By default, ``fillWindow()`` adds equal padding to the top and bottom of the target element to fit it to the window. ``fillWindow()`` takes an optional ``options`` argument. For now the only option is ``align``, which can have a value of ``'top'`` or ``'bottom'``. If ``align`` is set to ``'top'``, all of the padding is added to the bottom of the element, which pushes content to the top of the element. ``'bottom'`` does the opposite, pushing the content to the bottom of the element.

Example usage:

```javascript
$( '.element' ).fillWindow( { align: 'bottom' } );
```
## Examples

You can see the plugin in action at http://gordoncressy.com.

## TODO
- [ ] Add option "resize" that makes element resize to fill the window on browser resize.
- [ ] Make it work on mobile devices.