/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var client = require('./client.js');

export const createUser = async (firstName, lastName, email, password, securityq1, securitya1, securityq2, securitya2) => {
    try {
        const userName = firstName.concat(' ', lastName);
        let newUser = await client.addUser([userName, email, password, securityq1, securitya1, securityq2, securitya2])
        if (newUser !== 'User Added!!') return
        return newUser
    } catch (error) {
        return
    }
};

export const loginUser = async (email, password) => {
    let userData = await client.userValidation([email, password])
    if (userData === "User Not Found!!") return
    if (userData === "Error while doing the Operation!!") return "Something went wrong"
    return userData
};

export const getUser = async (userId) => {
    return;
};

export const createPassword = async (accountName, accountUrl, email, Password, userId) => {
    let newPassword = await client.addCreate(['add', accountName, accountUrl, email, Password, userId])
    if (newPassword === "Credentails Present!!") return 'Credentails Present!!'
    if (newPassword === "Error while doing the Operation!!") return "Something went wrong"
    return newPassword
};


export const getPasswordsByUserID = async id => {
    let values = await client.get([id])
    if (values === "Password Not Found!!") return []
    if (values === "Error while doing the Operation!!") return "Something went wrong"
    return values
};

export const getPassword = async id => {
    return;
};

export const updatePassword = async (payload, id) => {
    var val = Object.values(payload)
    let update = await client.update([...val, id])
    return;
};

export const deletePassword = async id => {
    let deletePassword = await client.deletePass(id)
    return;
};

export const forgotPassword = async (email, securityq1, securitya1, securityq2, securitya2, newPassword) => {
    let forgot = await client.forgotPassword([email, securityq1, securitya1, securityq2, securitya2, newPassword])
    return forgot;
};
