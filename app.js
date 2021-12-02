const slidesArr = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.carousel_slider');
const buttons = document.querySelectorAll('.buttons div');
const dotDiv = document.querySelector('.dots');
let timeOut;

function getNextPrev() {
  const activeSlide = document.querySelector('.active');
  const activeSlideIndex = slidesArr.indexOf(activeSlide);
  let next;
  let prev;

  // Find next slide
  if (activeSlideIndex === slidesArr.length - 1) {
    next = slidesArr[0];
  } else {
    next = slidesArr[activeSlideIndex + 1];
  }

  // Find previous slide
  if (activeSlideIndex === 0) {
    prev = slidesArr[slidesArr.length - 1];
  } else {
    prev = slidesArr[activeSlideIndex - 1];
  }

  return [next, prev];
}

getNextPrev();

function getSlidePosition() {
  const activeSlide = document.querySelector('.active');
  const activeSlideIndex = slidesArr.indexOf(activeSlide);
  let [next, prev] = getNextPrev();

  slidesArr.forEach((slide, index) => {
    if (index === activeSlideIndex) {
      slide.style.transform = 'translateX(0%)';
    } else if (slide === next) {
      slide.style.transform = 'translateX(100%)';
    } else if (slide === prev) {
      slide.style.transform = 'translateX(-100%)';
    } else {
      slide.style.transform = 'translateX(100%)';
    }

    slide.addEventListener('transitionend', () => {
      slide.classList.remove('top');
    });
  });
}

getSlidePosition();

// Event Handler Next and Previous Slide
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    if (button.classList.contains('next')) getNextSlide();
    else if (button.classList.contains('prev')) getPrevSlide();
  });
});

function getNextSlide() {
  clearTimeout(timeOut);
  const activeSlide = document.querySelector('.active');
  let [next, prev] = getNextPrev();

  // If clicking too fast
  if (activeSlide.classList.contains('top')) return;

  activeSlide.style.transform = 'translateX(-100%)';
  activeSlide.classList.remove('active');
  activeSlide.classList.add('top');
  next.classList.add('top');
  next.classList.add('active');
  next.style.transform = 'translateX(0%)';

  getSlidePosition();
  activeDot();
  automaticSlide();
}

function getPrevSlide() {
  clearTimeout(timeOut);
  const activeSlide = document.querySelector('.active');
  let [next, prev] = getNextPrev();

  // If clicking too fast
  if (activeSlide.classList.contains('top')) return;

  activeSlide.style.transform = 'translateX(100%)';
  activeSlide.classList.remove('active');
  activeSlide.classList.add('top');
  prev.classList.add('top');
  prev.classList.add('active');
  prev.style.transform = 'translateX(0%)';

  getSlidePosition();
  activeDot();
  automaticSlide();
}

// Dynamically generate dots
for (let i = 0; i < slidesArr.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dotDiv.appendChild(dot);
}

// Fill the dots
function activeDot() {
  const activeSlide = document.querySelector('.active');
  const activeSlideIndex = slidesArr.indexOf(activeSlide);
  const dots = document.querySelectorAll('.dot');
  let activeDot = dots[activeSlideIndex];
  activeDot.classList.add('active-dot');

  dots.forEach((dot, index) => {
    if (index !== activeSlideIndex) {
      dot.classList.remove('active-dot');
    }
  });
}
activeDot();

// Switch slide when the dot is clicked
function clickDot() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      switchSlide(index);
    });
  });
}

function switchSlide(index) {
  clearTimeout(timeOut);
  slidesArr.forEach((slide) => {
    slide.classList.remove('active');
  });
  slidesArr[index].classList.add('active');
  getSlidePosition();
  activeDot();
  automaticSlide();
}
clickDot();

// Auto loop
function automaticSlide() {
  timeOut = setTimeout(() => {
    getNextSlide();
  }, 5000);
}
automaticSlide();
