export const deepCopy = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
