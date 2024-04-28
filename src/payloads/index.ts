export const nonPSLPayload = (
  paymentType: string | null,
  transactionAmount: string | null,
  effectiVeDate: string | null,
  jobDivaId: string | null,
  mboId: string,
  email: string
): saveNonPSL => ({
  operator: {
    // mboId: token?.idToken?.claims?.mbo_id,
    // email: token?.idToken?.claims?.email,
    mboId, // "123",
    email, // "vatsal@mbopartners.com",
  },
  payAmount: {
    currency: "USD",
    raw: paymentType === "Pay" ? transactionAmount : null,
  },
  billAmount: {
    currency: "USD",
    raw: paymentType === "Bill" ? transactionAmount : null,
  },

  workorder: { jobDivaStartId: jobDivaId || null },
  effectiveDate: { culture: "en-US", raw: effectiVeDate },
});

export const pslPayload = (
  jobDivaId: string | null,
  hoursData: sickLeaveData[],
  mboId: string,
  email: string
): savePSL => ({
  workorder: { jobDivaStartId: jobDivaId || null },
  paidSickLeave: hoursData,
  operator: {
    mboId,
    email,
  },
});

// export const combinedpayLoad = (payload1 = {}, payload2 = {}): Object => {
//   let returnData;

//   const a = {
//     billAmount: null,
//     payAmount: null,
//     effectiveDate: null,
//   };

//   const b = {
//     paidSickLeave: [],
//   };

//   if (payload1) {
//     returnData = { ...payload1, ...a };
//   }

//   if (payload2) {
//     returnData = { ...payload2, ...b };
//   }

//   return returnData;
// };
