import React from "react";
import { Item, AppContainer, Code } from "./components";
import Carousel from "./Carousel";
import { useWindowSize } from "../../../Hooks/useWindowSize";


function CarouselWrap({children}) {
  const windowSize = useWindowSize()

  return (
    <AppContainer>
      <Carousel title="Carousel" heightHook={windowSize.height}> 
      {children.map((item, index) => (
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