import { MongoClient } from "mongodb";
import IsEmail from "isemail";

const isEmpty = (val) => {
    return val === null || val === undefined;
};
const validateEmail = (mail) => {
    return !isEmpty(mail) && IsEmail.validate(mail);
};
class mongoHelper {
    constructor(
        url = "mongodb://localhost:27017",
        options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
        dbName = "powerful"
    ) {
        this._dbClient = new MongoClient(url, options);
        this._dbName = dbName;
        this._dbClient;
        this._connected = false;
        this._collection = null;
    }

    async connect() {
        if (!this._connected) {
            await this._dbClient.connect();
            this._connected = true;
        }
        return this;
    }

    async collection(collectionName, indexOption, uniqueOpts) {
        if (this._connected && !this._collection) {
            const db = this._dbClient.db(this._dbName);
            const collection = db.collection(collectionName);
            await collection.createIndex(indexOption, uniqueOpts);
            this._db = db;
            this._collection = collection;
        }
        return this._collection;
    }

    close() {
        this._dbClient.close();
        this._connected = false;
        this._collection = null;
    }
}

const getIp = (req) => {
    let sourceIP =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (sourceIP.substr(0, 7) === "::ffff:") sourceIP = sourceIP.substr(7);
    return sourceIP;
};
export default async function handler(req, res) {
    const { firstname, email } = req.body;
    try {
        const ip = getIp(req);
        if (!!firstname && validateEmail(email)) {
            const dbHelper = new mongoHelper();

            await dbHelper.connect();
            const subscribeCollection = await dbHelper.collection(
                "site-subscribes",
                { email: 1, ip: 1 },
                { unique: true }
            );

            const findResult = await subscribeCollection
                .find({ email })
                .toArray();
            if (findResult.length > 0) {
                res.status(500).json({ message: "Email is exist!" });
            } else {
                const findRowsByIp = await subscribeCollection
                    .find({ ip })
                    .count();
                if (findRowsByIp < 5) {
                    await subscribeCollection.insertOne({
                        firstname,
                        email,
                        ip,
                    });

                    dbHelper.close();
                    res.status(201).json({
                        message: "Data inserted successfully!",
                    });
                } else {
                    res.status(500).json({
                        message: "Too many submissions, please try again later",
                    });
                }
            }
        } else {
            res.status(500).json({
                message: "firstname or email format is invalid",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
