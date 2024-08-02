# Paper marbling

## Definition

Paper marbling is a method of aqueous surface design, which can produce patterns similar to smooth marble or other kinds
of stone. The patterns are the result of color floated on either plain water or a viscous solution known as size, and
then carefully transferred to an absorbent surface, such as paper or fabric. Through several centuries, people have
applied marbled materials to a variety of surfaces. It is often employed as a writing surface for calligraphy, and
especially book covers and endpapers in bookbinding and stationery.

This project is an interactive web-based simulation of ink drops spreading and interacting on a canvas. Users can create colorful, organic shapes by dragging their mouse across the screen.

## Features

- Dynamic canvas that resizes with the browser window
- Interactive ink drop creation through mouse dragging
- Unique, randomly colored drops
- Smooth animation using requestAnimationFrame
- Marble effect when drops interact with each other

## How It Works

The simulation uses HTML5 Canvas for rendering and pure JavaScript for logic. Each ink drop is represented by a `Drop` class, which manages its own shape, color, and interaction with other drops.

Key components:

1. `Drop` class: Represents individual ink drops
2. Mouse event handling: Detects drag actions to create new drops
3. Canvas resizing: Adjusts to window size changes
4. Animation loop: Continuously renders the current state of all drops

## Usage

1. Open the HTML file in a web browser
2. Click and drag your mouse across the canvas to create ink drops
3. Observe how the drops interact and merge with each other
4. Resize the browser window to see the canvas adapt

## Customization

You can easily customize various aspects of the simulation:

- Adjust the `circleDetail` constant to change the smoothness of the drop shapes
- Modify the radius calculation in `handleMouseMove` to change drop sizes
- Alter the color generation in the `Drop` constructor for different color schemes

## Dependencies

This project has no external dependencies. It uses only vanilla JavaScript and HTML5 Canvas.

## Browser Compatibility

This code should work in all modern browsers that support HTML5 Canvas and ES6 JavaScript features.

## Future Enhancements

Potential areas for expansion:

- Add touch support for mobile devices
- Implement color mixing when drops interact
- Add options for users to control drop size and color
- Optimize performance for a larger number of drops

## License

[MIT License](https://opensource.org/license/mit)

## Author

TheJuniorDeveloper

Feel free to contribute to this project by submitting pull requests or reporting issues!
