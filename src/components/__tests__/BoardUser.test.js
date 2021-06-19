import { render, waitFor } from "@testing-library/react";
import BoardUser from "../user/BoardUser";

describe("BoardUser component", () => {
  it("should render BoardUser component with texts", async () => {
    const setup = async () => {
      const component = render(<BoardUser contentProp={"Public content"} />);
      await waitFor(
        () => expect(component.getAllByText(/Public content/i)).toBeInTheDocument(),
        { timeout: 100 }
      );
      await waitFor(
        () => expect(component.getAllByText(/Welcome!/i)).toBeInTheDocument(),
        { timeout: 100 }
      );
      return component;
    };
  });
});
