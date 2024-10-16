import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CakeList from "../components/CakeList"; // Adjust the import path as necessary
import { Cake } from "../common/types";

describe("CakeList", () => {
  const mockCakes: Cake[] = [
    {
      _id: "1",
      name: "Chocolate Cake",
      imageUrl: "http://example.com/chocolate-cake.jpg",
      comment: "Delicious chocolate cake.",
      yumFactor: 5,
    },
    {
      _id: "2",
      name: "Vanilla Cake",
      imageUrl: "http://example.com/vanilla-cake.jpg",
      comment: "Tasty vanilla cake.",
      yumFactor: 4,
    },
  ];

  const handleDelete = jest.fn();
  const handleOpenUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test("renders a list of cakes", () => {
    render(
      <CakeList
        cakes={mockCakes}
        handleDelete={handleDelete}
        handleOpenUpdate={handleOpenUpdate}
      />
    );

    // Check if cakes are rendered
    expect(screen.getByText("Chocolate Cake")).toBeInTheDocument();
    expect(screen.getByText("Delicious chocolate cake.")).toBeInTheDocument();
    expect(screen.getByText("Vanilla Cake")).toBeInTheDocument();
    expect(screen.getByText("Tasty vanilla cake.")).toBeInTheDocument();
  });

  test("calls handleOpenUpdate when Update button is clicked", () => {
    render(
      <CakeList
        cakes={mockCakes}
        handleDelete={handleDelete}
        handleOpenUpdate={handleOpenUpdate}
      />
    );

    // Simulate clicking the Update button for the first cake
    fireEvent.click(screen.getAllByText("Update")[0]);

    expect(handleOpenUpdate).toHaveBeenCalledWith(mockCakes[0]);
  });

  test("calls handleDelete when Delete button is clicked", () => {
    render(
      <CakeList
        cakes={mockCakes}
        handleDelete={handleDelete}
        handleOpenUpdate={handleOpenUpdate}
      />
    );

    // Simulate clicking the Delete button for the second cake
    fireEvent.click(screen.getAllByText("Delete")[1]);

    expect(handleDelete).toHaveBeenCalledWith(mockCakes[1]._id);
  });

  test("fallback image is used on image error", () => {
    // Here we can simulate an error in loading the image.
    const { container } = render(
      <CakeList
        cakes={[
          {
            _id: "3",
            name: "Red Velvet Cake",
            imageUrl: "invalid-url.jpg", // Invalid URL to trigger image error
            comment: "Lovely red velvet cake.",
            yumFactor: 5,
          },
        ]}
        handleDelete={handleDelete}
        handleOpenUpdate={handleOpenUpdate}
      />
    );

    // Simulate image error
    const img = container.querySelector("img");
    fireEvent.error(img!);

    expect(img).toHaveAttribute("src", "./public/logo512.png"); // Expect fallback image
  });
});
