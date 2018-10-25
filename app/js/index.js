window.onload = function() {


  var people = [];

  // Getting required input fields
  var name = document.querySelector('#name');
  var surname = document.querySelector('#surname');
  var email = document.querySelector('#email');

  // Getting buttons
  var send = document.querySelector('#start__submit');
  var start = document.querySelector('.top__btn');
  var newLottery = document.querySelector('.top__lottery');
  var winner = document.querySelector('.top__win');

  // Getting table
  var table = document.querySelector('#mytable');

  // Getting all error display objects
  var name_error = document.querySelector('#myname_error');
  var surname_error = document.querySelector('#surname_error');
  var email_error = document.querySelector('#email_error');

  var req = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

  // Setting all event listeners
  name.addEventListener('blur', nameVerify, true);
  surname.addEventListener('blur', surnameVerify, true);
  email.addEventListener('blur', emailVerify, true);
  // Add new person to table
  send.addEventListener('click', addNewItem);
  // Edit on click
  table.addEventListener('click', edit);
  // Choose winner
  start.addEventListener('click', chooseWinner);
  // Undisabled button to start new lottery
  newLottery.addEventListener('click', newLot);

  // Constructor
  function Person(name, surname, email, phone) {
    this.name = name.value;
    this.surname = surname.value;
    this.email = email.value;
    this.phone = phone.value;
  }

  // Add new person
  function addNewPerson(name, surname, email, phone) {
    var p = new Person(name, surname, email, phone);
    people.push(p)
  }

  // List people
  function listPeople() {
    var html = "";
    for (let i in people) {
      var item = people[i];
      var name = item.name;
      var surname = item.surname;
      var email = item.email;
      var phone = item.phone;
      var text = document.querySelector('.error');
      html = `<tr>
                <td>${name}</td>
                <td>${surname}</td>
                <td>${email}</td>
                <td>${phone}</td>
              </tr>`;
    }

    document.querySelector('.table__tbody').innerHTML += html;
  }

  function addNewItem(e) {
    e.preventDefault();
    var phone = document.querySelector('#phone');

    validate()
  }

  // validation function
  function validate() {
    // name validation
    if (name.value == '') {
      name.classList.add('error');
      name_error.innerHTML = 'NAME IS REQUIRED';
      name.focus();
      return false;
    }
    // surname validation
    if (surname.value == '') {
      surname.classList.add('error');
      surname_error.innerHTML = 'SURNAME IS REQUIRED';
      surname.focus();
      return false;
    }
    // email validation
    if (email.value == '') {
      email.classList.add('error');
      email_error.innerHTML = 'EMAIL IS REQUIRED';
      email.focus();
      return false;
    }
    // email validation
    if (req.test(email.value) == false) {
      email.classList.add('error');
      email_error.innerHTML = 'Please insert valid email';
      email.focus();
      return false;
    }

    else {
      addNewPerson(name, surname, email, phone);
      listPeople();
      cleanInput();
      start.disabled = false;
      email.classList.remove('error');
      email_error.innerHTML = '';
    }
  }

  // event handler functions
  function nameVerify() {
    if (name.value != '') {
      name.classList.remove('error');
      name_error.innerHTML = '';
      return true;
    }
  }

  function surnameVerify() {
    if (surname.value != '') {
      surname.classList.remove('error');
      surname_error.innerHTML = '';
      return true;
    }
  }

  function emailVerify() {

    if (email.value != '') {
      email.classList.remove('error');
      email_error.innerHTML = '';
      return true;
    }
  }

  // Clean all inputs
  function cleanInput(){
    name.value = '';
    surname.value = '';
    email.value = '';
    phone.value = '';
  }

  // Edit on click
  function edit(event) {
    var elem = event.target.closest('td');

    if (elem) {
      createInput(elem);
      table.removeEventListener('click', edit);
    }
  }

  // Create input to edit
  function createInput(elem) {
    var input = document.createElement('input');
    input.value = elem.innerHTML;
    elem.innerHTML = '';
    elem.appendChild(input);
    input.addEventListener('keypress', saveEdit);
    input.focus();
    send.disabled = true;
    return input;
  }

  // Save data from input
  function saveEdit(event) {
    var elem = event.target.closest('input');
    var editElem = elem.parentNode;

    if (event.keyCode === 13) {
      editElem.innerHTML = elem.value;
      elem.style.display = 'none';
      table.addEventListener('click', edit);
      send.disabled = false;
    }
  }

  function chooseWinner() {
    var arr = [];
    for (let i of people) {
      arr.push(i)
    }
    let n = getRandomInt(0, arr.length);
    winner.innerHTML = `<span class="top__green">Name:</span> ${arr[n].name} <span class="top__green">Email:</span> ${arr[n].email}`;
    start.disabled = true;
    newLottery.disabled = false;
  }

  function newLot() {
    start.disabled = false;
    console.log('ddd');
    winner.innerHTML = ' ...';
  }

  // Get random number
  function getRandomInt(min, max) {
    return Math.floor((Math.random() * max) + min);
  }
}
