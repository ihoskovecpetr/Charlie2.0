import React from "react";
import { Item, AppContainer, Code } from "./components";
import Carousel from "./Carousel";
import { useWindowSize } from "../../../Hooks/useWindowSize";


function CarouselWrap({children, getPlayEventsMutation}) {
  const windowSize = useWindowSize()

  console.log("Childern Carousel WRp: ", children);

  return (
    <AppContainer>
      <Carousel title="Carousel" heightHook={windowSize.height} getPlayEventsMutation={getPlayEventsMutation}> 

            <Item heightHook={windowSize.height}>
              {children[0]}
            </Item>

      {children[1].map((item, index) => (
            <Item key={index} heightHook={windowSize.height}>
              {item}
            </Item>
          )
      )}
      </Carousel>
    </AppContainer>
  );
}

export default CarouselWrap