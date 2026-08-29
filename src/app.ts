import { envs } from "./config/envs.js";
import { Server } from "./presentation/server.js";



(() => {
    main();
})();


function main(): void {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
    });
    server.start();
}