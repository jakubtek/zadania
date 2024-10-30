import { mount } from "cypress/react18";
import RegistrationForm from "./RegistrationForm";
describe("Registration Form Tests", () => {
	it("should display error messages for empty fields", () => {
		mount(<RegistrationForm />);
		cy.get('button[type="submit"]').click();

		// Sprawdź, czy wyświetlane są komunikaty o błędach
		cy.contains("First name is required").should("be.visible");
		cy.contains("Last name is required").should("be.visible");
		cy.contains("Email is required").should("be.visible");
		cy.contains("Password is required").should("be.visible");
	});

	it("should display an error for invalid email", () => {
		// Wpisz niepoprawny adres e-mail i kliknij przycisk rejestracji
		cy.get('input[name="email"]').type("invalid-email");
		cy.get('button[type="submit"]').click();

		// Sprawdź, czy wyświetlany jest komunikat o błędzie
		cy.contains("Email is invalid").should("be.visible");
	});

	it("should display an error for password shorter than 6 characters", () => {
		// Wpisz hasło krótsze niż 6 znaków i kliknij przycisk rejestracji
		cy.get('input[name="password"]').type("123");
		cy.get('button[type="submit"]').click();

		// Sprawdź, czy wyświetlany jest komunikat o błędzie
		cy.contains("Password must be at least 6 characters long").should(
			"be.visible"
		);
	});

	it("should register successfully with valid input", () => {
		// Wypełnij wszystkie pola formularza poprawnymi danymi
		cy.get('input[name="firstName"]').type("John");
		cy.get('input[name="lastName"]').type("Doe");
		cy.get('input[name="email"]').type("john.doe@example.com");
		cy.get('input[name="password"]').type("password123");

		// Kliknij przycisk rejestracji
		cy.get('button[type="submit"]').click();

		// Sprawdź, czy nie ma żadnych komunikatów o błędach
		cy.contains("First name is required").should("not.exist");
		cy.contains("Last name is required").should("not.exist");
		cy.contains("Email is invalid").should("not.exist");
		cy.contains("Password must be at least 6 characters long").should(
			"not.exist"
		);

		// Sprawdź, czy formularz został zresetowany (pola są puste)
		cy.get('input[name="firstName"]').should("have.value", "");
		cy.get('input[name="lastName"]').should("have.value", "");
		cy.get('input[name="email"]').should("have.value", "");
		cy.get('input[name="password"]').should("have.value", "");
	});
});
