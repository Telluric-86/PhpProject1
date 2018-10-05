;'use strict';
(function ($, undefined){

function doIt(){
  let str = $('#input').val(),
      //reg = /^(2[0-3]|1\d|\b\d):[0-5]\d$/gi,
      //reg = /#(?:[0-9a-f]{3}\b|[0-9a-f]{6}\b)/gi,
      reg = /([/*\-+^])?[/*\-+^]*(\d+)/g,
      //arr = str.match(reg),
      arr = str.replace(reg, "$1$2");

  if (!arr) {
    arr = 'null';
  }
  $('#output').append(document.createTextNode( '> ' + arr.toString()));
  $('#output').append('<br>');
}

$('#send').on('click', doIt);
$('#input').on('keyup', (e) => {
  if (e.keyCode === 13) doIt();
});
})(jQuery);