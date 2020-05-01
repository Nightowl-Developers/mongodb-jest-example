import { MongoClient, ObjectID } from 'mongodb';
import { createConnection } from '../index';
import {createUser, getUserById, updateUser, deleteUser } from './user';

describe('getUserById()', () => {
    let connection: Promise<any>;

    interface UserData {
        first: string;
        last: string;
        email: string;
    }

    const userData: UserData = {
        first: 'first name',
        last: 'last name',
        email: 'email@email.com',
    };

    const updatedUserData: UserData = {
        first: 'updated first name',
        last: 'updated last name',
        email: 'updated.email@email.com',
    };

    interface UserResult {
        _id?: ObjectID;
        first?: string;
        last?: string;
        email?: string;
    }

    let userResult: UserResult = {};

    beforeAll(() => {
        connection = createConnection(process.env.MONGO_URL);
    });

    describe('createUser()', () => {
        it('creates a user', () => {
            connection
                .then((mongoClient: MongoClient) => {
                    const userCollection = mongoClient.db().collection('user');

                    const createUserPromise = createUser(userCollection, userData);

                    createUserPromise
                        .then((result: any) => {
                            userResult = result;

                            expect(result).toHaveProperty(userData.first);
                            expect(result).toHaveProperty(userData.last);
                            expect(result).toHaveProperty(userData.email);
                        });
                });
        });
    });

    describe('getUserById()', () => {
        it('get a user by id', () => {
            connection
                .then((mongoClient: MongoClient) => {
                    const userCollection = mongoClient.db().collection('user');

                    const getUserPromise = getUserById(userCollection, userResult._id);

                    getUserPromise
                        .then((result: any) => {
                            expect(result).toHaveProperty(userResult._id);
                            expect(result).toHaveProperty(userResult.first);
                            expect(result).toHaveProperty(userResult.last);
                            expect(result).toHaveProperty(userResult.email);
                        });
                });
        });
    });

    describe('updateUser()', () => {
        it('update a user', () => {
            connection
                .then((mongoClient: MongoClient) => {
                    const userCollection = mongoClient.db().collection('user');

                    const updateUserPromise = updateUser(userCollection, userResult._id, updatedUserData);

                    updateUserPromise
                        .then((result: any) => {
                            userResult = result;

                            expect(result).toHaveProperty(userResult._id);
                            expect(result).toHaveProperty(userResult.first);
                            expect(result).toHaveProperty(userResult.last);
                            expect(result).toHaveProperty(userResult.email);
                        });
                });
        });
    });

    describe('deleteUser()', () => {
        connection
            .then((mongoClient: MongoClient) => {
                const userCollection = mongoClient.db().collection('user');

                const deleteUserPromise = deleteUser(userCollection, userResult._id);

                deleteUserPromise
                    .then((result: any) => {
                        //
                    });
            });
    });
});
