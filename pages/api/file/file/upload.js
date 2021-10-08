import nc from "next-connect"
const File = require("../../../../models/fileModel")
import connectDB from "../../../../connectDB"
import { formidableSave } from "../../../../controllers/fileCont"
import onError from "../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
connectDB()

export const config = {
  api: {
    bodyParser: false,
  },
}

const router = nc({ onError })

// console.log("here")

router.use(isAuthenticated, isInstructor).post(formidableSave)

export default router
