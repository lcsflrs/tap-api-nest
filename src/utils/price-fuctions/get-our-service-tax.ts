const getOurServiceTax = (installments: number) => {
  switch (installments) {
    case 1:
      return 0.0;
    case 2:
      return 0.0;
    case 3:
      return 0.0;
    default:
      return 0.0;
  }
};

export default getOurServiceTax;
