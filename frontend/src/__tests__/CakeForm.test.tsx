import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CakeForm from "../components/CakeForm";
import { createCake, updateCake } from "../api/cakes";
import { Cake } from "../common/types";

jest.mock("../api/cakes"); // Mock the API module

describe("CakeForm Component", () => {
  const mockOnFormSubmitChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls before each test
  });

  test("renders the form for adding a new cake", () => {
    render(<CakeForm onFormSubmitChange={mockOnFormSubmitChange} />);

    expect(screen.getByText(/Add a New Cake/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cake Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Cake/i })
    ).toBeInTheDocument();
  });

  test("renders the form for updating a cake", () => {
    const cakeData: Cake = {
      _id: "1",
      name: "Chocolate Cake",
      comment: "Delicious!",
      imageUrl: "http://example.com/cake.jpg",
      yumFactor: 5,
    };

    render(
      <CakeForm
        onFormSubmitChange={mockOnFormSubmitChange}
        cakeData={cakeData}
        isUpdateMode={true}
      />
    );

    expect(screen.getByTestId("title-heading")).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Chocolate Cake/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Delicious!/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/http:\/\/example.com\/cake.jpg/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Update Cake/i })
    ).toBeInTheDocument();
  });

  test("calls createCake on form submission", async () => {
    (createCake as jest.Mock).mockResolvedValue({
      data: { _id: "1", name: "New Cake" },
    });

    render(<CakeForm onFormSubmitChange={mockOnFormSubmitChange} />);

    fireEvent.change(screen.getByLabelText(/Cake Name/i), {
      target: { value: "New Cake" },
    });
    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: "Delicious cake" },
    });
    fireEvent.change(screen.getByLabelText(/Image URL/i), {
      target: { value: "http://example.com/new-cake.jpg" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Cake/i }));

    await waitFor(() => {
      expect(createCake).toHaveBeenCalledWith({
        name: "New Cake",
        comment: "Delicious cake",
        imageUrl: "http://example.com/new-cake.jpg",
        yumFactor: 1,
      });
      expect(mockOnFormSubmitChange).toHaveBeenCalledWith({
        _id: "1",
        name: "New Cake",
      });
    });
  });
 
  test("shows error message on API error", async () => {
    (createCake as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<CakeForm onFormSubmitChange={mockOnFormSubmitChange} />);

    fireEvent.change(screen.getByLabelText(/Cake Name/i), {
      target: { value: "New Cake" },
    });
    fireEvent.change(screen.getByLabelText(/Comment/i), {
      target: { value: "Delicious cake" },
    });
    fireEvent.change(screen.getByLabelText(/Image URL/i), {
      target: { value: "http://example.com/new-cake.jpg" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add Cake/i }));

    expect(
      await screen.findByText(/Error creating cake./i)
    ).toBeInTheDocument();
  });
});
