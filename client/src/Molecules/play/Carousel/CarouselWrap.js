import React from "react";
import { Item, AppContainer, Code } from "./components";
import Carousel from "./Carousel";

function CarouselWrap({children}) {
  return (
    <AppContainer>
      <Carousel title="Carousel"> 
      {children.map((item, index) => (
            <Item key={index}>
              {item}
            </Item>
          )
      )}
      </Carousel>
    </AppContainer>
  );
}

export default CarouselWrap