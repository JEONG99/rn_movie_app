import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";
import { MovieStackParamList, SearchStackParamList } from "../../App";
import HeaderLeft from "../components/HeaderLeft";
import HeaderRight from "../components/HeaderRight";
import styled from "styled-components/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Wrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

type WebviewPageProps =
  | NativeStackScreenProps<MovieStackParamList, "Webview">
  | NativeStackScreenProps<SearchStackParamList, "Webview">;

const WebviewPage = ({ navigation, route }: WebviewPageProps) => {
  const { path } = route.params;
  const webviewRef = useRef<WebView>(null);
  const [navState, setNavState] = useState<WebViewNavigation>();

  useEffect(() => {
    if (!navState) return;
    const canGoBack = navState.canGoBack;

    const onPress = () => {
      if (canGoBack) {
        webviewRef.current?.goBack();
      }
    };

    navigation.setOptions({
      title: path,
      headerLeft: () => (canGoBack ? <HeaderLeft onPress={onPress} /> : null),
    });
  }, [navState]);

  useEffect(() => {
    const onPressRefresh = () => {
      webviewRef.current?.reload();
    };
    const onPressClose = () => {
      navigation.goBack();
    };

    navigation.setOptions({
      title: path,
      headerRight: () => (
        <HeaderRight
          onPressRefresh={onPressRefresh}
          onPressClose={onPressClose}
        />
      ),
    });
  }, []);

  return (
    <Wrapper>
      <WebView
        ref={webviewRef}
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
        }}
        source={{ uri: path }}
        onNavigationStateChange={(e) => setNavState(e)}
        mediaPlaybackRequiresUserAction={true}
        onContentProcessDidTerminate={() => {
          webviewRef.current?.reload();
        }}
      />
    </Wrapper>
  );
};

export default WebviewPage;
