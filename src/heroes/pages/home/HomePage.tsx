import { use, useMemo } from "react";

import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: HeroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra SuperHeroes y Villanos"
        />

        {/* BreadCrumb  */}
        <CustomBreadCrumbs currentPage="Super Heroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <div className="overflow-x-auto">
            <TabsList className="flex gap-2 items-center justify-center flex-nowrap">
              <TabsTrigger
                value="all"
                onClick={() =>
                  setSearchParams(prev => {
                    prev.set("tab", "all");
                    prev.set("category", "all");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Todos Los Personajes ({summary?.totalHeroes})
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex items-center gap-2"
                onClick={() =>
                  setSearchParams(prev => {
                    prev.set("tab", "favorites");
                    prev.set("category", "favorites");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Favoritos ({favoriteCount})
              </TabsTrigger>
              <TabsTrigger
                value="heroes"
                onClick={() =>
                  setSearchParams(prev => {
                    prev.set("tab", "heroes");
                    prev.set("category", "hero");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Heroes ({summary?.heroCount})
              </TabsTrigger>
              <TabsTrigger
                value="villains"
                onClick={() =>
                  setSearchParams(prev => {
                    prev.set("tab", "villains");
                    prev.set("category", "villain");
                    prev.set("page", "1");
                    return prev;
                  })
                }
              >
                Villanos ({summary?.villainCount})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <HeroGrid heroes={HeroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            <HeroGrid heroes={HeroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            <HeroGrid heroes={HeroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}

        {/* <HeroGrid /> */}

        {/* Pagination */}
        <CustomPagination totalPages={HeroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
