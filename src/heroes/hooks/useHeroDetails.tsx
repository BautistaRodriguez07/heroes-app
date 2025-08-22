import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/get-hero";

export const useHeroDetails = (idSlug: string) => {
  return useQuery({
    queryKey: ["hero" + idSlug],
    queryFn: () => getHero(idSlug),
    staleTime: 1000 * 60 * 60, //60min
    retry: false,
  });
};
