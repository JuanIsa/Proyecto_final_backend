import userModel from './models/modelUsers.js';
import { createHash } from '../services/bcrypt.js';

class Users {
    async createUser(user) {
        const { email, password, completeName, address, age, telphoneNumber, userImg } = user;
        const dataHashed = await createHash(password);
        const createData = await userModel.create({
            email,
            password: dataHashed,
            completeName,
            address,
            age,
            telphoneNumber,
            userImg
        })
            .then(data => data)
            .catch(e => {
                return ({ Error: e })
            });
        return createData;
    }

    async readUser(email) {
        const readData = await userModel.findOne({ email })
            .then(data => data)
            .catch(e => { Error: e });
        return readData;
    }
}
export default Users;