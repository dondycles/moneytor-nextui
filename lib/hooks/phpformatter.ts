let PHPeso = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export const usePhpPeso = (number: number) => {
  return PHPeso.format(number);
};
