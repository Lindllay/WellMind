const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
};

slider();

// Overlapping therapists photos //

const overlapImgs = function () {
  const therapistsImgs = document.querySelectorAll(".therapist-img");
  therapistsImgs.forEach(function (img, i) {
    img.style.transform = `translateX(${i * -2}rem)`;
  });
};
overlapImgs();

// FAQ implementation

const faq = function () {
  const faqItems = document.querySelectorAll(".faq-item");
  const faqContainer = document.querySelector(".faq-container");

  faqContainer.addEventListener("click", function (e) {
    // Close all items
    faqItems.forEach((item) => {
      if (item !== e.target.closest(".faq-item")) item.classList.remove("open"); // Delete open class from every item, except from clicked item - because after deleting it, toggle function would add it again in the next step
    });
    // Open clicked item
    const faqParent = e.target.closest(".faq-item");
    faqParent.classList.toggle("open");
    // Close opened item
  });
};

faq();

// Sticky nav implementation

const body = document.querySelector("body");
const hero = document.querySelector(".section-hero");
const navHeight = document
  .querySelector(".header")
  .getBoundingClientRect().height;

const stickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) body.classList.add("sticky");
  if (entry.isIntersecting) body.classList.remove("sticky");
};

const heroObserver = new IntersectionObserver(stickyNav, {
  rootMargin: `-64px`,
  root: null,
  treshold: 0,
});

heroObserver.observe(hero);

// Revealing elements implementation

const allElements = document.querySelectorAll(".reveal-el");

const revealElement = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove("element-hidden");
    observer.unobserve(entry.target);
  }
};

const elementObserver = new IntersectionObserver(revealElement, {
  threshold: 0.15,
  root: null,
});

allElements.forEach((element) => {
  elementObserver.observe(element);
  element.classList.add("element-hidden");
});
