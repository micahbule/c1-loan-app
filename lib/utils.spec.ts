import { computeMetric } from "./utils";

describe("utils", () => {
  it("should compute metric per status", () => {
    const metric = computeMetric("PENDING")([
      {
        id: "1",
        applicantName: "John Doe",
        requestedAmount: 10000,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1",
        applicantName: "Jane Doe",
        requestedAmount: 5000,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    expect(metric.status).toEqual("PENDING");
    expect(metric.count).toEqual(2);
    expect(metric.totalValue).toEqual(15000);
  });
});
