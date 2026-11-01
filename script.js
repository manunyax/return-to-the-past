const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer');
const riddle = document.querySelector('.riddle');
const intro = document.querySelector('.intro');
const feedback = document.querySelector('#answer-feedback');

answerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const normalizedAnswer = answerInput.value.trim().replace(/\s/g, '');
  if (normalizedAnswer !== '28.03.2025') {
    feedback.textContent = 'Ответ не подошёл. Попробуйте ещё раз.';
    answerInput.classList.remove('wrong-answer');
    void answerInput.offsetWidth;
    answerInput.classList.add('wrong-answer');
    return;
  }

  feedback.textContent = '';
  answerForm.querySelector('button').disabled = true;

  riddle.classList.add('riddle--leaving');

  window.setTimeout(() => {
    riddle.hidden = true;
    intro.hidden = false;
    requestAnimationFrame(() => {
      intro.classList.add('intro--visible');
      window.setTimeout(() => {
        const firstMessage = intro.querySelector('.intro-message--first');
        const secondMessage = intro.querySelector('.intro-message--second');
        firstMessage.classList.add('message--leaving');
        window.setTimeout(() => {
          firstMessage.hidden = true;
          secondMessage.hidden = false;
          requestAnimationFrame(() => secondMessage.classList.add('message--entering'));
        }, 650);
      }, 3600);
    });
  }, 450);
});
