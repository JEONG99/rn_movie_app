import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
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
import { searchQueryAtom, tabRouteNameAtom } from "./src/utils/atom";
import TvShowDetailPage from "./src/pages/TvShowDetailPage";
import SearchPage from "./src/pages/SearchPage";
import WebviewPage from "./src/pages/WebviewPage";
import TrendingPage from "./src/pages/TrendingPage";

const webviewHeaderConfig: NativeStackNavigationOptions = {
  headerBackVisible: false,
  headerShown: true,
  headerStyle: {
    backgroundColor: "black",
  },
  headerTintColor: "#ffffff",
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 14,
  },
  presentation: "fullScreenModal",
};

export type MovieStackParamList = {
  MovieHome: undefined;
  Detail: { id: number; title: string; imagePath: string };
  Webview: { path: string };
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
      <MovieStack.Group screenOptions={webviewHeaderConfig}>
        <MovieStack.Screen name="Webview" component={WebviewPage} />
      </MovieStack.Group>
    </MovieStack.Navigator>
  );
}

export type TvShowStackParamList = {
  TvShowHome: undefined;
  Detail: { id: number; title: string; imagePath: string };
  Webview: { path: string };
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
        <TvShowStack.Screen name="Detail" component={TvShowDetailPage} />
      </TvShowStack.Group>
      <TvShowStack.Group screenOptions={webviewHeaderConfig}>
        <TvShowStack.Screen name="Webview" component={WebviewPage} />
      </TvShowStack.Group>
    </TvShowStack.Navigator>
  );
}

export type SearchStackParamList = {
  SearchHome: undefined;
  MovieDetail: { id: number; title: string; imagePath: string };
  TvShowDetail: { id: number; title: string; imagePath: string };
  Webview: { path: string };
};

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      initialRouteName="SearchHome"
      screenOptions={{ headerShown: false }}
    >
      <SearchStack.Group>
        <SearchStack.Screen name="SearchHome" component={SearchPage} />
      </SearchStack.Group>
      <SearchStack.Group screenOptions={{ presentation: "modal" }}>
        <SearchStack.Screen name="MovieDetail" component={MovieDetailPage} />
        <SearchStack.Screen name="TvShowDetail" component={TvShowDetailPage} />
      </SearchStack.Group>
      <SearchStack.Group screenOptions={webviewHeaderConfig}>
        <SearchStack.Screen name="Webview" component={WebviewPage} />
      </SearchStack.Group>
    </SearchStack.Navigator>
  );
}

export type TrendingStackParamList = {
  TrendingHome: undefined;
  MovieDetail: { id: number; title: string; imagePath: string };
  TvShowDetail: { id: number; title: string; imagePath: string };
  Webview: { path: string };
};

const TrendingStack = createNativeStackNavigator<TrendingStackParamList>();

function TrendingStackScreen() {
  return (
    <TrendingStack.Navigator
      initialRouteName="TrendingHome"
      screenOptions={{ headerShown: false }}
    >
      <TrendingStack.Group>
        <TrendingStack.Screen name="TrendingHome" component={TrendingPage} />
      </TrendingStack.Group>
      <TrendingStack.Group screenOptions={{ presentation: "modal" }}>
        <TrendingStack.Screen name="MovieDetail" component={MovieDetailPage} />
        <TrendingStack.Screen
          name="TvShowDetail"
          component={TvShowDetailPage}
        />
      </TrendingStack.Group>
      <TrendingStack.Group screenOptions={webviewHeaderConfig}>
        <TrendingStack.Screen name="Webview" component={WebviewPage} />
      </TrendingStack.Group>
    </TrendingStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const TabNavigator = () => {
  const setTabRouteName = useSetRecoilState(tabRouteNameAtom);
  const setSearchQuery = useSetRecoilState(searchQueryAtom);

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
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Hot") {
            iconName = "video-collection";
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
          setSearchQuery("");
        },
      }}
    >
      <Tab.Screen name="Movie" component={MovieStackScreen} />
      <Tab.Screen name="Tv Show" component={TvShowStackScreen} />
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Hot" component={TrendingStackScreen} />
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
