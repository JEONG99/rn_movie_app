import { ScrollView } from "react-native";
import Layout from "../components/Layout";
import MovieSlider from "../components/MovieSlider";
import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, IMovie, getMovies } from "../utils/api";
import useScroll from "../hooks/useScroll";
import Banner from "../components/Banner";
import { AxiosError } from "axios";
import useGenres from "../hooks/useGenres";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieStackParamList } from "../../App";

export type MoviePageProps = NativeStackScreenProps<
  MovieStackParamList,
  "MovieHome"
>;

const MoviePage = ({ navigation }: MoviePageProps) => {
  const { scrollEventThrottle, onScroll, scrollRef } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult, AxiosError, IMovie>({
    queryKey: ["movie", "now_playing"],
    queryFn: () => getMovies({ category: "now_playing" }),
    refetchOnWindowFocus: false,
    select: (data) =>
      data.results[Math.floor(Math.random() * data.results.length)],
  });
  const genresResult = useGenres({ type: "movie" });

  const goDetailPage = () => {
    if (!data?.id) return;
    navigation.navigate("Detail", {
      id: data.id,
      title: data.title,
      imagePath: data.backdrop_path,
    });
  };

  return (
    <Layout title="Movie">
      <ScrollView
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        ref={scrollRef}
      >
        <Banner
          path={data?.poster_path || ""}
          title={data?.title || ""}
          genres={
            data?.genre_ids.map(
              (id) =>
                genresResult.genres.find((genre) => genre.id === id)?.name || ""
            ) || []
          }
          isLoading={isLoading}
          goDetailPage={goDetailPage}
        />
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
