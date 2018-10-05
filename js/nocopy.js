$(function(){
  function cancel(){
    return false;
  };
  document.ondragstart = cancel;
  document.onselectstart = cancel;
  document.oncontextmenu = cancel;
  document.oncopy = cancel;
  document.onpaste = cancel;
});