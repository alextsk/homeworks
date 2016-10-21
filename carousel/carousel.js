'use strict';
/* *
* accepts single reference to wrapper? which contains first-level children of equal width(!sic);
* width of carousel and therefore number of visible aforementioned children are calculated
* depending on the container's width and widths of children themselves
*
* it does not have an opinion on styling, css props used in script are only used for layout
*
* */
export default class Carousel {
  constructor(root) {
    var big;
    this.elements = root.children;
    this.root = root;
    this.offset = 0;
    this.root.style.paddingLeft = 0; // daddy knows best how to style his ul's, ok google?

    try {
      this.elemWidth = this.root.firstElementChild.offsetWidth; // hopefully all elements are alike (dimensionwise)
    } catch (e) {
      throw Error('doesnt work with empty list');
    }

    this.elemsVisible = (this.root.offsetWidth / this.root.firstElementChild.offsetWidth) | 0;
    this.contentWidth =  this.elemWidth * this.elemsVisible;
    this.fullWidth = this.elements.length * this.elemWidth;
    if (this.fullWidth > this.contentWidth) 
    	big = true;

    this.root.style.width =  this.fullWidth + 'px';
    //wrapper on the outside, cause putting wrapper between ul and it's children feels nonsemantic
    this.wrapper = document.createElement('carousel');
    this.wrapper.style.height = root.firstElementChild.offsetHeight + 'px';
    this.wrapper.style.cssText =  'overflow:hidden;' +
                                  'display:block;' +
                                  'margin:0 auto;' +
                                  'position:relative;' +
                                  'width: ' + (this.elemsVisible * this.elemWidth) + 'px;';
    //ul which we begun with - now it is inner element and it is going to slide
    this.root.parentNode.insertBefore(this.wrapper, this.root);
    this.wrapper.appendChild(this.root);  // wrapping root into, well, wrapper

    //if content smaller than container do not even bother creating controls
    if (big) {
      // creating buttons from thin air, no html required
      let leftButton = document.createElement('button');
      leftButton.style.position = 'absolute';
      let rightButton = leftButton.cloneNode(true);
      leftButton.style.left = '0px';
      rightButton.style.right = '0px';
      leftButton.innerHTML = '⇦';
      rightButton.innerHTML = '⇨';
      this.wrapper.appendChild(leftButton);
      this.wrapper.appendChild(rightButton);
      leftButton.style.top = rightButton.style.top = (root.firstElementChild.offsetHeight / 2) - (leftButton.offsetHeight / 2) + 'px';
      leftButton.className = rightButton.className = 'carousel__nav-button';

      //animation hanging events
      this.moving = 0;
      this.speed = 10;
      this.root.style.transition = 'margin-left ' + this.speed * 0.1 +'s';
      leftButton.addEventListener('click', this.onLeftButton.bind(this));
      rightButton.addEventListener('click', this.onRightButton.bind(this));

      this.$controls = {$leftButton:leftButton, $rightButton: rightButton};

      this.wrapper.addEventListener('mouseenter', this.onHover.bind(this));
      this.wrapper.addEventListener('mouseleave', this.onHoverLeave.bind(this));
    }
  }

  onHover() { console.log('hovering');
    for ( let el in this.$controls) {
      this.$controls[el].style.display = 'block';
    }
  }

  onHoverLeave () {
    for ( let el in this.$controls) {
      this.$controls[el].style.display = 'none';
    }
  }

  onRightButton() {
      this._moveRight(this.elemsVisible * this.elemWidth);
  }

  onLeftButton() {
    this._moveLeft(this.elemsVisible * this.elemWidth);
  }

  onRightHover(e) {
    this.moving = setInterval(() => {
      this._moveRight(this.speed);
    }, 100);
  }

  remove () {
    this.wrapper.remove();
  }

  _moveRight(pixels){
    if( this._willOverflowRight(pixels))
      this._harbourRight();
    else {
      this._animate(-pixels);
    }
  }

  _moveLeft(pixels){
    if (this._willOverflowLeft(pixels))
      this._harbourLeft();
    else {
      this._animate(pixels);
    }
  }

  _willOverflowLeft(pixels) {
    return this.offset + pixels > 0;
  }

  _willOverflowRight(pixels){
    return Math.abs(this.offset) > this.fullWidth - this.contentWidth - pixels;
  }

  _harbourRight(){
    this._animate( -( this.fullWidth - Math.abs(this.offset) - this.contentWidth ));
  }

  _harbourLeft(){
    this._animate(-this.offset);
  }

  _animate(pixels) {
    // moves container left or right on pixels(direction set by sign)
    // for now it just changes margin-left, and relies on css transform property being set on root element
      this.offset = this.offset + pixels;
      this.root.style.marginLeft = this.offset + 'px';
  }
}
