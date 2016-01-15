'use strict';

class Calendar extends Carousel {
    constructor (parent, startDate, elemsCount, elemWidth) {
      var $carousel;
      var $ul = document.createElement('ul');
      $ul.classList.add('carousel');
      parent.appendChild($ul);
      $carousel = $ul;
      let cursorDate = new Date(startDate);
      for (let i = 0, $day; i < elemsCount + 1; i++) {
        $day = document.createElement('li');
        $day.style.cssText = 'width: ' + elemWidth + 'px;' +
        'float:left;' +
        'min-height:100px;';
        $day.innerHTML =  cursorDate.getDate() + '.' + (cursorDate.getMonth() + 1) + '.' + cursorDate.getFullYear();
        cursorDate.setDate(cursorDate.getDate() + 1);
        $carousel.appendChild($day);
      }

      super($carousel);

      this.$controls.$leftButton.addEventListener('mouseenter', this.onLeftHover.bind(this));
      this.$controls.$leftButton.addEventListener('mouseleave', this.onLeave.bind(this));
      this.$controls.$rightButton.addEventListener('mouseenter', this.onRightHover.bind(this));
      this.$controls.$rightButton.addEventListener('mouseleave', this.onLeave.bind(this));
    }

    onLeftHover(e) {
      this.moving = setInterval(() => {
        this._moveLeft(this.speed);
      }, 100);
    }

    onLeave(e) {
      clearInterval(this.moving);
      this._correctToIntegral()
    }

    _correctToIntegral() {
      let scrolledLeft = Math.abs(this.offset % this.elemWidth);
      if (scrolledLeft <= this.elemWidth / 2) {
        this._moveLeft(scrolledLeft);
      } else {
        this._moveRight(this.elemWidth - scrolledLeft);
      }
    }
}
