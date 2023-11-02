import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.render("chat", { messages: [] });
    } catch (error) {
        return error;
    }
});

export default router;