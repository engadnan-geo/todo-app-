import { Router } from "express";
import { getAllUsers } from "../controllers/admin";
import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only routes for user management
 */

/**
 * @swagger
 * /api/admin/getusers:
 *   get:
 *     summary: Get all registered users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all registered users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 672a7e678b9d2b4569a21f9b
 *                   username:
 *                     type: string
 *                     example: "noor"
 *                   email:
 *                     type: string
 *                     example: "noor@example.com"
 *                   role:
 *                     type: string
 *                     enum: [user, admin]
 *       401:
 *         description: Unauthorized (no token provided)
 *       403:
 *         description: Forbidden (not an admin)
 */
router.get("/getusers", authMiddleware, authorize("admin"), getAllUsers);

export default router;
