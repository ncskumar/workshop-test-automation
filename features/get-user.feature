Feature: User Management API
To test the functionality of the User Management API
As a developer
I want to ensure the API correctly handles CRUD operations for users

Background:
  Given the API base URL is "http://localhost:3000/api"

Scenario: Retrieve the user by ID
    Given I have created a user with the following details:
      | key     | value                  |
      | name    | John Doe               |
      | email   | johndoe@example.com    |
    Then the response status should be 201
    When I send a GET request to "/users/{userId}"
    Then the response status should be 200
    And the response JSON should contain:
      | key     | value                  |
      | name    | John Doe           |
      | email   | johndoe@example.com    |