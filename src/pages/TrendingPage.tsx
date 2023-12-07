import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, SectionList } from "react-native";
import { useRef, useState } from "react";
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
  Logo: React.FC<SvgProps>;
  title: string;
  data: readonly IItem[];
}

const STATUS = ["top 10 searies", "top 10 movies"];

const TrendingPage = () => {
  const statusRef = useRef<ScrollView>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const changeScrollIndex = (index: number) => {
    setScrollIndex(index);
    statusRef.current?.scrollTo({ x: 100 * index });
  };

  const { data: trendingSearies, isLoading: seariesLoading } = useQuery<
    IGetTrendingTvShowsResult,
    AxiosError,
    ISection
  >({
    queryKey: ["trending", "tv"],
    queryFn: getTrendingTvShows,
    refetchOnWindowFocus: false,
    select: (_data) => ({
      Logo: TopTenLogo,
      title: "top 10 searies",
      data: _data.results.map((result) => ({ ...result, title: result.name })),
    }),
  });
  const { data: trendingMovies, isLoading: moviesLoading } = useQuery<
    IGetTrendingMoviesResult,
    AxiosError,
    ISection
  >({
    queryKey: ["trending", "movie"],
    queryFn: getTrendingMovies,
    refetchOnWindowFocus: false,
    select: (_data) => ({
      Logo: TopTenLogo,
      title: "top 10 movies",
      data: _data.results.map((result) => ({ ...result })),
    }),
  });

  const isLoading = seariesLoading || moviesLoading;
  return (
    <Layout title="Hot">
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
            sections={[trendingSearies, trendingMovies]}
            keyExtractor={(item, index) => item.title + index + ""}
            renderSectionHeader={({ section: { title, Logo } }) => (
              <SectionHeader>
                <Logo width={24} height={24} />
                <SectionHeaderText>{title}</SectionHeaderText>
              </SectionHeader>
            )}
            renderItem={({ item }) => <TrendingItem />}
            stickySectionHeadersEnabled
          />
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default TrendingPage;
