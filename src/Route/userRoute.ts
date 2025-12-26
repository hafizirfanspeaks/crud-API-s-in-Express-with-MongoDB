import Express from "express";
import { fetch, create, update, deleteUser} from "../Controller/userController.js";
import { checkEmail } from "../middleware/validateUser.js";

const route = Express.Router();

route.get("/fetch", fetch);
route.post("/create", checkEmail,create)
route.put("/update/:id", update)
route.delete("/delete/:id", deleteUser)
export default route;
