import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MovieSlider from "../components/MovieSlider";
import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, IMovie, getMovies } from "../utils/api";
import useScroll from "../hooks/useScroll";
import Banner from "../components/Banner";
import useGenres from "../hooks/useGenres";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieStackParamList } from "../../App";

export type MoviePageProps = NativeStackScreenProps<
  MovieStackParamList,
  "MovieHome"
>;

const MoviePage = ({ navigation }: MoviePageProps) => {
  const [bannerMovie, setBannerMovie] = useState<IMovie | null>(null);
  const { scrollEventThrottle, onScroll, scrollRef } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movie", "now_playing"],
    queryFn: () => getMovies({ category: "now_playing" }),
    refetchOnWindowFocus: false,
  });
  const genresResult = useGenres();

  const goDetailPage = () => {
    if (!bannerMovie?.id) return;
    navigation.navigate("Detail", {
      id: bannerMovie.id,
      title: bannerMovie.title,
      imagePath: bannerMovie.backdrop_path,
    });
  };

  useEffect(() => {
    if (!data) return;
    setBannerMovie(
      data.results[Math.floor(Math.random() * data.results.length)]
    );
  }, [data]);

  return (
    <Layout title="Movie">
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        ref={scrollRef}
      >
        {bannerMovie?.id ? (
          <Banner
            id={bannerMovie.id}
            path={bannerMovie?.poster_path || ""}
            title={bannerMovie?.title || ""}
            genres={
              bannerMovie?.genre_ids.map(
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
        <MovieSlider category={{ key: "now_playing", name: "Now Playing" }} />
        <MovieSlider category={{ key: "popular", name: "Popular" }} />
        <MovieSlider category={{ key: "top_rated", name: "Top Rated" }} />
        <MovieSlider
          category={{ key: "upcoming", name: "Upcoming" }}
          last={true}
        />
      </ScrollView>
    </Layout>
  );
};

export default MoviePage;
