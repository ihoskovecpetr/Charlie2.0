import styled from "styled-components";

export const NEXT = "NEXT";
export const PREV = "PREV";

export const Item = styled.div`
  text-align: center;
  padding: 0px;
  touch-action: inherit;
  //height: ${(props) => `${1*props.heightHook}px`};
  position: absolute;
  background-image: ${props => `url(${props.img})`};
  background-size: cover;
  width: 100%;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
    },
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const CarouselContainer = styled.div`
  display: flex;
  // height: ${(props) => `${1*props.heightHook}px`};
  overflow: auto;
  transition: ${props => (props.sliding ? "none" : "transform 0.5s ease")};
  transform: ${props => {
    if (!props.sliding) return "translateX(calc(-100%))";
    if (props.dir === PREV) return "translateX(calc(2 * (-100%)))";
    return "translateX(0%)";
  }};
`;

export const CarouselSlot = styled.div`
  touch-action: ${props => (props.transforming ? "none" : "auto")};
  flex: 1 0 100%;
  flex-basis: 100%;
  margin-right: 0px;
  order: ${props => props.order};
`;


export const Wrapper = styled.div`
  width: 100%;
  //height: 100%;
  overflow: hidden;
  box-shadow: 5px 5px 20px 7px rgba(168, 168, 168, 1);
`;


export const ButtonBlock = styled.div`
  position: relative;
  top: -35vh;
`;

export const SlideButton = styled.button`
    color: #ffffff;
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 100;
    padding: 0px;
    height: 80px;
    background-color: rgba(0,0,0,0.3);
    border-radius: 15px;
    border-top-left-radius: ${props => props.float == "left" && '0px'};
    border-top-right-radius: ${props => props.float == "right" && '0px'};
    border-bottom-left-radius: ${props => props.float == "left" && '0px'};
    border-bottom-right-radius: ${props => props.float == "right" && '0px'};
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin-top: 0px;
    text-decoration: none;
    float: ${props => props.float};

  &:active {
    position: relative;
    top: 1px;
  }
  &:focus {
    outline: 0;
  }
`;

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 100%;
  height: 100%;
`;

// export const ExtraInfo = styled.div`
// margin-top: 25px;
// display: inline-block;
// `;

export const Code = styled.code`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  margin: 0;
  padding: 0.2em 0.4em;
`;
