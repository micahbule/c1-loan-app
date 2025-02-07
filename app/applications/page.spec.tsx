import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ApplicationsPage from "./page";

jest.mock("../components/LoanApplicationTable", () => {
  const MockApplicationsTable = () => <div>Application Table</div>;
  return MockApplicationsTable;
});

describe("applications page", () => {
  beforeEach(() => {
    render(<ApplicationsPage />);
  });

  it("should render page", () => {
    const applicationTable = screen.getByText("Application Table");
    expect(applicationTable).toBeInTheDocument();
  });
});
