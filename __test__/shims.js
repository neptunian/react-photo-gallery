global.requestAnimationFrame = callback => {
  callback();
};
global.cancelAnimationFrame = () => true;
global.ResizeObserver = function ResizeObserver(callback) {
  this.disconnect = () => {};
  this.observe = () => {
    callback([
      {
        contentRect: {
          width: 1140,
        },
      },
    ]);
  };
};
