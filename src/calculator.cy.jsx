import App from "./App";
import { mount } from "cypress/react18";
describe("Calculator Tests", () => {
	it("should display numbers when buttons are clicked", () => {
		mount(<App />);
		cy.contains("1").click();
		cy.get(".display").should("have.value", "1");


		cy.contains("2").click();
		cy.get(".display").should("have.value", "12");
	});

	it("should perform addition correctly", () => {
		mount(<App />);
		cy.contains("2").click();
		cy.contains("+").click();
		cy.contains("3").click();
		cy.contains("=").click();
		cy.get(".display").should("have.value", "5");
	});

	it("should perform subtraction correctly", () => {
		mount(<App />);
		cy.contains("7").click();
		cy.contains("-").click();
		cy.contains("4").click();
		cy.contains("=").click();
		cy.get(".display").should("have.value", "3");
	});

	it("should perform multiplication correctly", () => {
		mount(<App />);
		cy.contains("5").click();
		cy.contains("*").click();
		cy.contains("6").click();
		cy.contains("=").click();
		cy.get(".display").should("have.value", "30");
	});

	it("should perform division correctly", () => {
		mount(<App />);
		cy.contains("8").click();
		cy.contains("/").click();
		cy.contains("2").click();
		cy.contains("=").click();
		cy.get(".display").should("have.value", "4");
	});

	it("should clear the display when C is clicked", () => {
		mount(<App />);
		cy.contains("9").click();
		cy.get(".display").should("have.value", "9");
		cy.contains("C").click();
		cy.get(".display").should("have.value", "");
	});

	it("should delete the last digit when ← is clicked", () => {
		mount(<App />);
		cy.contains("1").click();
		cy.contains("2").click();
		cy.contains("3").click();
		cy.contains("←").click();
		cy.get(".display").should("have.value", "12");
	});

	it("should handle invalid expressions gracefully", () => {
		mount(<App />);
		cy.contains("5").click();
		cy.contains("/").click();
		cy.contains("0").click();
		cy.contains("=").click();
		cy.get(".display").should("have.value", "Infinity");
	});
});
