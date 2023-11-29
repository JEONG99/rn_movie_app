import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import TvShowPage from "./src/pages/TvShowPage";
import MoviePage from "./src/pages/MoviePage";
import { iconNames } from "./src/components/Layout";
import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";
import MovieDetailPage from "./src/pages/MovieDetailPage";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";

export type StackParamList = {
  Home: undefined;
  Detail: { id: number; title: string; imagePath: string };
};
export type HomePageProps = NativeStackScreenProps<StackParamList, "Home">;

const MovieStack = createNativeStackNavigator<StackParamList>();

function MovieStackScreen() {
  return (
    <MovieStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <MovieStack.Group>
        <MovieStack.Screen name="Home" component={MoviePage} />
      </MovieStack.Group>
      <MovieStack.Group screenOptions={{ presentation: "modal" }}>
        <MovieStack.Screen name="Detail" component={MovieDetailPage} />
      </MovieStack.Group>
    </MovieStack.Navigator>
  );
}

const TvShowStack = createNativeStackNavigator<StackParamList>();

function TvShowStackScreen() {
  return (
    <TvShowStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <TvShowStack.Group>
        <TvShowStack.Screen name="Home" component={TvShowPage} />
      </TvShowStack.Group>
      <TvShowStack.Group screenOptions={{ presentation: "modal" }}>
        <TvShowStack.Screen name="Detail" component={MovieDetailPage} />
      </TvShowStack.Group>
    </TvShowStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <NavigationContainer>
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
            >
              <Tab.Screen name="Movie" component={MovieStackScreen} />
              <Tab.Screen name="Tv Show" component={TvShowStackScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
