const button = document.querySelector('#submit')
let span = document.querySelector('#twocount')
let username = document.getElementById('name')
let liveCount = 0
let user = 'stephen'

button.addEventListener('click', () => {
  username = document.getElementById('name')
  let box = document.querySelector('.increment')
  box.style.setProperty('display', 'block')
  let heading = document.querySelector('.heading')
  heading.innerText = 'Welcome, ' + username.value
  get(`http://basic-web.dev.avc.web.usf.edu/:${username.value}`).then(function (response) {
    if (response.status == 200) {
      username = response.data.id;
      const liveCount = response.data.score;
      var counter = document.querySelector("#twocount");
      if (liveCount % 15 == 0) counter.innerHTML = "FizzBuzz";
      else if (liveCount % 3 == 0) counter.innerHTML = "Fizz";
      else if (liveCount % 5 == 0) counter.innerHTML = "Buzz";
      else counter.innerHTML = "Press increment"
    }
    else {
      post(`http://basic-web.dev.avc.web.usf.edu/:${username.value}`, { score: 0 });
      var counter = document.querySelector("#twocount");
      counter.innerHTML = 0;
    }
  });
  function get(url) {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onload = function () {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
      http.open("GET", url);
      http.send();
    });
  }

  function post(url, data) {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onload = function () {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
      http.open("POST", url);
      //Make sure that the server knows we're sending it json data.
      http.setRequestHeader("Content-Type", "application/json");
      http.send(data);
    });
  }

})

const counterBtn = document.querySelector('#counterbtn')

counterBtn.addEventListener('click', () => {
  username = document.getElementById('name').value;
  liveCount++;
  span.innerText = liveCount
  if (liveCount % 15 == 0) span.innerText = "FizzBuzz";
  else if (liveCount % 3 == 0) span.innerText = "Fizz";
  else if (liveCount % 5 == 0) span.innerText = "Buzz";
  fetch(`http://basic-web.dev.avc.web.usf.edu/:${username}`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      id: username,
      score: liveCount
    })
  })

})