import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import "@testing-library/jest-dom";

// Mock fetch
global.fetch = jest.fn();

describe("LeadCaptureForm", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders the form with all fields", () => {
    render(<LeadCaptureForm source="homepage" />);

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name (optional)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start your journey/i })).toBeInTheDocument();
  });

  it("renders minimal variant without optional fields", () => {
    render(<LeadCaptureForm source="homepage" variant="minimal" showInterest={false} />);

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Name (optional)")).not.toBeInTheDocument();
    expect(screen.queryByText(/what interests you most/i)).not.toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LeadCaptureForm source="homepage" />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });
    const checkbox = screen.getByRole("checkbox");

    await user.type(emailInput, "invalid-email");
    await user.click(checkbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it("shows error when consent checkbox is not checked", async () => {
    const user = userEvent.setup();
    render(<LeadCaptureForm source="homepage" />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });

    await user.type(emailInput, "test@example.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please accept the privacy policy/i)).toBeInTheDocument();
    });
  });

  it("submits form successfully with valid data", async () => {
    const user = userEvent.setup();
    const mockResponse = { success: true, message: "Welcome!" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<LeadCaptureForm source="homepage" />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const nameInput = screen.getByPlaceholderText("Name (optional)");
    const checkbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });

    await user.type(emailInput, "test@example.com");
    await user.type(nameInput, "John Doe");
    await user.click(checkbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          name: "John Doe",
          primary_interest: null,
          source: "homepage",
        }),
      });
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/welcome to camino/i)).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Email already exists" }),
    });

    render(<LeadCaptureForm source="homepage" />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const checkbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });

    await user.type(emailInput, "test@example.com");
    await user.click(checkbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });

  it("prevents honeypot spam submissions", async () => {
    const user = userEvent.setup();
    render(<LeadCaptureForm source="homepage" />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const honeypot = screen.getByRole("textbox", { hidden: true, name: "" });
    const checkbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });

    await user.type(emailInput, "test@example.com");
    await user.type(honeypot, "spam-bot-text");
    await user.click(checkbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid submission/i)).toBeInTheDocument();
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it("disables form during submission", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<LeadCaptureForm source="homepage" />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const checkbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });

    await user.type(emailInput, "test@example.com");
    await user.click(checkbox);
    await user.click(submitButton);

    // Check that fields are disabled
    expect(emailInput).toBeDisabled();
    expect(checkbox).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/submitting/i)).toBeInTheDocument();
  });

  it("calls onSuccess callback after successful submission", async () => {
    const user = userEvent.setup();
    const onSuccess = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<LeadCaptureForm source="homepage" onSuccess={onSuccess} />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const checkbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });

    await user.type(emailInput, "test@example.com");
    await user.click(checkbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("has accessible form labels", () => {
    render(<LeadCaptureForm source="homepage" />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/privacy consent/i)).toBeInTheDocument();
  });

  it("includes trust indicators in card variant", () => {
    render(<LeadCaptureForm source="homepage" variant="card" />);

    expect(screen.getByText(/no spam/i)).toBeInTheDocument();
    expect(screen.getByText(/unsubscribe anytime/i)).toBeInTheDocument();
    expect(screen.getByText(/privacy first/i)).toBeInTheDocument();
  });

  it("submits interest field when provided", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<LeadCaptureForm source="homepage" showInterest={true} />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const interestSelect = screen.getByLabelText(/primary interest/i);
    const checkbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /start your journey/i });

    await user.type(emailInput, "test@example.com");
    await user.selectOptions(interestSelect, "identity");
    await user.click(checkbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining('"primary_interest":"identity"'),
      });
    });
  });
});
