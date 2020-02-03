import React from "react";
import ReactDOM from "react-dom";
import FlippingLogo from "../logo";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";
import Logo from "../logo";
//import "jest-styled-components";

//import "@testing-library/jest-dom";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FlippingLogo></FlippingLogo>, div);
});

it("renders correctly", () => {
  const { getByTestId } = render(<FlippingLogo height={100} width={100} />);
  expect(getByTestId("logo")).toHaveClass("flip-card");
});

it("renders correctly", () => {
  const { getByTestId } = render(<FlippingLogo height={80} width={80} />);
  expect(getByTestId("logo")).toHaveClass("flip-card");
});

it("Matches snapshot", () => {
  const tree = renderer
    .create(<FlippingLogo height={80} width={80} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
