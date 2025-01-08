import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from 'chai';

let apiBaseUrl;
let response;
let createdUserId;
const API_KEY = "TOKEN1234";

// Clear all common default headers
axios.defaults.headers.common['Authorization'] = null;
axios.defaults.headers.common['authorization'] = null;
axios.defaults.headers.common = {}; 


// Step Definitions
Given('the API base URL is {string}', function (url) {
    apiBaseUrl = url;
});

When('I send a POST request to {string} with the following JSON:', async function (endpoint, jsonString) {
    const requestData = JSON.parse(jsonString);
    const header = {
        headers: {
            Authorization: `${API_KEY}`, // Replace with your token
        },
    };
    response = await axios.post(`${apiBaseUrl}${endpoint}`, requestData, header);
    createdUserId = response.data.id; // Store the ID for later use
});

When('I send a GET request to {string}', async function (endpoint) {
    const url = endpoint.replace('{userId}', createdUserId);
    const header = {
        headers: {
            Authorization: `${API_KEY}`, // Replace with your token
        },
    };
    response = await axios.get(`${apiBaseUrl}${url}`, header);
});

When('I send a PUT request to {string} with the following JSON:', async function (endpoint, jsonString) {
    const requestData = JSON.parse(jsonString);
    const url = endpoint.replace('{userId}', createdUserId);
    const header = {
        headers: {
            Authorization: `${API_KEY}`, // Replace with your token
        },
    };
    response = await axios.put(`${apiBaseUrl}${url}`, requestData, header);
});

When('I send a DELETE request to {string}', async function (endpoint) {
    const url = endpoint.replace('{userId}', createdUserId);
    const header = {
        headers: {
            Authorization: `${API_KEY}`, // Replace with your token
        },
    };
    response = await axios.delete(`${apiBaseUrl}${url}`, header);
});

Then('the response status should be {int}', function (expectedStatus) {
    expect(response.status).to.equal(expectedStatus);
});

Then('the response should have a {string} header of {string}', function (headerName, headerValue) {
    expect(response.headers[headerName.toLowerCase()]).to.include(headerValue);
});

Then('the response JSON should contain:', function (dataTable) {
    const expectedData = dataTable.rowsHash();
    for (const key in expectedData) {
        expect(response.data[key]).to.equal(expectedData[key]);
    }
});

Given('I have created a user with the following details:', async function (dataTable) {
    const userDetails = dataTable.rowsHash();
    const header = {
        headers: {
            Authorization: `${API_KEY}`, // Replace with your token
        },
    };
    response = await axios.post(`${apiBaseUrl}/users`, userDetails,header);
    createdUserId = response.data.id;
});

Then('the user should no longer exist', async function () {
    try {
        const header = {
            headers: {
                Authorization: `${API_KEY}`, // Replace with your token
            },
        };
        await axios.get(`${apiBaseUrl}/users/${createdUserId}`,header);
    } catch (error) {
        expect(error.response.status).to.equal(404);
    }
});

Given('I get user id {int} without token', async function (userId) {
    try {
        console.log('SAN <<< userId', userId)
        const options = { headers: {} };
        response = await axios.get(`${apiBaseUrl}/users/${userId}`,options);
    } catch (error) {
        console.log('SAN >>>>', response);
        expect(error.response.status).to.equal(401);
    }
});