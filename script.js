const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer');
const riddle = document.querySelector('.riddle');
const intro = document.querySelector('.intro');
const feedback = document.querySelector('#answer-feedback');

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursorText = document.querySelectorAll(
    'h1, h2, .code, label, .answer-caption, .quest-copy p, .eyebrow'
  );

  cursorText.forEach((element) => {
    element.classList.add('cursor-gold');
    element.addEventListener('pointermove', (event) => {
      const bounds = element.getBoundingClientRect();
      const position = ((event.clientX - bounds.left) / bounds.width) * 100;
      element.style.setProperty('--cursor-x', `${Math.max(0, Math.min(100, position))}%`);
    });
  });
}

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
