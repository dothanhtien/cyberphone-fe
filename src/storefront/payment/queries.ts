import { PaymentProvider } from "@/enums";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { storefrontPaymentApi } from "./api";

export const useStorefrontPayment = (
  provider?: PaymentProvider,
  params?: URLSearchParams,
) => {
  const paramsString = params?.toString() ?? "";

  return useQuery({
    queryKey: queryKeys.storefront.payment.return(provider!, paramsString),
    queryFn: () =>
      storefrontPaymentApi.getPaymentReturn(
        provider!,
        new URLSearchParams(paramsString),
      ),
    enabled: !!provider && !!params,
  });
};
