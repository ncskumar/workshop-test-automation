Feature: Login functionality
To verify that the login functionality works as expected
As a user
I want to be able to log in with valid credentials

Scenario: Successful login with valid credentials
Given I am on the login page
When I enter "admin" and "password" as credentials
And I click the login button
Then I should see the homepage