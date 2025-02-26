import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import useAuthStore from "../store/auth";

jest.mock("../store/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    login: jest.fn(),
    register: jest.fn(),
  })),
}));

describe("Register Component", () => {
  test("rendert Eingabefelder und Registrieren-Button", () => {
    useAuthStore.mockReturnValue({
      register: jest.fn(),
    });

    render(<Register />);
    
    expect(screen.getByPlaceholderText("Benutzername")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Passwort")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrieren/i })).toBeInTheDocument();
  });

  test("ruft register-Funktion mit korrekten Werten beim Absenden auf", async () => {
    const registerMock = jest.fn();

    useAuthStore.mockReturnValue({
      register: registerMock,
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Benutzername"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Passwort"), {
      target: { value: "newpassword" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /registrieren/i }));

    expect(registerMock).toHaveBeenCalledWith("newuser", "newpassword");
  });
});
