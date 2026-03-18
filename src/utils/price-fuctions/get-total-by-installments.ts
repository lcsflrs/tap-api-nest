import getInterestTax from "./get-interest-tax";
import getOurServiceTax from "./get-our-service-tax";

const getTotalByInstallments = (total: number, installments: number) => {
  return (
    ((total +
      total * getOurServiceTax(installments) +
      getInterestTax(installments) * total) /
      installments) *
    installments
  );
};

export default getTotalByInstallments;
