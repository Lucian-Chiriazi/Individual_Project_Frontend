
import { render, screen, fireEvent } from "@testing-library/react";
import PCBuilder from "./PCBuilder";

describe("PCBuilder Component", () => {

  // Test budget input should validate the value range
  test("renders budget input and validates range", () => {
    render(<PCBuilder />);
    const input = screen.getByPlaceholderText(/e.g. 1500/i);
    fireEvent.change(input, { target: { value: "300" } });

    // Expect a validation messsage to be displayed
    expect(screen.getByText(/budget must be between/i)).toBeInTheDocument();
  });

  // Test purpose selection dropdown
  test("renders purpose selection dropdown", () => {
    render(<PCBuilder />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "gaming" } });
    // Check if the value has been updated
    expect(select.value).toBe("gaming");
  });

  // Test checkbox group for peripherals
  test("checkboxes update state", () => {
    render(<PCBuilder />);
    const keyboard = screen.getByLabelText(/keyboard/i);
    const os = screen.getByLabelText(/include operating system/i);

    fireEvent.click(keyboard);
    fireEvent.click(os);

    // Assert that both checkboxes are now checked
    expect(keyboard.checked).toBe(true);
    expect(os.checked).toBe(true);
  });

  // Test submit button functionality
  test("submit button disabled on invalid input", () => {
    render(<PCBuilder />);
    const button = screen.getByRole("button", { name: /get recommendation/i });
    // Expect it to be disabled initially (due to invalid or incomplete input)
    expect(button).toBeDisabled();
  });
});
