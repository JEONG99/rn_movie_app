import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { SearchStackParamList } from "../../App";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { IGetMultiSearchResult, getMultiSearch } from "../utils/api";
import Loader from "../components/Loader";
import SearchThumbnail from "../components/SearchThumbnail";
import { useRecoilState } from "recoil";
import { searchQueryAtom } from "../utils/atom";

const Wrapper = styled.View`
  flex: 1;
  padding-top: 100px;
`;
const InputBox = styled.View`
  position: relative;
  justify-content: center;
  margin-bottom: 10px;
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

export type SearchPageProps = NativeStackScreenProps<
  SearchStackParamList,
  "SearchHome"
>;

const WIDTH = Dimensions.get("window").width;
const COLUMNS_NUM = 3;

const SearchPage = ({ navigation }: SearchPageProps) => {
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
    if (isMovie) {
      navigation.navigate("MovieDetail", {
        id,
        title,
        imagePath,
      });
      return;
    }
    navigation.navigate("TvShowDetail", {
      id,
      title,
      imagePath,
    });
  };

  return (
    <Layout title="Search">
      <Wrapper>
        <InputBox>
          <InputIcon>
            <MaterialIcons name="search" size={28} color="rgb(128,128,128)" />
          </InputIcon>
          <Input
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
              renderItem={({ item }) => (
                <SearchThumbnail
                  width={WIDTH / COLUMNS_NUM}
                  height={(WIDTH / COLUMNS_NUM) * 1.5}
                  id={item.id}
                  title={item.title || item.name || ""}
                  imagePath={item.poster_path}
                  isMovie={item.media_type === "movie"}
                  goToDetail={goToDetail}
                />
              )}
              numColumns={COLUMNS_NUM}
              keyExtractor={(item) => item.id + ""}
            />
          )}
        </TouchableWithoutFeedback>
      </Wrapper>
    </Layout>
  );
};

export default SearchPage;
