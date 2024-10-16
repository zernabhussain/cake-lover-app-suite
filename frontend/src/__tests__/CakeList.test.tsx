import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CakeList from "../components/CakeList";
import { getCakes } from "../api/cakes";
import { Cake } from "../common/types";

// Mock the API call
jest.mock("../api/cakes");

describe("CakeList", () => {
  const mockCakes: Cake[] = [
    {
      _id: "123",
      name: "Chocolate Cake",
      comment: "love this cake",
      yumFactor: 5,
      imageUrl: "http://example.com/chocolate.jpg",
    },
    {
      _id: "456",
      name: "Vanilla Cake",
      comment: "love this cake",
      yumFactor: 5,
      imageUrl: "http://example.com/vanilla.jpg",
    },
  ];

  const mockHandleDelete = jest.fn();
  const mockHandleOpenUpdate = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("renders list of cakes", async () => {
    render(
      <CakeList
        cakes={mockCakes}
        handleDelete={mockHandleDelete}
        handleOpenUpdate={mockHandleOpenUpdate}
      />
    );

    // Check if the loading state is handled (optional, depending on your implementation)
    expect(screen.getByText("Yummy Cakes")).toBeInTheDocument();

    // Wait for the cakes to be loaded
    await waitFor(() => {
      expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
      expect(screen.getByText("Vanilla Cake")).toBeInTheDocument();
    });

    // Check if images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute(
      "src",
      "http://example.com/chocolate.jpg"
    );
    expect(images[1]).toHaveAttribute("src", "http://example.com/vanilla.jpg");
  });

  test("handles empty cake list", async () => {
    render(
      <CakeList
        cakes={[]}
        handleDelete={mockHandleDelete}
        handleOpenUpdate={mockHandleOpenUpdate}
      />
    );

    // Wait for the component to finish rendering
    await waitFor(() => {
      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });

    // The heading should still be there
    expect(screen.getByText("Yummy Cakes")).toBeInTheDocument();
  });
});
