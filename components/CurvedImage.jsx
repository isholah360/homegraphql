import React from "react";
import { View, Image, Dimensions } from "react-native";
import Svg, { Path, Defs, ClipPath } from "react-native-svg";

const { width } = Dimensions.get("window");
const height = 400; // Adjust the height based on your design

const CurvedImage = ({ source }) => {
  return (
    <View style={{ width, height }}>
      <Svg height={height} width={width}>
        <Defs>
          <ClipPath id="clip">
            <Path
              d={`
                M0 0
                H${width}
                V${height - 40}
                C${width * 0.8} ${height - 30}
                ${width * 0.2} ${height - 30}
                0 ${height - 60}
                Z
              `}
            />
          </ClipPath>
        </Defs>
        <Image
          width={width}
          height={height}
          href={source}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#clip)"
        />
      </Svg>
    </View>
  );
};

export default CurvedImage;
