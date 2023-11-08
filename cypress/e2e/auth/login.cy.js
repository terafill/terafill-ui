/// <reference types="cypress" />

describe("login form", ()=>{
    it("try login", ()=>{
        const email = "sainiharshit@rocketmail.com"
        const password = "test"

        cy.login(email, password)
    })
})