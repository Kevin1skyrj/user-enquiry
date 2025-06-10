let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
let dotenv = require("dotenv").config();
let app = express();

// Routes
app.use(express.json());
app.use(cors());
app.use("/api/web/enquiry",enquiryRouter)

// Connect to MongoDB
mongoose.connect(process.env.DBUrl)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 3000, () =>
            console.log(`Server is running on port ${process.env.PORT}`)
        );
    })
    .catch((err) => console.log(err));