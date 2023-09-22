# spinning-background

An example of an animated background reacting to mouse movements.

See it running live at https://tradeideasphilip.github.io/spinning-background/.

## Thoughts so Far

I like the spinning colors effect!
It works especially well when the center is outside of the viewable area.
If I was to continue, I'd move the path completely outside of the viewable area.
I'd experiment with more complicated paths, but it's such a subtle effect, I'm not expecting much.

I should completely disconnect the mouse from the background effect.
Currently the mouse speed affects the speed and direction of the effect.
It is currently distracting and confusing.
It was even worse when the position of the center of the effect also followed the mouse.
The implementation was simple and flawless.
If I want to mix the mouse and the background effect, I see two choices.
Either I need an effect which is more subtle and less distracting, or I need an effect which is more relevant to the mouse.
It would be interesting to have something useful like mouse trails or something like that.
And save the spinning effect for something else, it worked well.

I was never completely happy with the colors.
If I made the text bigger or gave it a shadow or something, that would give me more choices.
And I'm not completely happy with some parts of the gradient, and I want to explore that.
(The line between solid color and the start of the gradient seems more obvious than I'd expect.
And something about the gradient always looks grainy.)
That said, it looks good as is.
But I'd like a lot more time to futz with it.

I like the on-resize effect.
It needs some tweaking but it's close.

I like the italic version of the [Playfair Display](https://fonts.google.com/specimen/Playfair+Display/tester?query=playfair) font.
I like using that for my <h[0-6]> tags (a.k.a headers).
The non-italic version of this font looks good, but it's just so similar to so many other fonts.

If you have a an animated effect that follows a path, consider using the [css `offset` property](https://developer.mozilla.org/en-US/docs/Web/CSS/offset).
It doesn't work with background properties, so it wouldn't help this project.
But in other cases you can completely avoid any JavaScript code.
