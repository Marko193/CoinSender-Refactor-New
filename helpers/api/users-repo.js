// users in JSON file for simplicity, store in a db for production applications
let users = require('mocks/users.json');

export const usersRepo = {
    getAll: () => users,
    find: x => users.find(x)
};
