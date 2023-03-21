import mongoose from "mongoose";
import subscribes from "../../models/subscribes";

const MONGOURL = process.env.MONGODB_URI;
const DBNAME = process.env.DB_NAME;

class mongoHelper {
    constructor(
        url = MONGOURL,
        options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
        dbName = DBNAME
    ) {
        this._dbClient;
        this._dbUrl = `${url}/${dbName}`;
        this._dbOpts = options;
        this._connected = false;
        this._collection = null;
    }

    async connect() {
        if (!this._connected) {
            await mongoose.connect(this._dbUrl);
            this._connected = true;
        }
        return this;
    }

    close() {
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
        if (!!firstname && !!email) {
            const dbHelper = new mongoHelper();

            await dbHelper.connect();

            const findResult = await subscribes.findOne({ email });
            if (findResult) {
                res.status(500).json({
                    message: "Email address Already subscribed!",
                });
            } else {
                const findRowsByIp = await subscribes
                    .find({ ip })
                    .countDocuments();
                if (findRowsByIp < 5) {
                    await subscribes.create({
                        firstname,
                        email,
                        ip,
                    });
                    dbHelper.close();
                    res.status(201).json({
                        message: "Data submitted successfully",
                    });
                } else {
                    res.status(500).json({
                        message: "Too many submissions, please try again later",
                    });
                }
            }
        } else {
            res.status(500).json({
                message: "firstname or email Invalid",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
