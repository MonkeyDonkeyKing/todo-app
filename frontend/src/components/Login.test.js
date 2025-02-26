import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login.js";
import useAuthStore from "../store/auth";
import '@testing-library/jest-dom';

beforeEach(() => {
  useAuthStore.setState({
    login: jest.fn(),
    register: jest.fn(),
  });
});

describe("Testet Login Funktionen", () => {
  it("rendert Eingabefelder und Login-Button", () => {
    render(<Login />);
    
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("submit");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("ruft login-Funktion mit korrekten Werten beim Absenden auf", async () => {
    const loginMock = jest.fn();
    useAuthStore.setState({ login: loginMock });

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
