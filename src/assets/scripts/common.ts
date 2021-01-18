import fastclick from 'fastclick';

// @ts-ignore
fastclick.attach(document.body);

document.documentElement.addEventListener(
  'touchmove',
  (event: TouchEvent): void => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  false
);
