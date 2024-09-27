import express from 'express';
var usersRouter = express.Router();
import { admin } from '../app.js';
import { getAuth } from 'firebase-admin/auth';

/* GET users listing. */
usersRouter.get('/', async function (req, res) {
    const users = await admin.auth().listUsers();
    res.send(users);
});

// GET BY ID
usersRouter.get('/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;
        const userRecord = await getAuth().getUser(uid)
        res.send(userRecord);
    } catch (error) {
        res.status(404).send({
            message: "User not found: " + error
        });
    }
})

// GET BY EMAIL
usersRouter.get('/email/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const userRecord = await getAuth().getUserByEmail(email)
        res.send(userRecord);
    } catch (error) {
        res.status(404).send({
            message: "User not found: " + error
        });
    }
});

// Create USER
usersRouter.post('/create', async (req, res) => {

    const displayName = req.body.displayName;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // TODO:
    // uncomment after adding fullname in admin panel
    // if (!displayName || !email || !password || !name) {
    if (!displayName || !email || !password) {
        return res.status(400).send({
            // TODO: Change message
            // message: 'Missing required field. Name, email, password and displayName are required.'
            message: 'Missing required field. displayName, email, password are required.'
        });
    }

    try {
        const userProps = {
            displayName: displayName,
            email: email,
            password: password
        };

        const user = await getAuth().createUser(userProps);
        res.status(201).send({
            message: "Added Successfully",
            user: user.uid
        })
         
    } catch (error) {
        res.status(400).send({
            message: "Bad request: " + error
        });
    }
})

// Update USERS
usersRouter.put('/change', async (req, res) => {
    const uid = req.body.uid;
    const displayName = req.body.displayName;
    const email = req.body.email;
    const password = req.body.password;

    if (!req.body) {
        return res.status(400).send({
            message: 'Request body is empty. Expected JSON object.'
        });
    }

    if (!uid) {
        return res.status(400).send({
            message: 'UID is needed to change user details.'
        })
    }

    try {
        const user = await getAuth().getUser(uid);
        console.log(user);

        let changes = {};

        if (displayName) {
            changes.displayName = displayName
        }
        if (email) {
            changes.email = email
        }
        if (password) {
            changes.password = password
        }

        for (const key in changes) {
            if (changes.hasOwnProperty(key)) {
                getAuth().updateUser(uid, changes);
            }
        }

        res.status(201).send({
            message: 'Successfully updated user'
        })
    }
    catch (error) {
        return res.status(404).send({
            message: 'User with corresponding UID not found.'
        })
    }
})

// DELETE USER BY UID
usersRouter.delete('/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;
        await getAuth().deleteUser(uid)

        res.status(204).send({
            message: "Successfully deleted user with uid: " + uid
        });
    } catch (error) {
        res.send({
            message: "Request failed with error: " + error
        });
    }
})

export { usersRouter };
