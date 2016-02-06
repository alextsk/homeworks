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
//.......................................
  function overDropZone(x, y){
    return document.elementFromPoint(x,y).closest('.dropzone');
  }

  var dragObject, avatar, dropzone;
  var attractions = document.querySelector('.attractions');


  attractions.onmousedown = function(e) {
    if (e.which !== 1) return;

    let target = e.target.closest('.attraction');
    if (!target) return;

    // запомнить переносимый объект
    dragObject.elem = target;

    // запомнить координаты, с которых начат перенос объекта
    dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;
    avatar = dragElement.cloneNode(true);
    document.body.appendChild(avatar);
    let shiftX = e.clientX - e.target.getBoundingClientRect().left + window.pageXOffset;
    let shiftY = e.clientY - e.target.getBoundingClientRect().top + window.pageYOffset;
    moveAt(avatar, e.pageX - shiftX, e.pageY - shiftY);

    function moveAt(obj, left , top){
      Object.assign(obj.style, {
        left:left + 'px',
        top:top + 'px',
        position:'absolute'
      });
    }
    document.onmousemove = function(e) {
      let left = e.clientX;
      let top = e.clientY;

      moveAt(avatar, left - shiftX, top - shiftY);

      document.onmouseover = function (e){
        let target = overDropZone(e.clientX, e.clientY);
        if (!target  || target == dropzone  ) return;

        if (dropzone) {// clean prev dropzone hover style
          dropzone.style.backgroundColor = 'transparent';
        }

        dropzone = target;
        dropzone.style.backgroundColor = 'rgba(200,233,200,0.3)';

        dropzone.onmouseleave = function(e) {

          if (e.toElement !== avatar) {
            console.log('onmouseleave',e.relatedTarget, e.target);
            dropzone.style.backgroundColor = 'transparent';
            dropzone = null;
          }
        }
      };

    };



    document.onmouseup = function (e) {

      //console.log(dropzone, dragElement);
      if (dropzone && dragElement) {
        dropzone.appendChild(dragElement);
        dropzone.style.backgroundColor = 'transparent';
      }
      dragElement = null;
      avatar.remove();
      document.onmousemove = null;
      document.onmouseover = null;
      //console.log(document.elementFromPoint(e.clientX, e.clientY));
    }

    return false; // disable selection start (cursor change)
  }


};
