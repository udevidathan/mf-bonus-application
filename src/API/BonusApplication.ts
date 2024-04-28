import { HTTP } from "mf-core-library-v2";

const BASE_URI = process.env.REACT_APP_LOCAL_API_BASEURL;

export default {
  search(payload: searchPayload) {
    return {
      url: `${BASE_URI as string}/workorder/workorders/search`,
      options: {
        method: HTTP.POST,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      },
    };
  },
  saveDiscretionary(payload: saveNonPSL | savePSL | null) {
    return {
      url: `${
        BASE_URI as string
      }/workorder/workorders/charges/discretionaryBonusForProcessing`,
      options: {
        method: HTTP.POST,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      },
    };
  },
  saveNonDiscretionary(payload: saveNonPSL | savePSL | null) {
    return {
      url: `${
        BASE_URI as string
      }/workorder/workorders/charges/nondiscretionaryBonusForProcessing`,
      options: {
        method: HTTP.POST,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      },
    };
  },
  saveAdjustment(payload: saveNonPSL | savePSL | null) {
    return {
      url: `${
        BASE_URI as string
      }/workorder/workorders/charges/adjustmentForProcessing`,
      options: {
        method: HTTP.POST,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      },
    };
  },

  savePSLForProcessing(payload: saveNonPSL | savePSL | null) {
    return {
      url: `${
        BASE_URI as string
      }/workorder/workorders/charges/chargedPSLForProcessing`,
      options: {
        method: HTTP.POST,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      },
    };
  },
};
