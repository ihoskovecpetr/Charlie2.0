import React from "react";
import { useSwipeable } from "react-swipeable";
import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  SlideButton,
  ButtonBlock,
  PREV,
  NEXT
} from "./components";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';



const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};
const initialState = { pos: 0, sliding: false, dir: NEXT };

const Carousel = ({children, setPosition, heightHook}) => {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const numItems = React.Children.count(children);

  const slide = dir => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
  };

  document.getElementById("paperEvent").style.touchAction = "none";
  console.log("DD ", document.getElementById("paperEvent").style)

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
      <Grid container className={classes.eggContainerTop}>
            <Grid item 
                  xs={4} 
                  className={classes.itm}
                  >
              <div className={clsx(classes.egg, state.pos === 0 && classes.white)}></div>
            </Grid>
            <Grid item 
                  xs={4} 
                  className={classes.itm}
                  >
              <div className={clsx(classes.egg, state.pos === 1 && classes.white)}></div>
            </Grid>
            <Grid item 
                  xs={4} 
                  className={classes.itm}
                  >
              <div className={clsx(classes.egg, state.pos === 2 && classes.white)}></div>
            </Grid>
          </Grid>
          </div>
        <CarouselContainer dir={state.dir} sliding={state.sliding} heightHook={heightHook}>
          {React.Children.map(children, (child, index) => (
            <CarouselSlot
              key={index}
              order={getOrder({ index: index, pos: state.pos, numItems })}
              sliding={state.sliding}
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
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1
      };
    case "stopSliding":
      return { ...state, sliding: false };
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
    height: "16px", 
    width: '100%',
    zIndex: 100,
    //marginTop: "8vh",
    //top: '30px',
    position: "relative",
    // backgroundColor: "rgba(0,0,0,0.3)",
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
}));

export default Carousel;
