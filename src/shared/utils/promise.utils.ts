export const stall = async function (stallTime: number) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
};
