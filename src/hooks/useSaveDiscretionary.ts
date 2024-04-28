import { useMutation } from "@tanstack/react-query";

import Api from "../API";
import BonusApplication from "../API/BonusApplication";

const useSaveDiscretionary = useMutation(
  (data: savePSL | saveNonPSL | null) => {
    const request = BonusApplication.saveDiscretionary(data);

    return Api.performRequestMutate(request);
  }
);

export default useSaveDiscretionary;
