import {
  ScrollView,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Layout from "../components/Layout";
import MovieSlider from "../components/MovieSlider";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { IGetMoviesResult, getMovies } from "../utils/api";
import { makeImagePath } from "../utils/makeImagePath";
import styled from "styled-components/native";
import { headerBackgroundShowAtom } from "../utils/atom";

const Banner = styled.View`
  height: 500px;
`;

const MoviePage = () => {
  const setHeaderBackgroundShow = useSetRecoilState(headerBackgroundShowAtom);
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movie", "now_playing"],
    queryFn: () => getMovies({ category: "now_playing" }),
    refetchOnWindowFocus: false,
  });

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scroll = event.nativeEvent.contentOffset.y;
    if (scroll > 80) {
      setHeaderBackgroundShow(true);
    } else {
      setHeaderBackgroundShow(false);
    }
  };

  return (
    <Layout title="Movie">
      <ScrollView scrollEventThrottle={30} onScroll={onScroll}>
        <Banner>
          {data && (
            <Image
              height={500}
              source={{
                uri: makeImagePath(data.results[0].poster_path, "w500"),
              }}
            />
          )}
        </Banner>
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
