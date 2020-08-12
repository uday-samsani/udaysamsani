const Path = require('path');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server');
const { AuthenticationError } = require('apollo-server');
const { Storage } = require('@google-cloud/storage');
const moment = require('moment');

const authenticate = require('../../utils/authenticate');
const { env } = require('process');

const generateName = (filename) => {
    const fn = filename.split('.')[0];
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = fn.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const fileName = `${date}-${randomString}-${cleanFileName}`;
    return fileName.substring(0, 50) + '.' + filename.split('.')[1];
};

const resolvers = {
    Mutation: {
        deleteImage: async (_, { path, filename }, context) => {
            let user = authenticate(context);
            user = await User.findById(user.id);
            if (user.role === 'admin' || user.role === 'editor') {
                const gcs = new Storage({
                    projectId: 'uday-samsani',
                    keyFilename: Path.join(
                        __dirname,
                        '../../config/gcskey.json'
                    ),
                });
                const bucket = gcs.bucket('uday-samsani');
                const [files] = await bucket.getFiles();
                const filenames = files.map((file) => file.name);
                if (
                    filenames.filter((name) => name === filename).length === 1
                ) {
                    await bucket.file(path + filename).delete();
                    return path + '/' + filename + ' deleted';
                } else {
                    throw new UserInputError('Error', {
                        image: 'image not found',
                    });
                }
            } else {
                throw new AuthenticationError('invalid accesss');
            }
        },
        uploadImage: async (_, { path, file }, context) => {
            let user = authenticate(context);
            user = await User.findById(user.id);
            if (user.role === 'admin' || user.role === 'editor') {
                const { createReadStream, filename } = await file;
                const fileName = generateName(filename);
                const gcs = new Storage({
                    projectId: 'uday-samsani',
                    keyFilename: Path.join(
                        __dirname,
                        '../../config/gcskey.json'
                    ),
                });
                const writeStream = bucket
                    .file(path + fileName)
                    .createWriteStream({
                        resumable: false,
                        gzip: true,
                    });
                const ans = await new Promise((res) => {
                    createReadStream()
                        .pipe(writeStream)
                        .on('finish', () => {
                            res('success');
                        })
                        .on('error', (err) => {
                            console.log(err);
                            writeStream.end();
                            throw new Error('upload failed');
                        });
                });
                return { path: path, filename: fileName };
            } else {
                throw new AuthenticationError('invalid accesss');
            }
        },
    },
};

module.exports = resolvers;
