import express from "express";
import path from "path";
import routes from "./routes";
import { errorMiddleware } from "./shared/middlewares/error.middleware.js";

const app = express();

app.use(
    express.static(
        path.join(
            process.cwd(),
            "frontend"
        )
    )
);

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export default app;