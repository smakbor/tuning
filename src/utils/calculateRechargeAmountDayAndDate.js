import dayjs from 'dayjs';
import { useEffect } from 'react';

export const calculateRechargeAmountDayAndBillingCycleDate = (setValue, client) => {
  //PER DAY FEE
  let perDayFee = client?.fee / 30;
  return {
    //CALCULATION BY AMOUNT
    calculateByAmount: (value) => {
      let amount = Number(value);
      let day = Math.round(amount / perDayFee);
      let billingCycleDate = dayjs(client.billingCycle).add(day, 'day');
      const rechargeInfo = {
        amount,
        dayLeft: day,
        billingCycle: billingCycleDate
      };
      if (rechargeInfo) {
        Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
      }
    },

    //CACULATION BY DAYS
    calculateByDays: (days) => {
      let day = Number(days);
      let amount = (perDayFee * day).toFixed(4);
      let billingCycleDate = dayjs(client.billingCycle).add(day, 'day');

      const rechargeInfo = {
        amount: Number(amount),
        dayLeft: day,
        billingCycle: billingCycleDate
      };
      if (rechargeInfo) {
        Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
      }
    },

    //CALCUALTION BY DATE
    calculateByDate: (date) => {
      const d = new Date(date);
      const clientDate = new Date(client.billingCycle);
      const day = d.getDay() - clientDate.getDay();
      // const day = dayjs(date).diff(client.billingCycle, 'day');
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

// export const monthlyRechargeIsPartialAmountDayLeftAndBillingCycle = (setValue, client, watchAmount) => {
//   //PER DAY FEE
//   let perDayFee = client?.fee / 30;
//   let watchDay = Math.round(watchAmount / perDayFee);
//   let watchBillingCycleDate = dayjs().add(watchDay, 'day');

//   useEffect(() => {
//     setValue('dayLeft', watchDay);
//     setValue('billingCycle', watchBillingCycleDate);
//   }, [watchAmount, watchDay, watchBillingCycleDate]);

//   return {
//     //CALCULATION BY AMOUNT
//     calculateByAmount: (value) => {
//       let amount = Number(value);
//       let day = Math.round(amount / perDayFee);
//       let billingCycleDate = dayjs().add(day, 'day');
//       const rechargeInfo = {
//         amount,
//         dayLeft: day,
//         billingCycle: billingCycleDate
//       };
//       if (rechargeInfo) {
//         Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
//       }
//     },

//     //CAlCULATION BY DAYS
//     calculateByDays: (days) => {
//       let day = Number(days);
//       let amount = (perDayFee * day).toFixed(4);
//       let billingCycleDate = dayjs().add(day, 'day');

//       const rechargeInfo = {
//         amount: Number(amount),
//         dayLeft: day,
//         billingCycle: billingCycleDate
//       };
//       if (rechargeInfo) {
//         Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
//       }
//     },

//     //CALCULATION BY DATE
//     calculateByDate: (date) => {
//       const day = dayjs(date).diff(dayjs(), 'day');
//       let amount = (perDayFee * day).toFixed(4);
//       const rechargeInfo = {
//         amount: Number(amount),
//         dayLeft: day,
//         billingCycle: date
//       };
//       if (rechargeInfo) {
//         Object.entries(rechargeInfo).forEach(([name, value]) => setValue(name, value));
//       }
//     }
//   };
// };

/// MESSAGE PURCHASE CALCULATION

export const calculateMessagePurchaseAmount = (setValue, watch) => {
  const watchMessageType = watch('type');

  return {
    calculateByQuantity: (value) => {
      setValue('quantity', value);
      if (watchMessageType == 'fixed_number') {
        const amount = Math.ceil(0.45 * value);
        setValue('amount', amount);
      } else if (watchMessageType == 'masking') {
        const amount = Math.ceil(0.65 * value);
        setValue('amount', amount);
      } else if (watchMessageType == 'non_masking') {
        const amount = Math.ceil(0.3 * value);
        setValue('amount', amount);
      }
    },
    calculateByAmount: (value) => {
      setValue('amount', value);
      if (watchMessageType == 'fixed_number') {
        const quantity = Math.ceil(value / 0.45);
        setValue('quantity', quantity);
      } else if (watchMessageType == 'masking') {
        const quantity = Math.ceil(value / 0.65);
        setValue('quantity', quantity);
      } else if (watchMessageType == 'non_masking') {
        const quantity = Math.ceil(value / 0.3);
        setValue('quantity', quantity);
      }
    },
    calculateByMessageType: (item) => {
      setValue('type', item.value);
      const quantity = watch('quantity');

      if (item.value == 'fixed_number') {
        const amount = Math.ceil(quantity * 0.45);
        setValue('amount', amount);
      } else if (item.value == 'masking') {
        const amount = Math.ceil(0.65 * quantity);
        setValue('amount', amount);
      } else if (item.value == 'non_masking') {
        const amount = Math.ceil(0.3 * quantity);
        setValue('amount', amount);
      }
    }
  };
};

// if (watchMessageType == 'fixed_number') {
//   const amount = 0.45 * watchQuantity;
//   setValue('amount', amount);
// } else if (watchMessageType == 'masking') {
//   const amount = 0.65 * watchQuantity;
//   setValue('amount', amount);
// } else if (watchMessageType == 'non_masking') {
//   const amount = 0.3 * watchQuantity;
//   setValue('amount', amount);
// }
