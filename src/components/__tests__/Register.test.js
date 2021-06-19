import { render, waitFor, fireEvent, cleanup } from "@testing-library/react";
import Register from "../user/Register";

afterEach(() => {
  cleanup();
});

describe("Register component", () => {
  const createChangeEvent = (value) => ({ target: { value } }); // custom hook to manipulate input change

  const setup = async () => {
    const component = render(<Register />);
    await waitFor(() => expect(component.getByText(/username/i)).toBeInTheDocument(), {
      timeout: 100,
    });
    await waitFor(() => expect(component.getByText(/email/i)).toBeInTheDocument(), {
      timeout: 100,
    });
    await waitFor(() => expect(component.getByText(/password/i)).toBeInTheDocument(), {
      timeout: 100,
    });

    return component;
  };

  it("should validate when partially filled form is submitted", async () => {
    const { getByText, getAllByText, getByTestId } = await setup();

    fireEvent.change(getByTestId("username"), createChangeEvent("John")); // filling only username

    fireEvent.submit(getByText(/Sign Up/i));

    expect(getAllByText(/This field is required!/)).toHaveLength(2);
  });

  it("should show all validation texts when empty form is submitted", async () => {
    const { getByText, getAllByText } = await setup();

    fireEvent.submit(getByText(/Sign Up/i));

    const validationTexts = getAllByText(/This field is required!/); // 3 form field = 3 validation texts = length of 3

    expect(validationTexts.length).toBe(3);
  });

  it("should validate user input during form submission", async () => {
    const { getByText, getByTestId } = await setup();

    fireEvent.change(getByTestId("username"), createChangeEvent("John")); // valid value
    fireEvent.change(getByTestId("email"), createChangeEvent("test@gmail")); // invalid value for email: lack of top level domain
    fireEvent.change(getByTestId("password"), createChangeEvent("123")); // invalid value for password: too short

    fireEvent.submit(getByText(/Sign Up/i));

    expect(getByText(/This is not a valid email./i)).toBeInTheDocument();
    expect(
      getByText(/The password must be between 6 and 40 characters./i)
    ).toBeInTheDocument();
  });
});
