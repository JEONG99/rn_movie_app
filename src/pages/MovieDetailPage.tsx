import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { IGetMovieDetailResult, getMovieDetail } from "../utils/api";
import DetailLayout from "../components/DetailLayout";

type DetailPageProps = NativeStackScreenProps<StackParamList, "Detail">;

const MovieDetailPage = ({ route, navigation }: DetailPageProps) => {
  const { id, title, imagePath } = route.params;
  const { data, isLoading } = useQuery<IGetMovieDetailResult>({
    queryKey: ["movie", "detail", id],
    queryFn: () => getMovieDetail({ id }),
    refetchOnWindowFocus: false,
  });

  return (
    <DetailLayout imagePath={imagePath} title={title} tagLine={data?.tagline}>
      <Text style={{ color: "white" }}>{data?.release_date}</Text>
    </DetailLayout>
  );
};

export default MovieDetailPage;
