Feature: User Management API
To test the functionality of the User Management API
As a developer
I want to ensure the API correctly handles CRUD operations for users

Background:
  Given the API base URL is "http://localhost:3000/api"

# Scenario: Access API without Authenication header
#   Given I get user id 99 without token
#   Then the response status should be 401

Scenario: Create a new user
  When I send a POST request to "/users" with the following JSON:
    """
    {
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
    """
  Then the response status should be 201
  And the response should have a "Content-Type" header of "application/json"
  And the response JSON should contain:
    | name    | John Doe               |
    | email   | johndoe@example.com    |

Scenario: Retrieve the user by ID
  Given I have created a user with the following details:
    | key     | value                  |
    | name    | John Doe               |
    | email   | johndoe@example.com    |
  When I send a GET request to "/users/{userId}"
  Then the response status should be 200
  And the response JSON should contain:
    | key     | value                  |
    | name    | John Doe               |
    | email   | johndoe@example.com    |

Scenario: Update the user's information
  Given I have created a user with the following details:
    | key     | value                  |
    | name    | John Doe               |
    | email   | johndoe@example.com    |
  When I send a PUT request to "/users/{userId}" with the following JSON:
    """
    {
      "name": "John Updated",
      "email": "johnupdated@example.com"
    }
    """
  Then the response status should be 200
  And the response JSON should contain:
    | key     | value                       |
    | name    | John Updated                |
    | email   | johnupdated@example.com     |

Scenario: Delete the user
  Given I have created a user with the following details:
    | key     | value                  |
    | name    | John Doe               |
    | email   | johndoe@example.com    |
  When I send a DELETE request to "/users/{userId}"
  Then the response status should be 204
  And the user should no longer exist
