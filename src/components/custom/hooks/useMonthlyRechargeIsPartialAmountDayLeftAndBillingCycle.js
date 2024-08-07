import dayjs from 'dayjs';
import { useEffect } from 'react';

const useMonthlyRechargeIsPartialAmountDayLeftAndBillingCycle = (setValue, client, watchAmount) => {
  //PER DAY FEE
  let perDayFee = client?.fee / 30;
  let watchDay = Math.round(watchAmount / perDayFee);
  let watchBillingCycleDate = dayjs().add(watchDay, 'day');
  useEffect(() => {
    setValue('dayLeft', watchDay);
    setValue('billingCycle', watchBillingCycleDate);
  }, []);

  return {
    //CALCULATION BY AMOUNT
    calculateByAmount: (value) => {
      let amount = Number(value);
      let day = Math.round(amount / perDayFee);
      let billingCycleDate = dayjs().add(day, 'day');
      const rechargeInfo = {
        amount,
        dayLeft: day,
        billingCycle: billingCycleDate
      };
      if (rechargeInfo) {
        Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
      }
    },

    //CAlCULATION BY DAYS
    calculateByDays: (days) => {
      let day = Number(days);
      let amount = (perDayFee * day).toFixed(4);
      let billingCycleDate = dayjs().add(day, 'day');

      const rechargeInfo = {
        amount: Number(amount),
        dayLeft: day,
        billingCycle: billingCycleDate
      };
      if (rechargeInfo) {
        Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
      }
    },

    //CALCULATION BY DATE
    calculateByDate: (date) => {
      const day = dayjs(date).diff(dayjs(), 'day');
      let amount = (perDayFee * day).toFixed(4);
      const rechargeInfo = {
        amount: Number(amount),
        dayLeft: day,
        billingCycle: date
      };
      if (rechargeInfo) {
        Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
      }
    }
  };
};

export default useMonthlyRechargeIsPartialAmountDayLeftAndBillingCycle;
