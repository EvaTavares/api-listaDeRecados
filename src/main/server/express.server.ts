import { createApp } from "../config/express.config";

export class Server {
  public static listen() {
    const app = createApp();
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`API is running ${port}`);
    });
  }
}
