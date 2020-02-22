import React, { useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { useSwipeable } from "react-swipeable";
import { withRouter, useHistory } from "react-router-dom";

import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  SlideButton,
  ButtonBlock,
  PREV,
  NEXT
} from "./components";
import SettingsPanel from "./SettingsPanel"


const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};
const initialState = { pos: 0, sliding: false, transforming: false, dir: NEXT };

const Carousel = ({children, setPosition, heightHook, getPlayEventsMutation}) => {
  const classes = useStyles();
  let history = useHistory();
  const [close, setClose] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const numItems = React.Children.count(children);

  const slide = dir => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
    setTimeout(() => {
      dispatch({ type: "stopTransforming" });
    }, 500);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  return (
    <div {...handlers}>
      <Wrapper onClick={() => console.log("Wraper click")}>
        <div className={classes.eggContainerWrap}>
          <SettingsPanel state={state} getPlayEventsMutation={getPlayEventsMutation} numItems={numItems} />
        </div>
        <CarouselContainer dir={state.dir} sliding={state.sliding} heightHook={heightHook}>
          {React.Children.map(children, (child, index) => (
            <CarouselSlot
              key={index}
              order={getOrder({ index: index, pos: state.pos, numItems })}
              transforming={state.transforming}
            >
              {child}
            </CarouselSlot>
          ))}
        </CarouselContainer>
      </Wrapper>
      <ButtonBlock>
      <SlideButton onClick={() => {
        slide(PREV)}} float="left">
          <ArrowLeftIcon fontSize="large" />
      </SlideButton>
      <SlideButton onClick={() => {
        slide(NEXT)}} float="right">
          <ArrowRightIcon fontSize="large" />
      </SlideButton>
      
      </ButtonBlock>
    </div>
  );
};

function reducer(state, { type, numItems }) {
  console.log(state)
  switch (type) {
    case "reset":
      return initialState;
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        transforming: true,
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        transforming: true,
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1
      };
    case "stopSliding":
      return { ...state, sliding: false };
    case "stopTransforming":
      return { ...state, transforming: false };
    default:
      return state;
  }
}


const useStyles = makeStyles(theme => ({
  eggContainerWrap: {
    width: '100%',
    height: "0px", 
    zIndex: 100,
  },
  eggContainerTop: {
    // height: "36px", //"16"
    width: '100%',
    zIndex: 100,
    paddingTop: "2px",
    paddingBottom: "2px",
    //top: '30px',
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  itm:{
    padding: 0,
    height: '100%', 
    width: '100%', 
  },
  egg:{
    width: '90%',
    height: '8px',
    backgroundColor: "grey",
    margin: '5%',
    marginTop: '4px',
    marginBottom: '4px',
    borderRadius: "4px"
  },
  white:{
    backgroundColor: "white",
  },
  red:{
    backgroundColor: "red",
  },
  blue:{
    backgroundColor: "blue",

  },
  closeCross: {
    color: "white",
  },
  whiteBordered: {
    border: "1px solid white",
    borderRadius: 10
  }
}));

export default withRouter(Carousel)
