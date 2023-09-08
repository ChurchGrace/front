export const scaleBlockAnimation = {
  hidden: {
    scale: 0.5,
  },
  visible: () => ({
    scale: 1,
  }),
};

export const opacityAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: () => ({
    opacity: 1,
    transition: {
      duration: 1,
    },
  }),
};

export const textLeftAnimation = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: () => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  }),
};

export const textRightAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: () => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  }),
};
