import "./style.css";
import { assertClass } from "phil-lib/misc";

// TODO stop copying and pasting this!  Move it to a shared library.
class AnimationLoop {
  constructor(private readonly onWake: (time: DOMHighResTimeStamp) => void) {
    this.callback = this.callback.bind(this);
    this.callback(performance.now());
  }
  #cancelled = false;
  cancel() {
    this.#cancelled = true;
  }
  private callback(time: DOMHighResTimeStamp) {
    if (!this.#cancelled) {
      requestAnimationFrame(this.callback);
      this.onWake(time);
    }
  }
}

/**
 * Moving the mouse will make the display spin more slowly.
 * If you move the mouse fast enough, the display will spin backwards.
 */
let recentMouseActivity = 0;

new AnimationLoop((time) => {
  {
    const angle = time / 10000 - recentMouseActivity / 1000;
    document.body.style.setProperty("--from-angle", `${angle}turn`);
  }
  {
    const angle = time / 54321;
    (
      [
        ["x", innerWidth, Math.cos(angle)],
        ["y", innerHeight, Math.sin(angle)],
      ] as const
    ).forEach(([axis, totalLength, currentRatio]) => {
      const name = "--center-" + axis;
      /**
       * * If this value is 1 then the ellipse will touch the edges of the window at four points,
       * the centers of each edge.  The entire circle is visible in the window.
       * *  If this value is Math.SQRT2 then the ellipse will touch the window at all four
       * corners.  So the entire circle will be outside of the window.
       * * 1.2 is about half way in between.  The ellipse will be visible near the corners of the
       * window, but not between the corners.
       */
      const expansion = 1.2;
      const position = ((1 + currentRatio * expansion) / 2) * totalLength;
      document.body.style.setProperty(name, `${position}px`);
    });
  }
});

document.querySelectorAll(".stanza").forEach((element, index, nodeList) => {
  // Each stanza is a little further to the right.
  const denominator = nodeList.length - 1;
  const numerator = index;
  const howFarRight = numerator / denominator;
  const div = assertClass(element, HTMLDivElement);
  // The free space is the width of the viewport (100wv)
  // less the width of the longest line (100%)
  // and the size of the margins (16px).
  // The first stanza has all of this space on the right.
  // The last stanza has all of this space on the left.
  div.style.left = `calc((100vw - 100% - 16px)*${howFarRight})`;
});

/**
 * The mouse is this many pixels to the right of the left edge of the window.
 * This was the position at the last call to the mouse handler.
 * This is valid if and only iff mouseInitialized is true.
 */
let previousX = 0;
/**
 * The mouse is this many pixels below the top edge of the window.
 * This was the position at the last call to the mouse handler.
 * This is valid if and only iff mouseInitialized is true.
 */
let previousY = 0;
/**
 * We know the position of the mouse.
 *
 * You can't just ask for the mouse position at any time.
 * You only receive that in a mouse handler.
 */
let mouseInitialized = false;
(["mousemove", "mouseenter"] as const).forEach((eventType) =>
  document.addEventListener(eventType, (event) => {
    // clientX and clientY are measured from the top left of the viewport.
    const x = event.clientX;
    const y = event.clientY;
    // I was following the mouse with the center of the special effect.
    // However, the effect looks better when it's centered just off screen.
    //document.body.style.setProperty("--center-x", `${x}px`);
    //document.body.style.setProperty("--center-y", `${y}px`);
    if (mouseInitialized) {
      // Change the rotation of the special effect.
      const distanceMoved = Math.hypot(x - previousX, y - previousY);
      recentMouseActivity += distanceMoved;
    }
    mouseInitialized = true;
    previousX = x;
    previousY = y;
  })
);
