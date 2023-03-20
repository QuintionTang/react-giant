import mongoose from "mongoose";
import subscribes from "../../models/subscribes";

class mongoHelper {
    constructor(
        url = "mongodb://localhost:27017",
        options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
        dbName = "powerful"
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
                res.status(500).json({ message: "Email地址已经订阅过！" });
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
                        message: "数据提交成功！谢谢！",
                    });
                } else {
                    res.status(500).json({
                        message: "Too many submissions, please try again later",
                    });
                }
            }
        } else {
            res.status(500).json({
                message: "firstname or email 格式无效",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
