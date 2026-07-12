import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/Header";
import LocationsSection from "@/components/LocationsSection";

afterEach(cleanup);

describe("first-visit customer journeys", () => {
  it("shows every open location with plans and directions", async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LocationsSection />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "FIND YOUR WASH KING" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getAllByRole("link", { name: "Plans & Pricing" })).toHaveLength(4);
    expect(screen.getAllByRole("link", { name: /Get directions to Wash King/ })).toHaveLength(4);
    expect(screen.getByRole("heading", { name: "Cherry Hill" })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryAllByText(/Open now|Closed now|Open 24 hours/).length).toBeGreaterThan(0);
    });
  });

  it("exposes location and membership actions in mobile navigation", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Vineland Main Rd" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Manage Membership" })).toHaveAttribute(
      "href",
      "https://customerportal.nxtwash.com/washkingcarwash",
    );
  });
});
