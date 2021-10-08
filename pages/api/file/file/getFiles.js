import nc from "next-connect"

import connectDB from "../../../../connectDB"
connectDB()

import onError from "../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
import { getFiles } from "../../../../controllers/fileCont"

const router = nc({ onError })

connectDB()

// console.log("here")

router.use(isAuthenticated, isInstructor).get(getFiles)

export default router
