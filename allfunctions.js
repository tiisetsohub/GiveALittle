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

//function for calculating total
function totalprice(items) {
    total = 0
    for (var i = 0; i < items.length; i++){
        total += items[i]
    }
    return total
}
module.exports = [login, signup, carddetails, totalprice];