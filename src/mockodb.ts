import mongodb, { MongoClient, Db } from 'mongodb';
jest.mock('mongodb');

interface Collections {
    [key: string]: Collection;
}

interface Collection {
    documents: Document[];
}

interface Document {
    [key: string]: string | number | boolean | object;
}

const buildMongoMock = (collections: Collections) => {
    Db.prototype.constructor = jest.fn().mockImplementation(() => {
        return {
            /**
             * returns a specific collection by name.
             *
             * @param name
             */
            collection: (name: string) => {
                return {
                    /**
                     * finds documents by expression.
                     *
                     * @param expression
                     */
                    find: (expression: object) => {
                        return this.collections()[name].documents.filter((document: Document) => {
                            if (typeof expression === 'object') {
                                // todo check if expression exists on document
                            }
                        });
                    },
                    /**
                     * finds document by id.
                     * @param id
                     */
                    findById: (id: string) => {
                        return this.collections()[name].documents.filter((document: Document) => {
                            return document._id === id;
                        });
                    },
                };
            },
            /**
             * returns mock collections.
             */
            collections: () => {
                return Object.values(collections).map((collection) => {
                    return {
                        _id: "", // todo: generate uuids
                        ...collection,
                    };
                });
            },
        };
    });

    MongoClient.prototype.constructor = jest.fn().mockImplementation(() => {
        return {
            /**
             * mock connection.
             */
            connect: () => {},
            /**
             * mock the connection close.
             */
            close: () => {},
            /**
             * returns a mock db object.
             *
             * @param name
             */
            db: (name: string) => new Db(name),
        }
    });
};

export default buildMongoMock;