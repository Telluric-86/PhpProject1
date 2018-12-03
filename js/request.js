;'use strict';

const REQUEST_TYPES = ['insert', 'update', 'select'];

function checkInput(input) {
  let testList = document.getElementsByClassName('Input');

  if (testList.length !== 0 ) {
    alert('Присутствует класс Input вместо input');
    return false;
  };
  if (input.length === 0) {
    alert('Отсутствуют поля ввода');
    return false;
  };
  for (let i = 0; i < input.length; i++) {
    if (input[i].nodeName !== 'INPUT'){
      alert('Неверный узел поля ввода');
      return false;
    }
  };

  return true;
};

/** @param {string} className */
function filtredInput(className){
  if (className.length === 0) {
    alert('Пустое имя класса');
    return null;
  }
  className = className.toLowerCase();
      
  let uClassName = className.substr(0,1).toUpperCase() + className.substr(1),
      testList = document.getElementsByClassName(uClassName);      
  if (testList.length !== 0 ) {
    alert(`Присутствует класс ${uClassName} вместо ${className}`);
    return null;
  };
  
  let input = document.getElementsByClassName(className);
  if (input.length === 0) {
    alert('Отсутствуют поля ввода');
    return null;
  };
  for (let i = 0; i < input.length; i++) {
    if (input[i].nodeName !== 'INPUT'){
      alert('Неверный узел поля ввода');
      return null;
    }
  };

  return input;
};

function checkOutput(output) {
  let testList = document.getElementById('Output');

  if (testList) {
    alert('Присутствует класс Output вместо output');
    return false;
  };
  if (!output) {
    alert('Отсутствуют метка вывода данных');
    return false;
  };
  if (output.nodeName !== 'DIV') {
    alert('Неверный узел метки вывода данных');
    return false;
  }

  return true;
};

/** @param {string} idName */
function filtredOutput(idName){
  if (idName.length === 0) {
    alert('Пустой ID');
    return null;
  }
  idName = idName.toLowerCase();

  let uIdName = idName.substr(0,1).toUpperCase() + idName.substr(1),
      testList = document.getElementById(uIdName);
  if (testList) {
    alert(`Присутствует ID ${uIdName} вместо ${idName}`);
    return null;
  };

  let output = document.getElementById(idName);
  if (!output) {
    alert('Отсутствуют метка вывода данных');
    return null;
  };
  if (output.nodeName !== 'DIV') {
    alert('Неверный узел метки вывода данных');
    return null;
  };

  return output;
};

/** @param {Object} node */
function weightOfNode(node) {
  node.weight = 0;  
  node.children.forEach( (elem) => {
    node.weight += weightOfNode(elem);
  });
  if (node.weight === 0){
    node.weight = 1;
  }

  return node.weight;
};

/** @param {Node} output
 *  @param {Object} data  */
function drowGraph(output, data){
  try {
    weightOfNode(data);
  } catch (e) {
    alert('Ошибка входный данных!');
    return;
  };

  let cell = 50,
      canvas = document.createElement('canvas');

  

  output.innerHTML = JSON.stringify(data);
  //output.appendChild(canvas);
};

function sendData(phpfile, log = false) {
  let input = filtredInput('input'),
      output = filtredOutput('output'),
      xhr = new XMLHttpRequest(),
      data = '';

  if (!input) {
    return;
  }

  if (!output) {
    return;
  }

  input.forEach = Array.prototype.forEach;
  input.forEach( (item, i) => {
    data += `${item.name}=${encodeURIComponent(item.value)}`;
    if (i !== (item.length - 1)){
      data += '&';
    }
  });

  xhr.open('POST', phpfile, true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.onload = () => {
    if ( log ){
      output.innerHTML += xhr.responseText + '<br>';
    } else {
      output.innerHTML = xhr.responseText;
    }
  };
  xhr.onerror = () => {
    output.innerHTML = `<font color="red" size="5">${xhr.responseText}</font>`;
  };
  xhr.send(data);
};

function sendSQL(phpfile, typeSQL) {
  let input = filtredInput('input'),
      output = filtredOutput('output'),
      xhr = new XMLHttpRequest(),
      data = '';

  if  (!REQUEST_TYPES.includes(typeSQL)) {
    alert('Не известный тип запроса');
    return;
  };

  if (typeSQL !== 'select') {
    if (!input) {
      return;
    };
  };

  if (!output) {
    return;
  };

  data = `sql_type=${typeSQL}`;
  if (typeSQL !== 'select') {
    input.forEach = Array.prototype.forEach;
    input.forEach( (item) => {
      data += `&${item.name}=${encodeURIComponent(item.value)}`;
    });
  };

  xhr.open('POST', phpfile, true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.onload = () => {
    let tmpJSON = null;

    try {
      tmpJSON = JSON.parse(xhr.responseText);
    } catch (e) {
      tmpJSON = null;
      output.innerHTML = xhr.responseText;
    }

    if (tmpJSON !== null) {
      if ( output.childElementCount ) {
        output.firstChild.remove();
      }

      let node = document.createElement('table');

      node.addEventListener('click', (data) => {
        let node = data.target;
        let txt = '';
        if (node.nodeName === 'TD'){
          txt = `row => ${node.parentNode.rowIndex}; col => ${node.cellIndex}; val =>${node.textContent}`;
          alert(txt);
        };
      });

      let row = node.createTHead();
      row = row.insertRow();
      tmpJSON[0].forEach((value) => {
        row.insertCell().textContent = value;
      });
      row = node.createTBody();
      for ( let i = 1; i < tmpJSON.length; i++ ) {
        row = row.insertRow();
        tmpJSON[i].forEach((value) => {
          row.insertCell().textContent = value;
        });
        row = row.parentNode;
      };

      output.appendChild(node);

//      node = node.appendChild(document.createElement('thead'));
//      node = node.appendChild(document.createElement('tr'));
//      tmpJSON[0].forEach((value) => {
//        node.appendChild(document.createElement('td')).appendChild(document.createTextNode(value));
//      });
//
//      node = node.parentNode.parentNode;
//      node = node.appendChild(document.createElement('tbody'));
//      for ( let i = 1; i < tmpJSON.length; i++ ) {
//        node = node.appendChild(document.createElement('tr'));
//        tmpJSON[i].forEach((value) => {
//          node.appendChild(document.createElement('td')).appendChild(document.createTextNode(value));
//        });
//        node = node.parentNode;
//      }
//
//      output.appendChild(node.parentNode);
    }
  };
  xhr.onerror = () => {
    output.innerHTML = `<font color="red" size="5">${xhr.responseText}</font>`;
  };

  xhr.send(data);
};

function sendToGraph(phpfile){
  let input = filtredInput('input'),
      output = filtredOutput('output'),
      xhr = new XMLHttpRequest(),
      data = '';

  if (!input) {
    return;
  }

  if (!output) {
    return;
  }

  input.forEach = Array.prototype.forEach;
  input.forEach( (item, i) => {
    data += `${item.name}=${encodeURIComponent(item.value)}`;
    if (i !== (item.length - 1)){
      data += '&';
    }
  });

  xhr.open('POST', phpfile, true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.onload = () => {
    let tmpJSON;
    try {
      tmpJSON = JSON.parse(xhr.responseText);
    } catch (e) {
      output.innerHTML = xhr.responseText;
      return;
    }
    drowGraph(output, tmpJSON);
  };
  xhr.onerror = () => {
    output.innerHTML = `<font color="red" size="5">${xhr.responseText}</font>`;
  };
  xhr.send(data);

  alert('YEEEY!!!');
};