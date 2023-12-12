import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import {
  MovieStackParamList,
  TrendingStackParamList,
  TvShowStackParamList,
} from "../../App";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { IGetMultiSearchResult, getMultiSearch } from "../utils/api";
import Loader from "../components/Loader";
import SearchThumbnail from "../components/SearchThumbnail";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchQueryAtom, tabRouteNameAtom } from "../utils/atom";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../../theme";

const Wrapper = styled.View`
  flex: 1;
  padding-top: 50px;
  background-color: black;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 8px;
  padding-right: 5px;
`;
const Back = styled.View`
  flex: 0.13;
  align-items: center;
`;
const InputBox = styled.View`
  flex: 1;
  position: relative;
  justify-content: center;
  padding: 0 10px;
`;
const CloseIcon = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  z-index: 1;
`;
const InputIcon = styled.View`
  position: absolute;
  left: 20px;
  z-index: 1;
`;
const Input = styled.TextInput`
  padding-left: 45px;
  padding-right: 35px;
  height: 38px;
  border-radius: 5px;
  background-color: "rgb(50,50,50)";
  font-size: 16px;
  color: ${(props) => props.theme.gray.light};
`;
const Title = styled.Text`
  margin: 5px 0;
  padding: 0 5px;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.gray.light};
`;

export type SearchPageProps =
  | NativeStackScreenProps<MovieStackParamList, "Search">
  | NativeStackScreenProps<TvShowStackParamList, "Search">
  | NativeStackScreenProps<TrendingStackParamList, "Search">;

const WIDTH = Dimensions.get("window").width;
const COLUMNS_NUM = 3;

const SearchPage = ({ navigation }: SearchPageProps) => {
  const root = useRecoilValue(tabRouteNameAtom);
  const [query, setQuery] = useRecoilState(searchQueryAtom);
  const [text, onChangeText] = useState<string>("");
  const { data, isLoading } = useQuery<IGetMultiSearchResult>({
    queryKey: ["search", query],
    queryFn: () => getMultiSearch({ query }),
    enabled: query !== "",
    refetchOnWindowFocus: false,
  });

  const clearText = () => {
    onChangeText("");
    setQuery("");
  };
  const onSubmitEditing = () => {
    setQuery(text);
  };

  useEffect(() => {
    onChangeText(query);
  }, [query]);

  const goToDetail = (
    id: number,
    title: string,
    imagePath: string,
    isMovie: boolean
  ) => {
    let _navigation;
    switch (root) {
      case "Tv Show":
        _navigation = navigation as NativeStackScreenProps<
          TvShowStackParamList,
          "Search"
        >["navigation"];
        if (isMovie) {
          _navigation.navigate("MovieDetail", { id, title, imagePath });
          return;
        }
        _navigation.navigate("TvShowDetail", { id, title, imagePath });
        break;
      case "Movie":
        _navigation = navigation as NativeStackScreenProps<
          MovieStackParamList,
          "Search"
        >["navigation"];
        if (isMovie) {
          _navigation.navigate("MovieDetail", { id, title, imagePath });
          return;
        }
        _navigation.navigate("TvShowDetail", { id, title, imagePath });
        break;
      case "Hot":
        _navigation = navigation as NativeStackScreenProps<
          TrendingStackParamList,
          "Search"
        >["navigation"];
        if (isMovie) {
          _navigation.navigate("MovieDetail", { id, title, imagePath });
          return;
        }
        _navigation.navigate("TvShowDetail", { id, title, imagePath });
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Header>
        <Back>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-small-left"
              size={28}
              color={theme.gray.light}
            />
          </TouchableWithoutFeedback>
        </Back>
        <InputBox>
          <InputIcon>
            <MaterialIcons name="search" size={28} color="rgb(128,128,128)" />
          </InputIcon>
          <Input
            autoFocus
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            value={text}
            placeholder="Search for movie or tv show..."
            placeholderTextColor="rgb(128,128,128)"
          />
          {text !== "" ? (
            <CloseIcon onPress={clearText}>
              <AntDesign
                name="closecircle"
                size={16}
                color="rgb(128,128,128)"
              />
            </CloseIcon>
          ) : null}
        </InputBox>
      </Header>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        {isLoading ? (
          <Loader size="small" />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.results}
            ListHeaderComponent={() =>
              query !== "" ? (
                <Title>{`The results of a search using "${query}"`}</Title>
              ) : null
            }
            renderItem={({ item, index }) => (
              <SearchThumbnail
                width={WIDTH / COLUMNS_NUM}
                height={(WIDTH / COLUMNS_NUM) * 1.5}
                id={item.id}
                title={item.title || item.name || ""}
                imagePath={item.poster_path}
                goToDetail={() =>
                  goToDetail(
                    item.id,
                    item.title || item.name || "",
                    item.backdrop_path,
                    item.media_type === "movie"
                  )
                }
                isLast={index === data?.results.length! - 1}
              />
            )}
            numColumns={COLUMNS_NUM}
            keyExtractor={(item) => item.id + ""}
          />
        )}
      </TouchableWithoutFeedback>
    </Wrapper>
  );
};

export default SearchPage;
