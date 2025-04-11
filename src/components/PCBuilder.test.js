
import { render, screen, fireEvent } from "@testing-library/react";
import PCBuilder from "./PCBuilder";

describe("PCBuilder Component", () => {
  test("renders budget input and validates range", () => {
    render(<PCBuilder />);
    const input = screen.getByPlaceholderText(/e.g. 1500/i);
    fireEvent.change(input, { target: { value: "300" } });

    expect(screen.getByText(/budget must be between/i)).toBeInTheDocument();
  });

  test("renders purpose selection dropdown", () => {
    render(<PCBuilder />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "gaming" } });
    expect(select.value).toBe("gaming");
  });

  test("checkboxes update state", () => {
    render(<PCBuilder />);
    const keyboard = screen.getByLabelText(/keyboard/i);
    const os = screen.getByLabelText(/include operating system/i);

    fireEvent.click(keyboard);
    fireEvent.click(os);

    expect(keyboard.checked).toBe(true);
    expect(os.checked).toBe(true);
  });

  test("submit button disabled on invalid input", () => {
    render(<PCBuilder />);
    const button = screen.getByRole("button", { name: /get recommendation/i });
    expect(button).toBeDisabled();
  });
});
