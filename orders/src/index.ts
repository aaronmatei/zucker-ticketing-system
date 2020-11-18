import { connectDB } from "./../config/db";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper"

const PORT = process.env.PORT;

// start function 
const start = async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT SECRET must be defined");
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID must be defined");
    }

    if (!process.env.NATS_URL) {
        throw new Error("NATS_URL must be defined");
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID must be defined");
    }


    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

    // gracefull shutdown
    natsWrapper.client.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close()); //interrupt
    process.on('SIGTERM', () => natsWrapper.client.close()); //terminate

    // connect to DB
    connectDB();

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
};
start();
