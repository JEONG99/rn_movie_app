import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";
import { headerBackgroundShowAtom } from "../utils/atom";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Header = styled.View<{ $show: boolean }>`
  position: absolute;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  padding: 40px 20px;
  padding-bottom: 10px;
  width: 100%;

  background-color: black;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: all 0.3s ease;
`;
const HeaderText = styled.Text`
  font-size: 38px;
  font-weight: 600;
  color: white;
`;

export type iconNames = "movie" | "live-tv";

const icons: {
  [key: string]: iconNames;
} = {
  Movie: "movie",
  "Tv Show": "live-tv",
};

interface ILayoutProps {
  children: any;
  title: string;
}

const Layout = ({ children, title }: ILayoutProps) => {
  const showBackground = useRecoilValue(headerBackgroundShowAtom);

  return (
    <Container>
      <Header $show={showBackground}>
        <MaterialIcons name={icons[title]} size={36} color="white" />
        <HeaderText>{title}</HeaderText>
      </Header>
      {children}
    </Container>
  );
};

export default Layout;
