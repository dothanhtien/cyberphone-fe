import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { configurationsApi } from "./api";

export const useSliders = () => {
  return useQuery({
    queryKey: queryKeys.configurations.sliders(),
    queryFn: () => configurationsApi.findAllSliders(),
  });
};
