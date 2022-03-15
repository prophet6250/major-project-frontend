const MAX_SIZE = 30000; // max character limit of 30k chars (approx 8000 words)

const submitEvent = (ev)=>{
  ev.preventDefault(); // prevent default "submit" behavior
  
  const inputBuf = document.querySelector('.buf.input');
  const outputBuf = document.querySelector('.buf.output');
  
  // crude, ik. will enhance it later
  if (inputBuf.length > MAX_SIZE) {
    alert('no...');
    return;
  }

  // will modify this to actually store the input contents on disk
  localStorage.setItem('UserInput', inputBuf.value);

  inputBuf.value = '';
  outputBuf.value = localStorage.getItem('UserInput');
};

const clearEvent = (ev)=>{
  ev.preventDefault();
  
  const inputBuf = document.querySelector('.buf.input');
  const outputBuf = document.querySelector('.buf.output');
  
  inputBuf.value = '';
  outputBuf.value = '';
  
  localStorage.removeItem('UserInput');
};

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('submit-btn').addEventListener('click', submitEvent);
  document.getElementById('clear-btn').addEventListener('click', clearEvent);
});
