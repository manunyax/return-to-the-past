const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer');
const riddle = document.querySelector('.riddle');
const intro = document.querySelector('.intro');
const feedback = document.querySelector('#answer-feedback');
const openCaseButton = document.querySelector('#open-case');
const caseScreen = document.querySelector('.case-screen');
const revealCaseAnswer = document.querySelector('#reveal-case-answer');
const caseAnswer = document.querySelector('#case-answer');
const caseAnswerForm = document.querySelector('#case-answer-form');
const caseAnswerFeedback = document.querySelector('#case-answer-feedback');
const submitCaseAnswer = document.querySelector('#submit-case-answer');
const caseSuccess = document.querySelector('.case-success');
const caseNextButton = document.querySelector('.case-next-button');
const questStage = localStorage.getItem('greycat781-quest-stage') || 'start';

function showSavedStage(stage) {
  if (stage === 'welcome') {
    riddle.hidden = true;
    intro.hidden = false;
    intro.classList.add('intro--visible');
    intro.querySelector('.intro-message--first').hidden = true;
    const welcome = intro.querySelector('.intro-message--second');
    welcome.hidden = false;
    welcome.classList.add('message--entering');
  } else if (stage === 'case') {
    riddle.hidden = true;
    intro.hidden = true;
    caseScreen.hidden = false;
    caseScreen.classList.add('case-screen--visible');
  } else if (stage === 'case02') {
    riddle.hidden = true;
    intro.hidden = true;
    caseScreen.hidden = true;
    caseSuccess.hidden = false;
    caseSuccess.classList.add('case-success--visible');
    caseNextButton.hidden = false;
    caseNextButton.classList.add('case-next-button--visible');
  }
}

showSavedStage(questStage);

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
  localStorage.setItem('greycat781-quest-stage', 'welcome');
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
  localStorage.setItem('greycat781-quest-stage', 'case');
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
  submitCaseAnswer.hidden = false;
  requestAnimationFrame(() => {
    caseAnswer.classList.add('case-answer--visible');
    caseAnswer.focus();
  });
});

caseAnswerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const answer = caseAnswer.value.trim().toLowerCase().replace(/\s+/g, '');
  if (answer !== 'nagasiren') {
    caseAnswerFeedback.textContent = 'Ответ не подошёл. Проверьте имя героя.';
    caseAnswer.classList.remove('wrong-answer');
    void caseAnswer.offsetWidth;
    caseAnswer.classList.add('wrong-answer');
    return;
  }

  localStorage.setItem('greycat781-quest-stage', 'case02');
  caseScreen.classList.add('case-screen--leaving');
  window.setTimeout(() => {
    caseScreen.hidden = true;
    caseSuccess.hidden = false;
    requestAnimationFrame(() => {
      caseSuccess.classList.add('case-success--visible');
      window.setTimeout(() => {
        caseNextButton.hidden = false;
        requestAnimationFrame(() => caseNextButton.classList.add('case-next-button--visible'));
      }, 2600);
    });
  }, 700);
});
