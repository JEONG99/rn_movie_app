import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import SearchThumbnail from "../components/SearchThumbnail";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  MovieStackParamList,
  TrendingStackParamList,
  TvShowStackParamList,
} from "../../App";
import { useRecoilValue } from "recoil";
import { tabRouteNameAtom, wishListAtom } from "../utils/atom";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../theme";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Header = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 55px 5px;
  padding-bottom: 10px;
`;
const HeaderLogo = styled.View``;
const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
const Wrapper = styled.View`
  flex: 1;
`;
const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const PlusIconBox = styled.View`
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: rgb(20, 20, 20);
`;
const EmptyText = styled.Text`
  color: ${(props) => props.theme.gray.light};
  font-size: 20px;
  font-weight: 600;
`;
const EmptyButton = styled.View`
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  background-color: ${(props) => props.theme.gray.light};
`;
const EmptyButtonText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: rgb(20, 20, 20);
`;

const WIDTH = Dimensions.get("window").width;
const COLUMNS_NUM = 3;

export type ProfilePageProps =
  | NativeStackScreenProps<MovieStackParamList, "Profile">
  | NativeStackScreenProps<TvShowStackParamList, "Profile">
  | NativeStackScreenProps<TrendingStackParamList, "Profile">;

const ProfilePage = ({ navigation }: ProfilePageProps) => {
  const root = useRecoilValue(tabRouteNameAtom);
  const wishList = useRecoilValue(wishListAtom);

  const goHome = () => {
    navigation.goBack();
  };

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
    <Container>
      <Header>
        <HeaderLogo>
          <TouchableWithoutFeedback onPress={goHome}>
            <Entypo name="chevron-small-left" size={36} color="white" />
          </TouchableWithoutFeedback>
        </HeaderLogo>
        <HeaderText>My Wish List</HeaderText>
      </Header>
      <Wrapper>
        {wishList.length === 0 ? (
          <EmptyWrapper>
            <PlusIconBox>
              <Feather name="plus" size={85} color={theme.gray.light} />
            </PlusIconBox>
            <EmptyText>Wish List is Empty.</EmptyText>
            <TouchableOpacity activeOpacity={0.8} onPress={goHome}>
              <EmptyButton>
                <EmptyButtonText>Find Content</EmptyButtonText>
              </EmptyButton>
            </TouchableOpacity>
          </EmptyWrapper>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={wishList}
            renderItem={({ item, index }) => (
              <SearchThumbnail
                width={WIDTH / COLUMNS_NUM}
                height={(WIDTH / COLUMNS_NUM) * 1.5}
                id={item.id}
                title={item.title}
                imagePath={item.posterPath}
                goToDetail={() =>
                  goToDetail(
                    item.id,
                    item.title,
                    item.backdropPath,
                    item.isMovie
                  )
                }
                isLast={index === wishList.length - 1}
              />
            )}
            numColumns={COLUMNS_NUM}
            keyExtractor={(item) => item.id + ""}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default ProfilePage;
