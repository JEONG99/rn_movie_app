import { Dimensions, ImageBackground, View } from "react-native";
import styled from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HomePageProps } from "../../App";

const WIDTH = Dimensions.get("window").width;
const IMAGE_RATIO = WIDTH / 500;

const Wrapper = styled.View`
  position: relative;
  flex: 1;
  background-color: black;
`;
const Close = styled.TouchableOpacity`
  position: absolute;
  top: 6px;
  right: 6px;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: rgb(33, 33, 33);
  border-radius: 50%;
`;
const TextBox = styled.View`
  margin-top: -20px;
  gap: 2px;
`;
const Title = styled.Text`
  font-size: 42px;
  font-weight: 700;
  line-height: 42px;
  color: white;
`;
const TagLine = styled.Text`
  font-size: 20px;
  color: rgb(186, 186, 186);
`;

interface IDetailLayoutProps {
  imagePath: string;
  title: string;
  tagLine: string | undefined;
  children: any;
}

const DetailLayout = ({
  imagePath,
  title,
  tagLine,
  children,
}: IDetailLayoutProps) => {
  const navigation = useNavigation<HomePageProps["navigation"]>();
  const goBackHome = () => {
    navigation.goBack();
  };

  return (
    <Wrapper>
      <View
        style={{
          width: WIDTH,
          height: 281 * IMAGE_RATIO,
        }}
      >
        <ImageBackground
          style={{ flex: 1 }}
          resizeMode="cover"
          source={{ uri: makeImagePath(imagePath, "w500") }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            style={{ flex: 1 }}
          />
        </ImageBackground>
        <Close onPress={goBackHome}>
          <AntDesign name="close" size={22} color="white" />
        </Close>
      </View>
      <TextBox>
        <Title>{title}</Title>
        {tagLine ? <TagLine>{tagLine}</TagLine> : null}
      </TextBox>
      {children}
    </Wrapper>
  );
};

export default DetailLayout;
