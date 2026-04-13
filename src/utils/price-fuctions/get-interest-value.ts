import getOurServiceTax from "./get-our-service-tax";
import getTotalByInstallments from "./get-total-by-installments";

const getInterestValue = (total: number, installments: number) => {
  if (installments === 1) {
    return 0;
  }

  const totalByInstallments = getTotalByInstallments(total, installments);
  const interest = totalByInstallments - getOurServiceTax(installments) - total;

  return interest;
};

export default getInterestValue;
