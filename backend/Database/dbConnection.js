import mongoose from "mongoose";

class DatabaseConnection {
    static instance = null;
    
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        DatabaseConnection.instance = this;
        this.isConnected = false;
        this.connection = null;
    }

    async connect() {
        if (this.isConnected) {
            console.log("✅ Using existing database connection");
            return this.connection;
        }

        try {
            console.log("MONGO_URI:", process.env.MONGO_URI);
            
            this.connection = await mongoose.connect(process.env.MONGO_URI, {
                dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
            });
            
            this.isConnected = true;
            console.log("✅ Connected to MongoDB");
            return this.connection;
        } catch (err) {
            console.error("❌ MongoDB connection failed:", err.message);
            throw err;
        }
    }

    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
}

// Export singleton instance
const databaseInstance = DatabaseConnection.getInstance();
export { databaseInstance as dbConnection };
