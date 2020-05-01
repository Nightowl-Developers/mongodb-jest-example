import { MongoClient, MongoError } from 'mongodb';
import { createConnection } from '../index';
import { createUser, getUserById } from './user';

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

    interface UserResult {
        _id?: string;
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
});
