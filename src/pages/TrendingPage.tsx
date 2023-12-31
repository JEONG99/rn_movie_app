import styled from "styled-components/native";
import {
  ScrollView,
  TouchableOpacity,
  SectionList,
  ViewToken,
} from "react-native";
import { useCallback, useRef, useState } from "react";
import Layout from "../components/Layout";
import TopTenLogo from "../assets/images/top_ten_logo.svg";
import { useQuery } from "@tanstack/react-query";
import {
  IGetTrendingMoviesResult,
  IGetTrendingTvShowsResult,
  getTrendingMovies,
  getTrendingTvShows,
} from "../utils/api";
import { AxiosError } from "axios";
import Loader from "../components/Loader";
import { SvgProps } from "react-native-svg";
import TrendingItem from "../components/TrendingItem";
import useGenres from "../hooks/useGenres";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TrendingStackParamList } from "../../App";

const Wrapper = styled.View`
  flex: 1;
  padding-top: 100px;
`;
const StatusBar = styled.View`
  padding: 0 15px;
  padding-bottom: 10px;
  height: 44px;
`;
const StatusItem = styled.View<{ $select: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding: 7px 15px;
  background-color: ${(props) => (props.$select ? "white" : "black")};
  border-radius: 20px;
`;
const StatusTitle = styled.Text<{ $select: boolean }>`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.$select ? "black" : "white")};
`;
const SectionHeader = styled.View`
  padding: 10px 0;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  background-color: black;
`;
const SectionHeaderText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
`;

interface IItem {
  category: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

interface ISection {
  index: number;
  Logo: React.FC<SvgProps>;
  title: string;
  data: readonly IItem[];
}

const STATUS = ["top 10 searies", "top 10 movies"];

export type TrendingPageProps = NativeStackScreenProps<
  TrendingStackParamList,
  "TrendingHome"
>;

const TrendingPage = ({ navigation }: TrendingPageProps) => {
  const sectionRef = useRef<SectionList<IItem, ISection>>(null);
  const statusRef = useRef<ScrollView>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  const changeScrollIndex = (index: number) => {
    setIsScroll(true);
    setScrollIndex(index);
    statusRef.current?.scrollTo({ x: 100 * index });
    sectionRef.current?.scrollToLocation({ sectionIndex: index, itemIndex: 0 });
    setTimeout(() => {
      setIsScroll(false);
    }, 500);
  };

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => 375,
    getSeparatorHeight: () => 0,
    getSectionHeaderHeight: () => 44,
    getSectionFooterHeight: () => 0,
  });

  const onViewableItemsChanged = (info: { viewableItems: ViewToken[] }) => {
    if (isScroll) return;
    const items = info.viewableItems;
    const section = items[items.length - 1].section as ISection;
    setScrollIndex(section.index);
  };

  const { data: trendingSearies, isLoading: seariesLoading } = useQuery<
    IGetTrendingTvShowsResult,
    AxiosError,
    ISection
  >({
    queryKey: ["trending", "tv"],
    queryFn: getTrendingTvShows,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (_data) => ({
      index: 0,
      Logo: TopTenLogo,
      title: "top 10 searies",
      data: _data.results.map((result) => ({
        ...result,
        title: result.name,
        category: "tv",
      })),
    }),
  });
  const { data: trendingMovies, isLoading: moviesLoading } = useQuery<
    IGetTrendingMoviesResult,
    AxiosError,
    ISection
  >({
    queryKey: ["trending", "movie"],
    queryFn: getTrendingMovies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (_data) => ({
      index: 1,
      Logo: TopTenLogo,
      title: "top 10 movies",
      data: _data.results.map((result) => ({ ...result, category: "movie" })),
    }),
  });
  const genres = useGenres();

  const goToDetail = useCallback(
    (id: number, title: string, imagePath: string, category: string) => {
      switch (category) {
        case "tv":
          navigation.navigate("TvShowDetail", { id, title, imagePath });
          break;
        case "movie":
          navigation.navigate("MovieDetail", { id, title, imagePath });
          break;
        default:
          break;
      }
    },
    []
  );

  const goSearch = () => {
    navigation.navigate("Search");
  };

  const goProfile = () => {
    navigation.navigate("Profile");
  };

  interface IRednderItemFnProps {
    item: IItem;
    index: number;
  }

  const renderItemFn = useCallback(
    ({ item, index }: IRednderItemFnProps) => (
      <TrendingItem
        id={item.id}
        index={index + 1 + ""}
        title={item.title}
        imagePath={item.backdrop_path}
        posterImagePath={item.poster_path}
        overview={item.overview}
        genres={
          item.genre_ids.map(
            (id) => genres.find((_genre) => _genre.id === id)?.name || ""
          ) || []
        }
        goToDetail={() =>
          goToDetail(item.id, item.title, item.backdrop_path, item.category)
        }
        isMovie={item.category === "movie"}
      />
    ),
    []
  );

  const isLoading = seariesLoading || moviesLoading;
  return (
    <Layout title="Hot" goSearch={goSearch} goProfile={goProfile}>
      <Wrapper>
        <StatusBar>
          <ScrollView
            ref={statusRef}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {STATUS.map((status, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.6}
                onPress={() => changeScrollIndex(index)}
              >
                <StatusItem $select={index === scrollIndex}>
                  <TopTenLogo width={20} height={20} />
                  <StatusTitle $select={index === scrollIndex}>
                    {status}
                  </StatusTitle>
                </StatusItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </StatusBar>
        {isLoading ? <Loader size="small" /> : null}
        {trendingSearies && trendingMovies ? (
          <SectionList
            disableVirtualization={false}
            initialNumToRender={40}
            ref={sectionRef}
            onViewableItemsChanged={onViewableItemsChanged}
            getItemLayout={getItemLayout as any}
            sections={[trendingSearies, trendingMovies]}
            keyExtractor={(item, index) => item.title + index + ""}
            renderSectionHeader={({ section: { title, Logo } }) => (
              <SectionHeader>
                <Logo width={24} height={24} />
                <SectionHeaderText>{title}</SectionHeaderText>
              </SectionHeader>
            )}
            renderItem={renderItemFn}
            stickySectionHeadersEnabled={true}
          />
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default TrendingPage;
