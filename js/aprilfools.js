var afs = (function(afs) {

  function distanceBetweenPoints(mouseX, mouseY, buttonX, buttonY) {
    var x = calculateX(mouseX, buttonX);
    var y = calculateY(mouseY, buttonY);

    return Math.round( Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) ) );
  }

  function calculateX(mX, bX) {
    if (mX < bX) {
      return bX - mX;
    } else if (mX > bX) {
      return mX - bX;
    } else if (mX == bX) {
      return 0;
    }
  }

  function calculateY(mY, bY) {
    if (mY < bY) {
      return bY - mY;
    } else if (mY > bY) {
      return mY - bY;
    } else if (mY == bY) {
      return 0;
    }
  }

  afs.setButton = function(elementId) {
    var element = document.getElementById(elementId);

    var button = {
      handleMouseMove: function(event){
        event = event || window.event;

        // get position of button
        var buttonX  = this.__el.offsetLeft;
        var buttonY  = this.__el.offsetTop;

        // get position of mouse pointer
        var mouseX = event.offsetX;
        var mouseY = event.offsetY;

        // distance between button and mouse
        var distance = distanceBetweenPoints(mouseX, mouseY, buttonX, buttonY);

        if (distance < 200) {
          this.__el.style.position = "absolute";
          this.__el.style.left  = buttonX + 25;
          this.__el.style.top   = buttonY + 25;
        }

      }
    };

    // Define the element that is going to be used to fool people.
    Object.defineProperty(button, "__el", {
      value: element
    });

    // Track movements on mousemove and bind to the button
    window.onmousemove = button.handleMouseMove.bind(button);

    return button;
  }


  return afs
}(afs || {}));


afs.setButton("choosen");

/*
As you get closer to the button move the button away

1. Grab position of the mouse
2. Find the position of the button
3. Move the button position away 10px to the right.

*/