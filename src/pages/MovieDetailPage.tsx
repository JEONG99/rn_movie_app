import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import {
  IGetCreditsResult,
  IGetMovieDetailResult,
  getMovieCredits,
  getMovieDetail,
} from "../utils/api";
import DetailLayout from "../components/DetailLayout";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import useGenres from "../hooks/useGenres";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Loader from "../components/Loader";
import {
  MovieStackParamList,
  TrendingStackParamList,
  TvShowStackParamList,
} from "../../App";
import WishListIcon from "../components/WishListIcon";
import useWishList from "../hooks/useWishList";
import { theme } from "../../theme";

const YearStarBox = styled.View`
  margin-top: 7px;
  flex-direction: row;
  align-items: center;
`;
const Bullet = styled.View`
  margin: 0 12px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.gray.dark};
`;
const RuntimeText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.gray.light};
`;
const Year = styled.View`
  margin-top: 2px;
  padding: 2px 4px;
  border: 1px solid ${(props) => props.theme.gray.light};
  border-radius: 3px;
`;
const YearText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: rgb(70, 211, 105);
`;
const StarText = styled.Text`
  margin-top: -1px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.gray.light};
`;
const Genres = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.gray.light};
`;
const CastingBox = styled.View`
  margin: 10px 0;
  gap: 2px;
`;
const CastingText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.gray.dark};
`;
const IconsBlock = styled.View`
  flex-direction: row;
  margin-top: 4px;
  margin-bottom: 10px;
`;
const Overview = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.gray.light};
`;
const Link = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
const LinkText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: "rgb(0, 100, 194)";
`;

type DetailPageProps =
  | NativeStackScreenProps<MovieStackParamList, "MovieDetail">
  | NativeStackScreenProps<TvShowStackParamList, "MovieDetail">
  | NativeStackScreenProps<TrendingStackParamList, "MovieDetail">;

const MovieDetailPage = ({ navigation, route }: DetailPageProps) => {
  const { id, title, imagePath } = route.params;
  const { disabled, isContained, setWishListToStorage } = useWishList(id);
  const { data: detail, isLoading: detailLoading } =
    useQuery<IGetMovieDetailResult>({
      queryKey: ["movie", "detail", id],
      queryFn: () => getMovieDetail({ id }),
      refetchOnWindowFocus: false,
    });
  const { data: credits, isLoading: creditsLoading } =
    useQuery<IGetCreditsResult>({
      queryKey: ["movie", "credits", id],
      queryFn: () => getMovieCredits({ id }),
      refetchOnReconnect: false,
    });
  const genresResult = useGenres();
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    if (!detail) return;
    setGenres(
      detail.genres.map(
        (genre) =>
          genresResult.find((_genre) => _genre.id === genre.id)?.name || ""
      ) || []
    );
  }, [detail]);

  const goBackHome = () => {
    navigation.goBack();
  };

  /*
  const goWebview = (path: string) => {
    if (!path) return;
    let _navigation;
    const root = navigation.getState().routes[0].name;
    switch (root) {
      case "MovieHome":
        _navigation = navigation as NativeStackScreenProps<
          MovieStackParamList,
          "Detail"
        >["navigation"];
        _navigation.navigate("Webview", { path });
        break;
      case "SearchHome":
        _navigation = navigation as NativeStackScreenProps<
          SearchStackParamList,
          "MovieDetail"
        >["navigation"];
        _navigation.navigate("Webview", { path });
        break;
      case "TrendingHome":
        _navigation = navigation as NativeStackScreenProps<
          TrendingStackParamList,
          "MovieDetail"
        >["navigation"];
        _navigation.navigate("Webview", { path });
        break;
      default:
        break;
    }
  };
  */

  const isLoading = detailLoading || creditsLoading;
  return (
    <DetailLayout
      imagePath={imagePath}
      title={title}
      tagLine={detail?.tagline}
      goBackHome={goBackHome}
    >
      {isLoading ? (
        <Loader size="large" />
      ) : (
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
          <YearStarBox>
            <Year>
              <YearText>{detail?.release_date.slice(0, 4)}</YearText>
            </Year>
            <Bullet />
            <RuntimeText>{detail?.runtime}Minutes</RuntimeText>
            <Bullet />
            <StarRatingDisplay
              starSize={20}
              starStyle={{
                marginLeft: 0,
              }}
              color="#FCD53F"
              emptyColor="#FCD53F"
              rating={(detail?.vote_average || 0) / 2}
              StarIconComponent={({ size, color, type }) =>
                type === "half" ? (
                  <FontAwesome
                    name="star-half-empty"
                    size={size}
                    color={color}
                  />
                ) : type === "full" ? (
                  <FontAwesome name="star" size={size} color={color} />
                ) : (
                  <FontAwesome name="star-o" size={size} color={color} />
                )
              }
            />
            <StarText>{detail?.vote_average.toFixed(1)}</StarText>
          </YearStarBox>
          <Genres>{genres.join("•")}</Genres>
          <CastingBox>
            {credits?.cast ? (
              <CastingText numberOfLines={1}>
                Casting:{" "}
                {credits.cast.length === 0
                  ? "-"
                  : credits.cast.map((person) => person.name).join(", ")}
              </CastingText>
            ) : null}
            {credits?.crew ? (
              <CastingText numberOfLines={1}>
                Director:{" "}
                {credits.crew.find((person) => person.job === "Director")
                  ? credits.crew.find((person) => person.job === "Director")
                      ?.name
                  : "-"}
              </CastingText>
            ) : null}
          </CastingBox>
          <TouchableOpacity
            onPress={() => {
              //goWebview(detail?.homepage || "")
            }}
          >
            <Link>
              <Feather name="link" size={20} color="rgb(0, 100, 194)" />
              <LinkText>Go Homepage</LinkText>
            </Link>
          </TouchableOpacity>
          <IconsBlock>
            <TouchableOpacity
              disabled={disabled}
              onPress={setWishListToStorage}
            >
              <WishListIcon isChecked={isContained} />
            </TouchableOpacity>
          </IconsBlock>
          <Overview>{detail?.overview}</Overview>
        </View>
      )}
    </DetailLayout>
  );
};

export default MovieDetailPage;
