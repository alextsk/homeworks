'use strict';

class Carousel {
  constructor(root) {
    this.elements = root.children.length;
    this.root = root;
    //hopefully all elements are alike (dimensionwise)
    this.elemWidth = root.firstElementChild.offsetWidth;
    this.elemsVisible = (root.offsetWidth / root.firstElementChild.offsetWidth) | 0;
    //wrapper on the outside, cause putting wrapper between ul and it's children feels nonsemantic
    this.outer = document.createElement('carousel');
    this.outer.style.height = root.firstElementChild.offsetHeight + 'px';
    this.outer.style.cssText =  'overflow:hidden;' +
                                'display:block;' +
                                'margin:0 auto;' +
                                'position:relative';
    //ul which we begun with - now it is inner element and it is going to slide
    this.root.style.width = '9999px';
    this.root.style.transition = 'margin-left 0.5s';
    this.offset = 0;
    this.root.parentNode.insertBefore(this.outer, this.root);
    this.outer.style.width = this.elemsVisible * root.firstElementChild.offsetWidth + 'px';
    this.outer.appendChild(this.root);

    // creating buttons from thin air, no html required
    let leftButton = document.createElement('button');
    leftButton.style.position = 'absolute';
    let rightButton = leftButton.cloneNode(true);
    leftButton.style.left = '0px';
    rightButton.style.right = '0px';
    leftButton.innerHTML = '⇦';
    rightButton.innerHTML = '⇨';
    this.outer.appendChild(leftButton);
    this.outer.appendChild(rightButton);
    leftButton.style.top = rightButton.style.top = (root.firstElementChild.offsetHeight / 2) - (leftButton.offsetHeight / 2) + 'px';
    leftButton.className = rightButton.className = 'carousel__nav-button';

    leftButton.addEventListener('click', this.onLeftButton.bind(this));
    rightButton.addEventListener('click', this.onRightButton.bind(this));
  }

  onRightButton() {
    // move right on elemsVisible or to the end of list
    var offsetRight = this.elements * this.elemWidth  - Math.abs(this.offset) - this.elemWidth * this.elemsVisible;
    if( offsetRight < this.elemsVisible * this.elemWidth)
      this._animate(-offsetRight);
    else
      this._animate(-this.elemsVisible * this.elemWidth);
  }

  onLeftButton() {
    // move left on elemsVisible or to the beginning of list
    if( this.offset + this.elemsVisible * this.elemWidth > 0 )
      this._animate(-this.offset);
    else
      this._animate(this.elemsVisible * this.elemWidth);
  }

  _animate(pixels) {
    // moves container left or right on pixels(direction set by sign)
    // for now it just changes margin-left, and relies on css transform property being set on root element
    this.offset = this.offset + pixels;
    this.root.style.marginLeft = this.offset + 'px';
  }
}

window.onload = function(){
  let elCarousel = document.getElementsByClassName('carousel')[0];
  let objCarousel = new Carousel(elCarousel);
};
