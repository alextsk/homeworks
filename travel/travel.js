'use strict';

window.onload = function(){
  var $calendar = document.querySelector('.days');
  var $rangeForm = document.querySelector(".rangeForm");
  var carousel;
  var endDate = $rangeForm.querySelector('[name="end-date"]').value;
  var startDate = $rangeForm.querySelector('[name="start-date"]').value;

  if (startDate && endDate) {
    carousel = new Calendar($calendar, startDate, getDaysRange(startDate, endDate), 100);
  }

  $rangeForm.addEventListener('change', onFormChange, false);


  function getDaysRange(start, end){
    start = (startDate instanceof Date) ? start : new Date(start);
    end = (startDate instanceof Date) ? end : new Date(end);
    if (start > end) throw "won't create negative range";
    return (end.valueOf() - start.getTime()) /1000/60/60/24 |0 ;
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
      carousel = new Calendar($calendar, startDate, getDaysRange(startDate, endDate), 100);
    }
  }
};
