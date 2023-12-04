import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const Wrapper = styled.TouchableOpacity`
  margin-right: 20px;
`;

interface IHeaderLeftProps {
  onPress: () => void;
}

const HeaderLeft = ({ onPress }: IHeaderLeftProps) => {
  return (
    <Wrapper onPress={onPress}>
      <MaterialIcons name="arrow-back" size={26} color="white" />
    </Wrapper>
  );
};

export default HeaderLeft;
