import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Wrapper = styled.View`
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

interface IHeaderRightProps {
  onPressRefresh: () => void;
  onPressClose: () => void;
}

const HeaderRight = ({ onPressRefresh, onPressClose }: IHeaderRightProps) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onPressRefresh}>
        <MaterialIcons name="refresh" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressClose}>
        <MaterialIcons name="close" size={26} color="white" />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default HeaderRight;
