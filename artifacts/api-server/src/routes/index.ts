import { Router, type IRouter } from "express";
import healthRouter from "./health";
import profilesRouter from "./profiles";
import matchesRouter from "./matches";
import chatRouter from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(profilesRouter);
router.use(matchesRouter);
router.use(chatRouter);

export default router;
