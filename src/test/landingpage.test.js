
import app from "../server.js";
import request from "supertest";


describe("landingpage", () => {
    it("Welcomes the user to the landingpage",(done)=>{
        request(app).get("/")
          .expect(200)
          .expect(/Create a developer profile & portfolio, share posts and get help from other developers/, done)
    })
})