import { render, waitFor } from "@testing-library/react";
import App from "../../App";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: "/",
    search: "",
    hash: "",
  }),
}));

describe("App component", () => {
  it("should render Home component as it is entry point of project", async () => {
    const setup = async () => {
      const component = render(<App />);
      await waitFor(
        () => expect(component.getAllByText(/Public content/i)).toBeInTheDocument(),
        { timeout: 100 }
      );
      return component;
    };
  });
});
