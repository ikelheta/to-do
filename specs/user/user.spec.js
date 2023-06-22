import supertest from "supertest";
import app from "../../app.mjs"
import { createUserBuyer, createUserSeller, testBuyerUser, testSellerUser, userId, userIdNotFound } from "./utils.mjs";
let buyerToken
let sellerToken

describe('user', async () => {
    beforeAll('sign in buyer', async()=>{
        it("should login", async () => {
            const res = await supertest(app).post("/vending-machine/v1/api/user/signin").send(
                testBuyerUser
            )
            expect(res.status).toBe(200)
            buyerToken = res.body.data.access_token;
        })
    })
    beforeAll('sign in seller', async()=>{
        it("should login", async () => {
            const res = await supertest(app).post("/vending-machine/v1/api/user/signin").send(
                testSellerUser
            )
            expect(res.status).toBe(200)
            buyerToken = res.body.data.access_token;
        })
    })
    describe('create buyer user', async () => {
        it("should success", async () => {
            const res = await supertest(app).post("/vending-machine/v1/api/user/signup").send(
                createUserBuyer
            )
            expect(res.status).toBe(200)
            buyerToken = res.body.data.access_token;
        })
    })

    describe('create seller user', async () => {
        it("should success", async () => {
            const res = await supertest(app).post("/vending-machine/v1/api/user/signup").send(
                createUserSeller
            )
            expect(res.status).toBe(200)
            sellerToken = res.body.data.access_token;
        })
    })
    describe('get user', async () => {
        it("should success", async () => {
            const res = await supertest(app).get(`/vending-machine/v1/api/user/${userId}`)
            .set("Authorization", `Bearer ${buyerToken}`)
            expect(res.status).toBe(200)
        })
       
    })

    describe('get user not exist', async () => {
        it("should failed", async () => {
            const res = await supertest(app).get(`/vending-machine/v1/api/user/${userIdNotFound}`)
            .set("Authorization", `Bearer ${buyerToken}`)
            expect(res.status).toBe(404)
         }
        )
    })
})