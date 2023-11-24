import { ScrollView } from "react-native";
import Layout from "../components/Layout";
import TvShowSlider from "../components/TvShowSlider";

const TvShowPage = () => {
  return (
    <Layout title="Tv Show">
      <ScrollView>
        <TvShowSlider
          category={{ key: "airing_today", name: "Airing Today" }}
        />
        <TvShowSlider category={{ key: "on_the_air", name: "On The Air" }} />
        <TvShowSlider category={{ key: "popular", name: "Popular" }} />
        <TvShowSlider
          category={{ key: "top_rated", name: "Top Rated" }}
          last={true}
        />
      </ScrollView>
    </Layout>
  );
};

export default TvShowPage;
