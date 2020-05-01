import { MongoClient } from 'mongodb';

/**
 * Creates a connection to MongoDB server.
 *
 * @param url
 */
export const createConnection = async (url: string): Promise<any> => {
    const client = new MongoClient(url);

    await client.connect();

    return new Promise((resolve, reject) => {
        !!client
            ? resolve(client)
            : reject();
    });
};
