import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";

import Login from "../user/Login";

jest.mock("axios");

afterEach(() => {
  cleanup();
});

describe("Login component", () => {
  const createChangeEvent = (value) => ({ target: { value } }); // custom hook to manipulate input change

  const setup = async () => {
    const component = render(<Login />);
    await waitFor(() => expect(component.getByText(/username/i)).toBeInTheDocument(), {
      timeout: 100,
    });
    await waitFor(() => expect(component.getByText(/password/i)).toBeInTheDocument(), {
      timeout: 100,
    });

    return component;
  };

  it("should show validation error text when password is missing", async () => {
    const { getByText, getAllByText, getByTestId } = await setup();

    fireEvent.change(getByTestId("username"), createChangeEvent("John")); // filling only username, password is empty

    fireEvent.submit(getByText(/Login/i));

    expect(getAllByText(/This field is required!/)).toHaveLength(1);
  });

  it("should display validation texts when empty form is submitted", async () => {
    const { getByText, getAllByText } = await setup();

    fireEvent.submit(getByText(/Login/i));

    const validationTexts = getAllByText(/This field is required!/); // 2 form field = 2 validation texts

    expect(validationTexts.length).toBe(2);
  });
});
