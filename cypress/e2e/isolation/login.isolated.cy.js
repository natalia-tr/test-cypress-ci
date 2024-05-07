/// <reference types="cypress" />

import { getFakeLoginResponse } from "../../generators/userGenerator";

describe("Login tests in isolation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  it("should successfully login", () => {
    const fakeLoginResponse = getFakeLoginResponse();

    cy.intercept("POST", "**/users/signin", (req) => {
      req.reply({
        statusCode: 200,
        body: fakeLoginResponse,
      });
    });
    cy.intercept("GET", "**/users", {fixture: "users.json" });

    cy.get("[name=username]").type(fakeLoginResponse.username);
    cy.get("[name=password]").type("password");
    cy.get(".btn-primary").click();

    cy.get("h1").should("contain.text", fakeLoginResponse.firstName);
  });

  it("should not login with wrong credentials", () => {
    const message = "Invalid username/password supplied";

    cy.intercept("POST", "**/users/signin", (req) => {
      req.reply({
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: message,
            path: "/users/signin",
            status: 422,
            timestamp: "2024-05-06T15:42:55.176+00:00"
        },
      });
    });

    cy.get("[name=username]").type('Wrong');
    cy.get("[name=password]").type('password');
    cy.get(".btn-primary").click();

    cy.get(".alert-danger").should("contain.text", message);
  });

});
