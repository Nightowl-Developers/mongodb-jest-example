import { Db } from 'mongodb';

export const getUserById = async (db: Db, id: string): Promise<any> => {
    return await db.collection('user').findById(id);
};

export const createUser = async (db: Db, user: object): Promise<any> => {
    const result = await db.collection('user').create(user);

    return new Promise((resolve, reject) => {
        if (result.ops[0]) {
            resolve(result);
        } else {
            reject();
        }
    });
};

export const updateUser = (db: Db, id: string, user: object): Promise<any> => {
    return db.collection('user').update(id, user);
};

export const deleteUser = (db: Db, id: string): Promise<any> => {
    return db.collection('user').delete(id);
};
