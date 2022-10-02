export const amOrPmTime = (time) => {
  return parseInt(time) < 12 ? "a.m" : "p.m";
};

export const valuetext = (value) => {
  return `${value}`;
};

export const getRandomId = () => {
  return new Date().getTime();
};
