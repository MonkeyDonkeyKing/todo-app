import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login.js";
import useAuthStore from "../store/auth";

jest.mock("../store/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    login: jest.fn(),
    register: jest.fn(),
  })),
}));

describe("Login Component", () => {
  test("rendert Eingabefelder und Login-Button", () => {
    useAuthStore.mockReturnValue({
      login: jest.fn(),
    });

    render(<Login />);
    
    expect(screen.getByPlaceholderText("Benutzername")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Passwort")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("ruft login-Funktion mit korrekten Werten beim Absenden auf", async () => {
    const loginMock = jest.fn();
    useAuthStore.mockReturnValue({
      login: loginMock,
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Benutzername"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Passwort"), {
      target: { value: "testpassword" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    expect(loginMock).toHaveBeenCalledWith("testuser", "testpassword");
  });
});
