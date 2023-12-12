import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import TvShowPage from "./src/pages/TvShowPage";
import MoviePage from "./src/pages/MoviePage";
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
import { useEffect, useLayoutEffect } from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import ProfilePage from "./src/pages/ProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type iconNames = "movie" | "live-tv" | "video-collection";

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
  Search: undefined;
  Profile: undefined;
  MovieDetail: { id: number; title: string; imagePath: string };
  TvShowDetail: { id: number; title: string; imagePath: string };
  Webview: { path: string };
};
const MovieStack = createNativeStackNavigator<MovieStackParamList>();

type MovieStackScreenProps = BottomTabScreenProps<
  TabNavigatorParamList,
  "Movie"
>;

function MovieStackScreen({ route, navigation }: MovieStackScreenProps) {
  useLayoutEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    if (focusedRoute === "Search") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          height: 90,
          padding: 10,
          backgroundColor: "black",
          borderTopWidth: 0,
        },
      });
    }
  }, [route, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <MovieStack.Navigator
        initialRouteName="MovieHome"
        screenOptions={{ headerShown: false }}
      >
        <MovieStack.Group>
          <MovieStack.Screen name="MovieHome" component={MoviePage} />
          <MovieStack.Screen
            name="Search"
            component={SearchPage}
            options={{ animation: "none" }}
          />
          <MovieStack.Screen name="Profile" component={ProfilePage} />
        </MovieStack.Group>
        <MovieStack.Group screenOptions={{ presentation: "modal" }}>
          <MovieStack.Screen name="MovieDetail" component={MovieDetailPage} />
          <MovieStack.Screen name="TvShowDetail" component={TvShowDetailPage} />
        </MovieStack.Group>
        <MovieStack.Group screenOptions={webviewHeaderConfig}>
          <MovieStack.Screen name="Webview" component={WebviewPage} />
        </MovieStack.Group>
      </MovieStack.Navigator>
    </View>
  );
}

export type TvShowStackParamList = {
  TvShowHome: undefined;
  Search: undefined;
  Profile: undefined;
  MovieDetail: { id: number; title: string; imagePath: string };
  TvShowDetail: { id: number; title: string; imagePath: string };
  Webview: { path: string };
};

const TvShowStack = createNativeStackNavigator<TvShowStackParamList>();

type TvShowStackScreenProps = BottomTabScreenProps<
  TabNavigatorParamList,
  "Tv Show"
>;

function TvShowStackScreen({ route, navigation }: TvShowStackScreenProps) {
  useLayoutEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    if (focusedRoute === "Search") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          height: 90,
          padding: 10,
          backgroundColor: "black",
          borderTopWidth: 0,
        },
      });
    }
  }, [route, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <TvShowStack.Navigator
        initialRouteName="TvShowHome"
        screenOptions={{ headerShown: false }}
      >
        <TvShowStack.Group>
          <TvShowStack.Screen name="TvShowHome" component={TvShowPage} />
          <TvShowStack.Screen
            name="Search"
            component={SearchPage}
            options={{ animation: "none" }}
          />
          <TvShowStack.Screen name="Profile" component={ProfilePage} />
        </TvShowStack.Group>
        <TvShowStack.Group screenOptions={{ presentation: "modal" }}>
          <TvShowStack.Screen name="MovieDetail" component={MovieDetailPage} />
          <TvShowStack.Screen
            name="TvShowDetail"
            component={TvShowDetailPage}
          />
        </TvShowStack.Group>
        <TvShowStack.Group screenOptions={webviewHeaderConfig}>
          <TvShowStack.Screen name="Webview" component={WebviewPage} />
        </TvShowStack.Group>
      </TvShowStack.Navigator>
    </View>
  );
}

export type TrendingStackParamList = {
  TrendingHome: undefined;
  Search: undefined;
  Profile: undefined;
  MovieDetail: { id: number; title: string; imagePath: string };
  TvShowDetail: { id: number; title: string; imagePath: string };
  Webview: { path: string };
};

const TrendingStack = createNativeStackNavigator<TrendingStackParamList>();

type TrendingStackScreenProps = BottomTabScreenProps<
  TabNavigatorParamList,
  "Hot"
>;

function TrendingStackScreen({ route, navigation }: TrendingStackScreenProps) {
  useLayoutEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(route);
    if (focusedRoute === "Search") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          height: 90,
          padding: 10,
          backgroundColor: "black",
          borderTopWidth: 0,
        },
      });
    }
  }, [route, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <TrendingStack.Navigator
        initialRouteName="TrendingHome"
        screenOptions={{ headerShown: false }}
      >
        <TrendingStack.Group>
          <TrendingStack.Screen name="TrendingHome" component={TrendingPage} />
          <TrendingStack.Screen
            name="Search"
            component={SearchPage}
            options={{ animation: "none" }}
          />
          <TrendingStack.Screen name="Profile" component={ProfilePage} />
        </TrendingStack.Group>
        <TrendingStack.Group screenOptions={{ presentation: "modal" }}>
          <TrendingStack.Screen
            name="MovieDetail"
            component={MovieDetailPage}
          />
          <TrendingStack.Screen
            name="TvShowDetail"
            component={TvShowDetailPage}
          />
        </TrendingStack.Group>
        <TrendingStack.Group screenOptions={webviewHeaderConfig}>
          <TrendingStack.Screen name="Webview" component={WebviewPage} />
        </TrendingStack.Group>
      </TrendingStack.Navigator>
    </View>
  );
}

type TabNavigatorParamList = {
  Movie: undefined;
  "Tv Show": undefined;
  Hot: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const queryClient = new QueryClient();

const TabNavigator = () => {
  const setTabRouteName = useSetRecoilState(tabRouteNameAtom);
  const setSearchQuery = useSetRecoilState(searchQueryAtom);

  return (
    <Tab.Navigator
      initialRouteName="Movie"
      detachInactiveScreens={false}
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
      screenListeners={({ route }) => ({
        tabPress: () => {
          setTabRouteName(route.name || "");
          setSearchQuery("");
        },
      })}
    >
      <Tab.Screen name="Movie" component={MovieStackScreen} />
      <Tab.Screen name="Tv Show" component={TvShowStackScreen} />
      <Tab.Screen name="Hot" component={TrendingStackScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    enableScreens(false);
  }, []);

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
