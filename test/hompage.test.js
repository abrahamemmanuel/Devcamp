
import app from "../server.js";
import request from "supertest";


describe("homepage", () => {
    it("Welcomes the user",(done)=>{
        request(app).get("/")
          .expect(200)
          .expect(/Welcome To Fast Food Fast/, done)
    })
})