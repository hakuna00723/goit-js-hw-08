import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const form = document.querySelector(`.feedback-form`);
const textarea = document.querySelector(`[name="message"]`);
const input = document.querySelector(`[name="email"]`);
const storage = `feedback-form-state`;

accumulateTextarea();
const formEntries = {
  [input.name]: input.value,
  [textarea.name]: textarea.value,
};
localStorage.setItem(storage, JSON.stringify(formEntries));

form.addEventListener(
  'input',
  throttle(event => {
    formEntries[input.name] = input.value;
    formEntries[textarea.name] = textarea.value;
    const stringifiedData = JSON.stringify(formEntries);
    localStorage.setItem(storage, stringifiedData);
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(formEntries);
  event.currentTarget.reset();
  localStorage.removeItem(storage);
});

function accumulateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(storage));
  if (!savedMessage) {
    return;
  }
  textarea.value = savedMessage.message;
  input.value = savedMessage.email;
}
