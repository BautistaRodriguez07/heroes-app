import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5, //5min
  });

  // const {}

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra SuperHeroes y Villanos"
      />

      <CustomBreadCrumbs
        currentPage="Buscador de Heroes"
        // breadcrumbs={[
        //   { label: "home1", to: "/" },
        //   { label: "home2", to: "/" },
        //   { label: "home3", to: "/" },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
