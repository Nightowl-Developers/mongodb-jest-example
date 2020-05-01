import { MongoClient } from 'mongodb';
import { createConnection } from './index';

describe('createConnection', () => {
    it('calls new MongoClient()', () => {
        createConnection(process.env.MONGO_URL);
    });

    it('calls client.connect()', () => {
        const connect = jest.spyOn(MongoClient.prototype, 'connect');

        createConnection(process.env.MONGO_URL);

        expect(connect).toHaveBeenCalledTimes(1);
    });

    it('connects to db', () => {
        const connection = createConnection(process.env.MONGO_URL);

        expect(connection).not.toBe(undefined);
    });
});
