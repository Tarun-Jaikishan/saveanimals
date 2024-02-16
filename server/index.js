const express = require("express");
const cors = require("cors");
const { mongoConnect } = require("./config/mongo.connect");
const app = express();

// Routers
const authRouter = require("./routes/auth.routes");
const publicRouter = require("./routes/public.routes");
const userRouter = require("./routes/user.routes");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/public", publicRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: `Welcome to SaveAnimals API` });
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server Running On PORT ${port}`);
  await mongoConnect();
});
