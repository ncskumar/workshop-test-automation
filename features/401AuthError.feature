# Feature: Invalid Authentiation Error

# Background:
#   Given the API base URL is "http://localhost:3000/api"

# Scenario: Access API without Authenication header
#     Given I get user id 99 without token
#     Then the response status should be 401