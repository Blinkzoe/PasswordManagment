import app from "./server";
import { env } from "./shared/config/env.js";

app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
});
