import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";
import TvShowPage from "./src/pages/TvShowPage";
import MoviePage from "./src/pages/MoviePage";
import { iconNames } from "./src/components/Layout";
import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";

const MovieStack = createNativeStackNavigator();

function MovieStackScreen() {
  return (
    <MovieStack.Navigator
      initialRouteName="Base"
      screenOptions={{ headerShown: false }}
    >
      <MovieStack.Screen name="Base" component={MoviePage} />
    </MovieStack.Navigator>
  );
}

const TvShowStack = createNativeStackNavigator();

function TvShowStackScreen() {
  return (
    <TvShowStack.Navigator
      initialRouteName="Base"
      screenOptions={{ headerShown: false }}
    >
      <TvShowStack.Screen name="Base" component={TvShowPage} />
    </TvShowStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
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
  );
}
