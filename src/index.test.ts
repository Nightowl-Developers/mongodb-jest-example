import buildMongoMock from './mockodb';
import { createConnection } from './index';

describe('testing mocko', () => {
    buildMongoMock({
        user: {
            documents: [
                {
                    first: 'first',
                    last: 'last',
                },
                {
                    first: 'first',
                    last: 'last',
                },
            ]
        },
    });

    it('connects to db', () => {
        const connection = createConnection('');

        expect(connection).not.toBe(undefined);
    });
});