import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 0.8;
  justify-content: center;
`;

type Size = "small" | "large";

interface ILoaderProps {
  size: Size;
}

const Loader = ({ size = "small" }: ILoaderProps) => {
  return (
    <Wrapper>
      <ActivityIndicator size={size} />
    </Wrapper>
  );
};

export default Loader;
