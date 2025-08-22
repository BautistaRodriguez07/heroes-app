import { HeaderBanner } from "@/heroes/components/HeaderBanner";
import { HeroTabs } from "@/heroes/components/HeroTabs";
import { useHeroDetails } from "@/heroes/hooks/useHeroDetails";

import type { Hero } from "@/heroes/types/hero.interface";
import { Navigate, useParams } from "react-router";

export const HeroPage = () => {
  const { idSlug = "" } = useParams();

  const { data, isLoading, isError } = useHeroDetails(idSlug);

  const hero = data as Hero;

  if (isError) {
    return <Navigate to={"/"} />;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <HeaderBanner hero={hero} />

      {/* Main Content */}
      <HeroTabs hero={hero} />
    </div>
  );
};
