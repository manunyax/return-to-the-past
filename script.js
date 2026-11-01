const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer');
const riddle = document.querySelector('.riddle');
const intro = document.querySelector('.intro');

answerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (answerInput.value.trim() !== '28.03.2025') {
    answerInput.classList.remove('wrong-answer');
    void answerInput.offsetWidth;
    answerInput.classList.add('wrong-answer');
    return;
  }

  riddle.classList.add('riddle--leaving');

  window.setTimeout(() => {
    riddle.hidden = true;
    intro.hidden = false;
    requestAnimationFrame(() => intro.classList.add('intro--visible'));
  }, 450);
});
