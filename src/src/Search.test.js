import React from "react";
import { render } from "@testing-library/react";
import Search from "./Search";

// smoke test
it("renders without crashing", function() {
  render(<Search />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Search />);
  expect(asFragment()).toMatchSnapshot();
});

it("will show appropriate elements", function() {
    const search = render(<Search />);

    expect(search.queryByText("Search")).toBeInTheDocument();
    expect(search.getByTestId("my-input")).toBeInTheDocument();
});

