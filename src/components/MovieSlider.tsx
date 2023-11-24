import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { IGetMoviesResult, getMovies, movieCategories } from "../utils/api";
import { makeImagePath } from "../utils/makeImagePath";

const Container = styled.View<{ $last: boolean }>`
  margin-top: 20px;
  margin-bottom: ${(props) => (props.$last ? "50px" : "0px")};
`;
const Header = styled.View`
  margin-bottom: 10px;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
const Thumbnail = styled.View`
  margin-right: 8px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
`;
const ThumbnailImage = styled.Image`
  width: 110px;
  height: 150px;
`;
const Loader = styled.View`
  justify-content: center;
  height: 150px;
`;

interface ISliderProps {
  category: {
    key: movieCategories;
    name: string;
  };
  last?: boolean;
}

const MovieSlider = ({ category, last = false }: ISliderProps) => {
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movie", category.key],
    queryFn: () => getMovies({ category: category.key }),
    refetchOnWindowFocus: false,
  });

  return (
    <Container $last={last}>
      <Header>
        <HeaderText>{category.name}</HeaderText>
      </Header>
      {isLoading ? (
        <Loader>
          <ActivityIndicator size="small" />
        </Loader>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data?.results.map((movie) => (
            <TouchableOpacity key={movie.id} activeOpacity={0.6}>
              <Thumbnail>
                <ThumbnailImage
                  source={{ uri: makeImagePath(movie.poster_path, "w200") }}
                />
              </Thumbnail>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Container>
  );
};

export default MovieSlider;
