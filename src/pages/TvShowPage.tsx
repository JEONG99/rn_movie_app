import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TvShowSlider from "../components/TvShowSlider";
import useScroll from "../hooks/useScroll";
import { useQuery } from "@tanstack/react-query";
import { IGetTvShowsResult, ITvShow, getTvShows } from "../utils/api";
import Banner from "../components/Banner";
import useGenres from "../hooks/useGenres";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TvShowStackParamList } from "../../App";

export type TvShowPageProps = NativeStackScreenProps<
  TvShowStackParamList,
  "TvShowHome"
>;

const TvShowPage = ({ navigation }: TvShowPageProps) => {
  const [bannerTvShow, setBannerTvShow] = useState<ITvShow | null>(null);
  const { scrollEventThrottle, onScroll, scrollRef } = useScroll();
  const { data, isLoading } = useQuery<IGetTvShowsResult>({
    queryKey: ["tv", "airing_today"],
    queryFn: () => getTvShows({ category: "airing_today" }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const genresResult = useGenres();

  const goDetailPage = () => {
    if (!bannerTvShow?.id) return;
    navigation.navigate("TvShowDetail", {
      id: bannerTvShow.id,
      title: bannerTvShow.name,
      imagePath: bannerTvShow.backdrop_path,
    });
  };

  const goSearch = () => {
    navigation.navigate("Search");
  };

  const goProfile = () => {
    navigation.navigate("Profile");
  };

  useEffect(() => {
    if (!data) return;
    setBannerTvShow(
      data.results[Math.floor(Math.random() * data.results.length)]
    );
  }, [data]);

  return (
    <Layout title="Tv Show" goSearch={goSearch} goProfile={goProfile}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        ref={scrollRef}
      >
        {bannerTvShow?.id ? (
          <Banner
            id={bannerTvShow.id}
            path={bannerTvShow?.poster_path || ""}
            backdropPath={bannerTvShow?.backdrop_path || ""}
            title={bannerTvShow?.name || ""}
            genres={
              bannerTvShow?.genre_ids.map(
                (id) =>
                  genresResult.find((genre) => genre.id === id)?.name || ""
              ) || []
            }
            isLoading={isLoading}
            goDetailPage={goDetailPage}
            isMovie={false}
          />
        ) : (
          <View style={{ height: 500 }} />
        )}
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
