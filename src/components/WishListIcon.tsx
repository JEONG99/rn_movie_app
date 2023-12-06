import { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
import { Feather } from "@expo/vector-icons";

interface IWishListIconProps {
  size?: number;
  color?: string;
  isChecked: boolean;
}

const WishListIcon = ({
  size = 26,
  color = "white",
  isChecked,
}: IWishListIconProps) => {
  const [isCheckedAnim, setIsCheckedAnim] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotateRight = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateLeft = () => {
    Animated.timing(rotateAnim, {
      toValue: -1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isChecked) {
      setTimeout(() => {
        setIsCheckedAnim(true);
      }, 200);
      rotateRight();
    } else {
      setTimeout(() => {
        setIsCheckedAnim(false);
      }, 100);
      rotateLeft();
    }
  }, [isChecked]);

  useEffect(() => {
    rotateAnim.setValue(isChecked ? 1 : -1);
    setIsCheckedAnim(isChecked);
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotateZ: rotateAnim.interpolate({
              inputRange: [-1, 1],
              outputRange: ["-70deg", "70deg"],
            }),
          },
        ],
      }}
    >
      <Feather
        name={isCheckedAnim ? "check" : "plus"}
        size={size}
        color={color}
        style={{
          transform: isCheckedAnim
            ? [{ rotateZ: "-70deg" }]
            : [{ rotateZ: "70deg" }],
        }}
      />
    </Animated.View>
  );
};

export default WishListIcon;
