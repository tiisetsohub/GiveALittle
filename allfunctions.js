//function for valid login details
function login(email, password) {
    return email.length > 0 && password.length > 4
}

//function for valid sign up details
function signup(name,cell, email, password) {
    return name.length > 0 && cell.length === 10 && email.length > 0 && password.length > 4
}

//function for valid card details
function carddetails(name, expdate, cvv) {
    return name.length > 0 && expdate.length === 4 && cvv.length === 3
}

module.exports = [login, signup, carddetails];