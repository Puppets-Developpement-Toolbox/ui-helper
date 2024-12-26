type ElementWithEntryAnimation = HTMLElement & {
  dataset: { entryAnimation: string };
};

export default function animateEntries(container: HTMLElement) {
  if (container.hasAttribute("data-entry-animation"))
    initElementAnimation(container as ElementWithEntryAnimation);

  const toAnimate: NodeListOf<ElementWithEntryAnimation> =
    container.querySelectorAll("[data-entry-animation]");
  toAnimate.forEach(initElementAnimation);
}

function initElementAnimation(element: ElementWithEntryAnimation) {
  const [inClasses, outClasses] = element.dataset.entryAnimation
    .split("|")
    .map((classesString) =>
      classesString
        .split(" ")
        .map((className) => className.trim())
        .filter((className) => !!className),
    );
  // REMOVE ATTRIBUTE to avoid reinit animation
  element.removeAttribute("data-entry-animation");

  function onEnter() {
    if (outClasses) element.classList.remove(...outClasses);
    if (inClasses) element.classList.add(...inClasses);
  }

  function onGetOut() {
    if (inClasses) element.classList.remove(...inClasses);
    if (outClasses) element.classList.add(...outClasses);
  }

  // init state
  onGetOut();
  setTimeout(() => {
    // if (isElementInViewport(element)) onEnter();

    // listen for visibility
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter();
        } else {
          onGetOut();
        }
      });
    });

    observer.observe(element);
  }, 500);
}

// function isElementInViewport(element: HTMLElement) {
//   var rect = element.getBoundingClientRect();

//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   );
// }
