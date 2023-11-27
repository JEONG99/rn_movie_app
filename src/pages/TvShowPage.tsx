import { ScrollView } from "react-native";
import Layout from "../components/Layout";
import TvShowSlider from "../components/TvShowSlider";
import useScroll from "../hooks/useScroll";
import { useQuery } from "@tanstack/react-query";
import { IGetTvShowsResult, getTvShows } from "../utils/api";
import Banner from "../components/Banner";

const TvShowPage = () => {
  const { scrollEventThrottle, onScroll, scrollRef } = useScroll();
  const { data, isLoading } = useQuery<IGetTvShowsResult>({
    queryKey: ["movie", "airing_today"],
    queryFn: () => getTvShows({ category: "airing_today" }),
    refetchOnWindowFocus: false,
  });

  return (
    <Layout title="Tv Show">
      <ScrollView
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        ref={scrollRef}
      >
        <Banner
          path={
            data?.results[Math.floor(Math.random() * data.results.length)]
              .poster_path || ""
          }
          isLoading={isLoading}
        />
        <TvShowSlider
          category={{ key: "airing_today", name: "Airing Today" }}
        />
        <TvShowSlider category={{ key: "on_the_air", name: "On The Air" }} />
        <TvShowSlider category={{ key: "popular", name: "Popular" }} />
        <TvShowSlider
          category={{ key: "top_rated", name: "Top Rated" }}
          last={true}
        />
      </ScrollView>
    </Layout>
  );
};

export default TvShowPage;
