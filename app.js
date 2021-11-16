const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.carousel_slider');
const buttons = document.querySelectorAll('.buttons button');

function getNextPrev() {
  const activeSlide = document.querySelector('.active');
  const activeSlideIndex = slides.indexOf(activeSlide);

  let next;
  let prev;

  // Find next slide
  if (activeSlideIndex === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeSlideIndex + 1];
  }

  // Find previous slide
  if (activeSlideIndex === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeSlideIndex - 1];
  }

  return [next, prev];
}
getNextPrev();

function getSlidePosition() {
  const activeSlide = document.querySelector('.active');
  const activeSlideIndex = slides.indexOf(activeSlide);
  let [next, prev] = getNextPrev();
}

// Event Handler Next and Previous Slide
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    if (button.classList.contains('next')) getNextSlide();
    else if (button.classList.contains('prev')) getPrevSlide();
  });
});

function getNextSlide() {
  console.log('next');
}

function getPrevSlide() {
  console.log('prev');
}
