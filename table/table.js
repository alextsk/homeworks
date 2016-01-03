var table = createTable(190);
document.body.appendChild(table);
table.rows[0].addEventListener('click', toggleSort);

function makeName(n)
{   var aCode = 'a'.charCodeAt(0);
    var zCode = 'z'.charCodeAt(0);
    var text = "";
    for( var i=0; i < n; i++ ) {
        text += String.fromCharCode(Math.random() * (zCode - aCode) + aCode);
      }
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function createTable(n){
  var table = document.createElement('table');
  var row;
  row = table.insertRow(0);
  row.innerHTML = '<th>' +  'name' + '</th>' +
                  '<th>' + 'last name' + '</th>' +
                  '<th>' + 'middle name' + '</th>'  +
                  '<th>' + 'age' + '</th>';

  for (var i = 0; i < n; i++) {
    row = table.insertRow(-1);
    row.innerHTML = '<td>' + makeName(6) +'</td>' +
                    '<td>' + makeName(4) + '</td>' +
                    '<td>' + makeName(8) + '</td>'  +
                    '<td>' + ((Math.random() * 90 ) | 0) + '</td>';
  }
  return table;
}

function clearAttrs(collection, attrName) {
  [].forEach.call(collection, function(el){el.removeAttribute(attrName)});
}

function toggleSort(e) {
    var rows = Array.prototype.slice.call(table.rows, 1);
    var sortedRows =  sort(rows, e.target.cellIndex);

    if (e.target.getAttribute('sorted') == 'desc') {
      sortedRows.reverse();
      clearAttrs(e.target.parentElement.children, 'sorted');
      e.target.setAttribute('sorted', 'asc');
      } else {
      clearAttrs(e.target.parentElement.children, 'sorted');
      e.target.setAttribute('sorted', 'desc');
    }
    for (var i = 0; i < sortedRows.length; i++)  {
      table.appendChild(sortedRows[i]);
    }
}

function sort(rowsArray, columnIndex) {
  var rows = table.rows;
  return rowsArray.sort(function(a, b){
      a = a.cells[columnIndex].innerText;
      b = b.cells[columnIndex].innerText;
      if (isFinite(a) && isFinite(b) )  return a - b;
      if (a < b) return 1;
      return -1;

  });
}
