import http from "http";
import express from "express";

const app = express()
const PORT = process.env.PORT || 3080

app.get('/', (req, res) => {res.send ('Yes, it works!');});
app.listen(PORT, () => console.log(`Server listeningon port: ${PORT}`));