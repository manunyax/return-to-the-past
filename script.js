const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer');
const riddle = document.querySelector('.riddle');
const intro = document.querySelector('.intro');
const feedback = document.querySelector('#answer-feedback');
const homeButton = document.querySelector('#home-button');

const savedStage = localStorage.getItem('greycat781-quest-stage');
const questStage = savedStage === 'welcome' ? 'welcome' : 'start';

function showStage(stage) {
  riddle.classList.remove('riddle--leaving');
  intro.classList.remove('intro--leaving');
  riddle.hidden = stage !== 'start';
  intro.hidden = stage !== 'welcome';
  homeButton.hidden = stage === 'start';

  if (stage === 'welcome') {
    intro.classList.add('intro--visible');
    intro.querySelector('.intro-message--first').hidden = true;
    const welcome = intro.querySelector('.intro-message--second');
    welcome.hidden = false;
    welcome.classList.add('message--entering');
  }
}

history.replaceState({ stage: questStage }, '', location.href);
showStage(questStage);

window.addEventListener('popstate', (event) => {
  const stage = event.state?.stage === 'welcome' ? 'welcome' : 'start';
  localStorage.setItem('greycat781-quest-stage', stage);
  showStage(stage);
});

homeButton.addEventListener('click', () => {
  localStorage.removeItem('greycat781-quest-stage');
  history.pushState({ stage: 'start' }, '', location.pathname + location.search);
  showStage('start');
});

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
  history.pushState({ stage: 'welcome' }, '', location.pathname + location.search + '#welcome');
  homeButton.hidden = false;
  answerForm.querySelector('button').disabled = true;
  riddle.classList.add('riddle--leaving');

  window.setTimeout(() => {
    riddle.hidden = true;
    intro.hidden = false;
    requestAnimationFrame(() => {
      intro.classList.add('intro--visible');
      window.setTimeout(() => {
        const firstMessage = intro.querySelector('.intro-message--first');
        const welcome = intro.querySelector('.intro-message--second');
        firstMessage.classList.add('message--leaving');
        window.setTimeout(() => {
          firstMessage.hidden = true;
          welcome.hidden = false;
          requestAnimationFrame(() => requestAnimationFrame(() => welcome.classList.add('message--entering')));
        }, 1250);
      }, 3200);
    });
  }, 450);
});
