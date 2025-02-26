import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import React from "react"
import useAuthStore from "../store/auth";
import '@testing-library/jest-dom';

describe("Register Component", () => {
  beforeEach(() => {
    useAuthStore.setState({
      login: jest.fn(),
      register: jest.fn(),
    });
  });
  test("rendert Eingabefelder und Registrieren-Button", () => {
    render(<Register />);
    
    expect(screen.getByPlaceholderText("Benutzername")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Passwort")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrieren/i })).toBeInTheDocument();
  });

  test("ruft register-Funktion mit korrekten Werten beim Absenden auf", async () => {
    const registerMock = jest.fn();
    useAuthStore.setState({ register: registerMock });

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
