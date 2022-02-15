const request = require("supertest");
const app = require("../../app");

describe("Test GET /launch", () => {
  it("should responed with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);

    // expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "ZTM155",
    rocket: "ZTM Explorer IS1",
    launchDate: "January 17, 2030",
    target: "Kepler-186 f",
  };

  const launchDataWithoutDate = {
    mission: "ZTM155",
    rocket: "ZTM Explorer IS1",
    target: "Kepler-186 f",
  };

  const launchWithInvalidDate = {
    ...launchDataWithoutDate,
    launchDate: "hello",
  };

  it("should responed with 201 create", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  it("should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  it("should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Inavlid launch date",
    });
  });
});
