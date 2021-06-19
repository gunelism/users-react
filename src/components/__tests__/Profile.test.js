import { render, cleanup, waitFor } from "@testing-library/react";
import Profile from "../user/Profile";

afterEach(() => {
  cleanup();
});

describe("Profile component", () => {
  // mocking user data

  const currentUser = {
    id: 1,
    username: "gunel1",
    email: "gunel@mail.com",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIzNjk4Mjg0LCJleHAiOjE2MjM3ODQ2ODR9.GZakRJCXrTedorsQgsarKJSvoA3EGtIvKDprjIl641I",
  };

  const setup = async () => {
    const component = render(<Profile currentUser={currentUser} />);
    await waitFor(() => expect(component.getByText(/profile/i)).toBeInTheDocument(), {
      timeout: 100,
    });

    return component;
  };

  it("should render Profile component with prop data", async () => {
    const { getByText } = await setup();

    expect(getByText(/gunel1/)).toBeInTheDocument();
    expect(getByText(/gunel@mail.com/)).toBeInTheDocument();
  });
});
