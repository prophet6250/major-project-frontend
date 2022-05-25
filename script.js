const submitEvent = (ev) => {
  ev.preventDefault();

  const inputBuf = document.querySelector('.buf.input');
  const outputBuf = document.querySelector('.buf.output');
  const modelSelector = document.getElementById('model-selector');

  const payload = {
    essay: inputBuf.value,
    modelName: modelSelector.value,
  };

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  };

  /*
    DESIGN NOTE:
    I could've used form submission to send POST requests.
    I used fetch API since FormData was complicated to send as request.
    This is intentional.
  */
  fetch('http://localhost:3000/request', options)
  .then (response => response.json())
  .then(response => {
    let arrObj = Object.values(response);

    arrObj.sort((a, b) => {
      let { predictionstring: aVal } = a;
      const first = aVal.split(' ')[0];

      let { predictionstring: bVal } = b;
      const second = bVal.split(' ')[0];

      if (first < second) {
        return -1;
      }
      else if (first > second) {
        return 1;
      }
      else {
        return 0;
      }
    });

    for (let obj in arrObj) {
      let newSpan = document.createElement('span');

      newSpan.style['line-height'] = '1.5';
      newSpan.innerHTML = `${arrObj[obj].text_vals}\n`;
      
      switch (arrObj[obj].class) {
        case 'Claim': newSpan.classList.add('class-claim');
          break;
        case 'Evidence': newSpan.classList.add('class-evidence');
          break;
        case 'Lead': newSpan.classList.add('class-lead');
          break;
        case 'Position': newSpan.classList.add('class-position');
          break;
        case 'Concluding Statement': newSpan.classList.add('class-conclusion');
          break;
        default:
          console.log('ee kaa bawasir bana diye ho be!!! saala maatha jhanjhana jata hai!');
      }
      
      outputBuf.appendChild(newSpan);
    }
  })
  .catch(err => console.error(err));
};

const clearEvent = (ev) => {
  ev.preventDefault();

  // document.querySelector('.buf.input').value = '';
  document.querySelector('.buf.output').value = '';

};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit-btn').addEventListener('click', submitEvent);
  document.getElementById('clear-btn').addEventListener('click', clearEvent);
});
