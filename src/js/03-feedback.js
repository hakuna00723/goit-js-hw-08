import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector(`[name="message"]`);
const input = document.querySelector(`[name="email"]`);
const storage = 'feedback-form-state';
const formEntries = {};

form.addEventListener(
  'input',
  throttle(event => {
    formEntries[event.target.name] = event.target.value;
    const stringifiedData = JSON.stringify(formEntries);
    localStorage.setItem(storage, stringifiedData);
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(storage)));
  localStorage.removeItem(storage);
});

function accumulateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(storage));
  if (savedMessage === null) {
    return;
  }
  textarea.value = savedMessage['message'] || '';
  input.value = savedMessage['email'] || '';
}
accumulateTextarea();
