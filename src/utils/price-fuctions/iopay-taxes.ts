export const iopayTaxValue = (installments: number) => {
  switch (installments) {
    case 1:
      return 0.04;
    case 2:
      return 0.06;
    case 3:
      return 0.07;
    default:
      return 0.04;
  }
};
