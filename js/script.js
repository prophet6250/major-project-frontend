const MAX_SIZE = 30000; // approx 7k-8k words @4.5 characters per word

const submitEvent = (ev) => {
  ev.preventDefault();

  const inputBuf = document.querySelector('.buf.input');
  const outputBuf = document.querySelector('.buf.output');

  // do proper error handling here
  if (inputBuf.length > MAX_SIZE) {
    const err_msg = 'ERROR: input size too big! Clear the buffer and enter a smaller text';

    console.error(err_msg);
    alert(err_msg);
    return;
  }

  fetch('http://localhost:3000/request', {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({essay: inputBuf.value}),
  })
  .then(response => response.json())
  .then(response => {
    let output = '';
    for (let key in response) {
      console.log(response[key]);
    }
  })
  .catch(err => console.error(err));
};

const clearEvent = (ev) => {
  ev.preventDefault();

  const inputBuf = document.querySelector('.buf.input');
  const outputBuf = document.querySelector('.buf.output');

  inputBuf.value = '';
  outputBuf.value = '';
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit-btn').addEventListener('click', submitEvent);
  document.getElementById('clear-btn').addEventListener('click', clearEvent);
});
