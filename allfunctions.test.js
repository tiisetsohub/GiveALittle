const tests = require("./allfunctions");

login = tests[0]
signup = tests[1]
carddetails = tests[2]
totalprice = tests[3]

//tests for login functions
test("checks for valid login details", () => {
    expect(login("tii@gmail.com", "password")).toBe(true)
})
test("checks for valid login details", () => {
    expect(login("tiisetso@gmail.com", "234")).toBe(false)
})

//tests for signup functions
test("checks for valid signup details", () => {
    expect(signup("tii","0855853845","tii@gmail.com", "password")).toBe(true)
})
test("checks for valid signup details", () => {
    expect(signup("david","9044405950495059","tiisetso@gmail.com", "234")).toBe(false)
})

//tests for card functions
test("checks for valid card details", () => {
    expect(carddetails("thomas lemar", "1234", "332")).toBe(true)
})
test("checks for valid card details", () => {
    expect(carddetails("david","12", "234")).toBe(false)
})

//tests for total price function
test("calculates total price of cart", () => {
    expect(totalprice([1,2,3,4])).toBe(10)
})
test("calculates total price of cart", () => {
    expect(totalprice([100,2000,3399])).toBe(5499)
})