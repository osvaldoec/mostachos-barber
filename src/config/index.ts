import 'dotenv/config';

const IS_LOCAL = process.env.IS_LOCAL === 'true' ? true : false;

export const config = {
    IS_LOCAL,
    PORT: process.env.PORT || '3000'
};

