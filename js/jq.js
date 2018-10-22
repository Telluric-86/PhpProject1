;'use strict';

(function ($, undefined){

  $( ( ) => {
    $('body').css('background-color', '#cc4');
    $('#b3').prop('checked', 'true');
  });

  function switchDiv(){
    $('.test1, .test2').toggleClass('test1 test2');
  }

  function switchAttr() {
    let link = $('.back');
    if ( link.attr('href') === '/'){
       link.attr('href','http://google.com/');
       link.html('Google');
    } else {
       link.attr('href','/');
       link.html('BACK');
    };

  };

  function switchBG(event){
    //alert(JSON.stringify(arguments[0], null, 2));
    if (this.checked) {
      $('body').css('background-color', '#cc4');
    } else {
      $('body').css('background-color', '#ddd');
    };
    //event.preventDefault();
    //return false;
  };

  function testNSEvents(event) {
    $(this).trigger('click1');
  };

  function test(event) {
    alert(event.data);
  };

  function testPropagation() {
    let e = arguments[0];
    alert($(e.target).css('background-color'));
  };

  function initLive() {
    $('#block-live').load('./template/tmp1.html #tmp > *');
  };

  function testLive() {
    let url = $(this).attr('href');
    alert(url);
    $('#block-live').load( url + ' #tmp > *' );
    return false;
  };

  function animation() {
    let node = $('#block-live');
//    if (node.css('display') === 'none') {
//      node.show(500);
//    } else {
//      node.hide(500);
//    };
//    if (node.css('display') === 'none') {
//      node.slideDown(500);
//    } else {
//      node.slideUp(300);
//    };
//    if (node.css('display') === 'none') {
//      node.fadeIn(1000);
//    } else {
//      node.fadeOut(100);
//    };
    if (node.css('display') === 'none') {
      node.animate({
        'opacity':'show'
      }, 1000);
    } else {
      node.animate({
        'opacity':'hide'
      }, 100);
    };
//    node.animate({
//      'opacity': 0.5,
//      'height': '60px',
//      'width': '150px'
//    });
//    node.animate({
//      'opacity': '-=0.1',
//      'height': '+=10px'
//    });

  };

  function addJNode() {
//    let node = document.createElement('div');
//    node.className = 'new-div';
//    node.appendChild( document.createTextNode('Я Ретро-Нода!') );
    let node = $('<div>', {'class':'new-div'});
    node.text('Я нодо!');
    $('main').append(node);
  };

  function eventsWithNode() {
    let node = $('<div>',{'class':'div-wraper'});
    $('div').wrap(node);
//    $('.new-div').empty();
  };

  function getCoord() {
    let str = '';

    str = 'window size =>' + $(window).width() + '*' + $(window).height() + '\n';
    str += 'document size =>' + $(document).width() + '*' + $(document).height() + '\n';
    str += '#block-live =>' + JSON.stringify( $('#block-live').offset() ) + '\n';
    $('#block-live').offset({'top': 300, 'left': 200});
    str += '#block-live 2 =>' + JSON.stringify( $('#block-live').offset() ) + '\n';
    
    alert(str);
    console.log(str);
  };

  function submitForm() {
    let formNode = $(this);
    formNode.find('.name-error').remove();

    if (formNode.find('[name="name"]').val() === ''){
      formNode.find('[name="name"]')
              .before('<div class="name-error">Введите имя!</div>');
      return false;
    }

    $.post(
            formNode.attr('action'),
            formNode.serialize(),
            (data) => {
              $('#output').html(data);
            }
    );
    return false;
  };

  function addOption() {
    let $opNode = $('form select[name="role"]');
//    let node = document.createElement('option');
//    node.appendChild(document.createTextNode('ManageR'));
    $opNode.append('<option>Manager</option>');
    //$opNode.val('Admin');
    $opNode.find('option:eq(2)').prop('selected', true);
    //$opNode.remove('option');
    $opNode.attr('size', $('form select option').length);
    $opNode.attr('multiple', true);
  };

  function dbXHRtest(event) {
    let php = event.data;
    sendSQL(php, 'select');
  };

$('#b1').on('click', switchDiv);
$('#b2').on('click', switchAttr);
$('#b3').on('click', switchBG);
$('#b4').on('click', testNSEvents);
$('#b4').on('click1.namespace1', null, 'namespace1', test);
$('#b4').on('click1.namespace2', null, 'namespace2', test);
$('.block-cont').on('click', testPropagation);
$('#b5').on('click', initLive);
$('#block-live').on('click','a[href^=\\.]', testLive);
$('#b6').on('click', animation);
$('#b7').on('click', addJNode);
$('#b8').on('click', eventsWithNode);
$('#b9').on('click', getCoord);
$('form').on('submit', submitForm);
$('#b10').on('click', addOption);
$('#b11').on('click', null, 'jq_db.php', dbXHRtest);

})(jQuery);