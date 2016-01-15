'use strict';
window.onload = function(){
  var $calendar = document.querySelector('.days');
  var $rangeForm = document.querySelector(".rangeForm");
  var carousel;
  var endDate = $rangeForm.querySelector('[name="end-date"]').value;
  var startDate = $rangeForm.querySelector('[name="start-date"]').value;
  if (startDate && endDate) {
    carousel = createCalendar($calendar, startDate, getDaysRange(startDate, endDate), 100);
  }

  function onFormChange(e) {
    console.log(startDate && endDate);
    if (e.target.name == 'start-date') {
      startDate = new Date(e.target.value);
    } else if (e.target.name == 'end-date') {
      endDate = new Date(e.target.value);
    }
    if (startDate && endDate) {
      if (carousel) {
        carousel.remove();
      }
      carousel = createCalendar($calendar, startDate, getDaysRange(startDate, endDate), 100);
    }
  }

  $rangeForm.addEventListener('change', onFormChange, false);

  function createCalendar(parent, startDate, elemsCount, elemWidth) {
    var $carousel = createCarouselHTML(parent);
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
    return new Carousel($carousel);
  }

  function createCarouselHTML(parent){
    var $ul = document.createElement('ul');
    $ul.classList.add('carousel');
    parent.appendChild($ul);
    return $ul;
  }

  function getDaysRange(start, end){
    start = (startDate instanceof Date) ? start : new Date(start);
    end = (startDate instanceof Date) ? end : new Date(end);
    if (start > end) throw "won't create negative range";
    return (end.valueOf() - start.getTime()) /1000/60/60/24 |0 ;
  }
};
