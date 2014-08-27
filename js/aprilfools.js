var afs = (function(afs) {

  afs.setButton = function(elementId) {
    var element = document.getElementById(elementId);
    var button = {
      handleMouseMove: function(event){
        event = event || window.event;
        current_left = this.el.offsetLeft;
        this.el.style.position = "absolute";
        this.el.style.left = current_left + 10;
      }
    };

    Object.defineProperty(button, "el", {
      value: element
    });

    window.onmousemove = button.handleMouseMove.bind(button);

    return button;
  }


  return afs
}(afs || {}));


var aprilfools = afs.setButton("choosen");
/*
As you get closer to the button move the button away

1. Grab position of the mouse
2. Find the position of the button
3. Move the button position away 10px to the right.

*/