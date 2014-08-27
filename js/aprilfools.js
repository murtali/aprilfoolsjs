var afs = (function(afs) {

  function distanceBetweenPoints(mouseX, mouseY, buttonX, buttonY) {
    var x = calculatePosition(mouseX, buttonX);
    var y = calculatePosition(mouseY, buttonY);

    return Math.round( Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) ) );
  }

  // Calculates the coordinate line to use
  // When given two x coordinates or two y, we want to build a triangle
  // and the get the shortest distance.
  function calculatePosition(mP, bP) {
    if (mP < bP) {
      return bP - mP;
    } else if (mP > bP) {
      return mP - bP;
    } else if (mP == bP) {
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

        if (distance < 300) {

          this.__el.style.position = "absolute";

          if ((mouseX < buttonX) &&  (mouseY > buttonY)) {
            if (buttonY - 25 <= 0) {

              this.__el.style.left  = buttonX + 25;
              this.__el.style.top   = 25;

            } else {

              this.__el.style.left  = buttonX + 25;
              this.__el.style.top   = buttonY - 25;
            }

          } else if ((mouseX > buttonX) &&  (mouseY > buttonY)) {

            if (buttonY - 25 <= 0) {

              this.__el.style.left  = 25;
              this.__el.style.top   = 25;

            } else if(buttonX - 25 <= 0){

              this.__el.style.left  = 25;
              this.__el.style.top   = 25;

            } else {

              this.__el.style.left  = buttonX - 25;
              this.__el.style.top   = buttonY - 25;
            }

          } else if ((mouseX < buttonX) &&  (mouseY < buttonY)) {

            this.__el.style.left  = buttonX + 25;
            this.__el.style.top   = buttonY + 25;

          } else if ((mouseX > buttonX) &&  (mouseY < buttonY)) {

            if (buttonX - 25 <= 0) {

              this.__el.style.left  = 25;
              this.__el.style.top   = buttonY + 25;

            } else {

              this.__el.style.left  = buttonX - 25;
              this.__el.style.top   = buttonY + 25;
            }

          }

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