const fs = require('fs');
const path = require('path');

const request = require("supertest")
const {json} = require("express");
const baseURL = "http://192.168.8.163:3000"

require("dotenv").config();

describe("GET /logo.png", () => {
    it("should return logo", async () => {
        const response = await request(baseURL).get("/logo.png");
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /contract", () => {
    it("should return 403 status code since not authorized", async () => {
        const response = await request(baseURL).get("/contract");
        expect(response.statusCode).toBe(403);
    });
});

describe("GET /contract", () => {
    it("should return contract", async () => {
        const contract = JSON.parse(fs.readFileSync(path.join(__dirname, "../bin/User.json")).toString());
        const response = await request(baseURL).get("/contract").set({"apiKey": process.env.APIKEY});


        expect(response.statusCode).toBe(200);
        expect(response.body['data']).toStrictEqual(contract.abi);
    });
});

