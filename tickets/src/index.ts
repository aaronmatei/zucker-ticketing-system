import { connectDB } from "./../config/db"
import { app } from "./app"

const PORT = process.env.PORT

// connect to DB 
const start = async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT SECRET must be defined")
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined")
    }
    connectDB()

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}
start()


