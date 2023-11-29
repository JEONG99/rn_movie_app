import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import TvShowPage from "./src/pages/TvShowPage";
import MoviePage from "./src/pages/MoviePage";
import { iconNames } from "./src/components/Layout";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { StatusBar } from "expo-status-bar";
import MovieDetailPage from "./src/pages/MovieDetailPage";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { tabRouteNameAtom } from "./src/utils/atom";

export type MovieStackParamList = {
  MovieHome: undefined;
  Detail: { id: number; title: string; imagePath: string };
};
const MovieStack = createNativeStackNavigator<MovieStackParamList>();

function MovieStackScreen() {
  return (
    <MovieStack.Navigator
      initialRouteName="MovieHome"
      screenOptions={{ headerShown: false }}
    >
      <MovieStack.Group>
        <MovieStack.Screen name="MovieHome" component={MoviePage} />
      </MovieStack.Group>
      <MovieStack.Group screenOptions={{ presentation: "modal" }}>
        <MovieStack.Screen name="Detail" component={MovieDetailPage} />
      </MovieStack.Group>
    </MovieStack.Navigator>
  );
}

export type TvShowStackParamList = {
  TvShowHome: undefined;
  Detail: { id: number; title: string; imagePath: string };
};

const TvShowStack = createNativeStackNavigator<TvShowStackParamList>();

function TvShowStackScreen() {
  return (
    <TvShowStack.Navigator
      initialRouteName="TvShowHome"
      screenOptions={{ headerShown: false }}
    >
      <TvShowStack.Group>
        <TvShowStack.Screen name="TvShowHome" component={TvShowPage} />
      </TvShowStack.Group>
      <TvShowStack.Group screenOptions={{ presentation: "modal" }}>
        <TvShowStack.Screen name="Detail" component={MovieDetailPage} />
      </TvShowStack.Group>
    </TvShowStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const TabNavigator = () => {
  const setTabRouteName = useSetRecoilState(tabRouteNameAtom);

  return (
    <Tab.Navigator
      initialRouteName="Movie"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
        },
        tabBarStyle: {
          height: 90,
          padding: 10,
          backgroundColor: "black",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = "movie";
          if (route.name === "Movie") {
            iconName = "movie";
          } else if (route.name === "Tv Show") {
            iconName = "live-tv";
          }

          return (
            <MaterialIcons
              name={iconName as iconNames}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
      })}
      screenListeners={{
        tabPress: (e) => {
          setTabRouteName(e.target || "");
        },
      }}
    >
      <Tab.Screen name="Movie" component={MovieStackScreen} />
      <Tab.Screen name="Tv Show" component={TvShowStackScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
