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
  });
  const genresResult = useGenres();

  const goDetailPage = () => {
    if (!bannerTvShow?.id) return;
    navigation.navigate("Detail", {
      id: bannerTvShow.id,
      title: bannerTvShow.name,
      imagePath: bannerTvShow.backdrop_path,
    });
  };

  useEffect(() => {
    if (!data) return;
    setBannerTvShow(
      data.results[Math.floor(Math.random() * data.results.length)]
    );
  }, [data]);

  return (
    <Layout title="Tv Show">
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
            title={bannerTvShow?.name || ""}
            genres={
              bannerTvShow?.genre_ids.map(
                (id) =>
                  genresResult.find((genre) => genre.id === id)?.name || ""
              ) || []
            }
            isLoading={isLoading}
            goDetailPage={goDetailPage}
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
