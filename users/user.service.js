const bcrypt = require('bcryptjs'); // Fixed spelling
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id); // Fixed function name
}

async function create(params) {
    if (await db.User.findOne({ where: { email: params.email } })) { // Fixed 'is' to 'if'
        throw `Email "` + params.email + '" is already registered'; // Fixed typo
    }
    const user = new db.User(params);
    user.passwordHash = await bcrypt.hash(params.password, 10);
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id); // Fixed function name

    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) { // Fixed typo
        throw 'Username "' + params.username + '" is already taken'; // Fixed typo
    }

    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id); // Fixed incorrect syntax
    await user.destroy();
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
