import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TvShowStackParamList } from "../../App";
import { useQuery } from "@tanstack/react-query";
import {
  IGetCreditsResult,
  IGetTvSeasonDetailResult,
  IGetTvShowDetailResult,
  getTvCredits,
  getTvSeasonDetail,
  getTvShowDetail,
} from "../utils/api";
import useGenres from "../hooks/useGenres";
import DetailLayout from "../components/DetailLayout";
import Loader from "../components/Loader";
import styled from "styled-components/native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import TvShowSeason from "../components/TvShowSeason";
import Episode from "../components/Episode";

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
const Icon = styled.View`
  align-items: center;
  gap: 4px;
`;
const IconText = styled.Text`
  color: ${(props) => props.theme.gray.dark};
  font-size: 12px;
  font-weight: 400;
`;

const Episodes = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;
const EpisodesTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.gray.dark};
`;

type DetailPageProps = NativeStackScreenProps<TvShowStackParamList, "Detail">;

export interface ISelectSeason {
  tvShowId: number;
  seasonNumber: number;
  name: string;
}

const TvShowDetailPage = ({ navigation, route }: DetailPageProps) => {
  const { id, title, imagePath } = route.params;
  const { data: detail, isLoading: detailLoading } =
    useQuery<IGetTvShowDetailResult>({
      queryKey: ["tv", "detail", id],
      queryFn: () => getTvShowDetail({ id }),
      staleTime: Infinity,
    });
  const { data: credits, isLoading: creditsLoading } =
    useQuery<IGetCreditsResult>({
      queryKey: ["tv", "credits", id],
      queryFn: () => getTvCredits({ id }),
      refetchOnReconnect: false,
    });
  const genresResult = useGenres({ type: "tv" });
  const [genres, setGenres] = useState<string[]>([]);
  const [selectSeason, setSelectSeason] = useState<ISelectSeason | null>(null);
  const {
    data: seasonDetail,
    isLoading: seasonDetailLoading,
    refetch: seasonDetailRefetch,
  } = useQuery<IGetTvSeasonDetailResult>({
    queryKey: ["tv", "seasonDetail", id, selectSeason?.seasonNumber],
    queryFn: () =>
      getTvSeasonDetail({
        tvShowId: id,
        seasonNumber: selectSeason?.seasonNumber || 1,
      }),
    enabled: false,
  });

  useEffect(() => {
    if (!detail) return;
    setGenres(
      detail.genres.map(
        (genre) =>
          genresResult.genres.find((_genre) => _genre.id === genre.id)?.name ||
          ""
      ) || []
    );
  }, [detail]);

  useEffect(() => {
    if (!detail) return;
    const initialSeason = detail.seasons[0];
    setSelectSeason({
      tvShowId: id,
      seasonNumber: initialSeason.season_number,
      name: initialSeason.name,
    });
  }, [detail]);

  useEffect(() => {
    if (!selectSeason) return;
    seasonDetailRefetch();
  }, [selectSeason]);

  const changeSeason = (newSeason: ISelectSeason) => {
    setSelectSeason(newSeason);
  };

  const goBackHome = () => {
    navigation.goBack();
  };

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
        <ScrollView style={{ paddingLeft: 5, paddingRight: 5 }}>
          <YearStarBox>
            <Year>
              <YearText>{detail?.first_air_date.slice(0, 4)}</YearText>
            </Year>
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
          <IconsBlock>
            <TouchableOpacity>
              <Icon>
                <Feather name="plus-circle" size={26} color="white" />
                <IconText>Add Wish List</IconText>
              </Icon>
            </TouchableOpacity>
          </IconsBlock>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {detail?.seasons.map((season) => (
              <TvShowSeason
                key={season.id}
                tvShowId={id}
                seasonNumber={season.season_number}
                imagePath={season.poster_path}
                name={season.name}
                changeSeason={changeSeason}
                select={selectSeason?.seasonNumber === season.season_number}
              />
            ))}
          </ScrollView>
          <Episodes>
            <EpisodesTitle numberOfLines={2}>
              {title} - {selectSeason?.name}
            </EpisodesTitle>
            {seasonDetailLoading ? (
              <Loader size="small" />
            ) : (
              seasonDetail?.episodes.map((episode) => (
                <Episode
                  key={episode.id}
                  episodeNumber={episode.episode_number}
                  title={episode.name}
                  runtime={episode.runtime}
                  overview={episode.overview}
                  imagePath={episode.still_path}
                />
              ))
            )}
          </Episodes>
        </ScrollView>
      )}
    </DetailLayout>
  );
};

export default TvShowDetailPage;
