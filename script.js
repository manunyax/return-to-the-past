const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer');
const riddle = document.querySelector('.riddle');
const intro = document.querySelector('.intro');
const feedback = document.querySelector('#answer-feedback');
const openCaseButton = document.querySelector('#open-case');
const caseScreen = document.querySelector('.case-screen');
const revealCaseAnswer = document.querySelector('#reveal-case-answer');
const caseAnswer = document.querySelector('#case-answer');

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

      // Keep the first message on screen, then finish its fade before revealing the next one.
      window.setTimeout(() => {
        const firstMessage = intro.querySelector('.intro-message--first');
        const secondMessage = intro.querySelector('.intro-message--second');
        firstMessage.classList.add('message--leaving');

        window.setTimeout(() => {
          firstMessage.hidden = true;
          secondMessage.hidden = false;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => secondMessage.classList.add('message--entering'));
          });
        }, 1250);
      }, 3200);
    });
  }, 450);
});

openCaseButton.addEventListener('click', () => {
  intro.classList.add('intro--leaving');
  window.setTimeout(() => {
    intro.hidden = true;
    caseScreen.hidden = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => caseScreen.classList.add('case-screen--visible'));
  }, 650);
});

revealCaseAnswer.addEventListener('click', () => {
  caseAnswer.hidden = false;
  revealCaseAnswer.hidden = true;
  requestAnimationFrame(() => {
    caseAnswer.classList.add('case-answer--visible');
    caseAnswer.focus();
  });
});
