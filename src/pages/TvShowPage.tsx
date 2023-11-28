import { ScrollView } from "react-native";
import Layout from "../components/Layout";
import TvShowSlider from "../components/TvShowSlider";
import useScroll from "../hooks/useScroll";
import { useQuery } from "@tanstack/react-query";
import { IGetTvShowsResult, ITvShow, getTvShows } from "../utils/api";
import Banner from "../components/Banner";
import { AxiosError } from "axios";
import useGenres from "../hooks/useGenres";

const TvShowPage = () => {
  const { scrollEventThrottle, onScroll, scrollRef } = useScroll();
  const { data, isLoading } = useQuery<IGetTvShowsResult, AxiosError, ITvShow>({
    queryKey: ["tv", "airing_today"],
    queryFn: () => getTvShows({ category: "airing_today" }),
    refetchOnWindowFocus: false,
    select: (data) =>
      data.results[Math.floor(Math.random() * data.results.length)],
  });
  const genresResult = useGenres({ type: "tv" });

  return (
    <Layout title="Tv Show">
      <ScrollView
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        ref={scrollRef}
      >
        <Banner
          id={data?.id}
          path={data?.poster_path || ""}
          backdropPath={data?.backdrop_path || ""}
          title={data?.name || ""}
          genres={
            data?.genre_ids.map(
              (id) =>
                genresResult.genres.find((genre) => genre.id === id)?.name || ""
            ) || []
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
