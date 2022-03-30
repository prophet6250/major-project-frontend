const submitEvent = (ev) => {
  ev.preventDefault();

  const inputBuf = document.querySelector('.buf.input');
  const outputBuf = document.querySelector('.buf.output');

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({essay: inputBuf.value}),
  };

  /*
    DESIGN NOTE:
    I could've used form submission to send POST requests.
    I used fetch API since FormData was complicated to send as request.
    This is intentional.
  */
  fetch('http://localhost:3000/request', options)
  .then (res => res.json())
  .then(res => {
    console.log(res);

    /*
      ADD FEATURE:
      convert outputBuf to div in phase/beta, highlight different keys with
      different colors. use toggleClass() on different divs/spans.
    */
    for (let key in res) {
      if (key !== 'essay') {
        outputBuf.value += `${key.toUpperCase()}: ${res[key]}\n`;
      }
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
