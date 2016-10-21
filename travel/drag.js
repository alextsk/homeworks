'use strict';


const PRECISION = 2;
var avatar, dropzone, dragObject={};

var attractions = document.querySelector('.attractions');

attractions.addEventListener('mousedown', onSelect);

function onSelect(e) {
  if (e.which !== 1) return;

  let target = e.target.closest('.attraction');
  if (!target) return;

  // запомнить переносимый объект
  dragObject.elem = target;

  // запомнить координаты, с которых начат перенос объекта
  dragObject.downX = e.pageX;
  dragObject.downY = e.pageY;


  document.addEventListener('mousemove', onMove);

  function onMove(e) {
    if (!dragObject.elem) return; // элемент не зажат

    if (!dragObject.avatar) { // элемент нажат, но пока не начали его двигать
      let offsetX = e.pageX - dragObject.downX;
      let offsetY = e.pageY - dragObject.downY;
      if (Math.abs(offsetX) < PRECISION || Math.abs(offsetY) < PRECISION) return;

      dragObject.shiftX = dragObject.downX - e.target.getBoundingClientRect().left - window.pageXOffset;
      dragObject.shiftY = dragObject.downY - e.target.getBoundingClientRect().top - window.pageYOffset;
      dragObject.avatar = dragObject.elem.cloneNode(true);//createAvatar(??)
      dragObject.avatar.style.zIndex = 9999;
      document.body.appendChild(dragObject.avatar);
    }

    if(dropzone !== isOverDropZone(e)) {
      if (dropzone){
        dropzone.style.backgroundColor = '#fff';
      }
      dropzone = isOverDropZone(e);
      if (dropzone)
        dropzone.style.backgroundColor = "#444";
      //todo call onDragEnter() or emit 'dragEnter'
    }
    //todo call onDragStart() or emit 'dragStart'
    moveAt(dragObject.avatar, e.pageX - dragObject.shiftX, e.pageY - dragObject.shiftY);
  };

  document.addEventListener('mouseup', onRelease);

  function onRelease(e) {

    if (dragObject.avatar) {
      finishDrag(e);
      dragObject.avatar.remove();
    }
    dragObject = {};
    if (dropzone) dropzone.style.backgroundColor = "#fff";
    //todo call onDragEnd() or emit 'dragEnd'
    document.removeEventListener('mousemove',onMove);
    document.removeEventListener('mouseup', onRelease);
  }

   return false; // disable selection start (cursor change)
};

function moveAt(obj, left , top){
  Object.assign(obj.style, {
    left:left + 'px',
    top:top + 'px',
    position:'absolute'
  });
}

function finishDrag(e) {
  let maybeDrop = isOverDropZone(e);
  if(maybeDrop) {
    console.log('add to dropzone', maybeDrop)
    maybeDrop.appendChild(dragObject.elem);
  } else {
    console.log('just delete');
  }
}

function isOverDropZone(e) {
  dragObject.avatar.hidden = true;
  let elem = (document.elementFromPoint(e.clientX, e.clientY));
  dragObject.avatar.hidden = false;
  if (elem == null) return null;

  return elem.closest('.dropzone');
}
