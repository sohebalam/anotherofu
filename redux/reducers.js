import { combineReducers } from "redux"
import {
  courseLoadReducer,
  coursePublishedReducer,
  coursesLoadReducer,
  createCourseReducer,
  deleteImageReducer,
  selectVideoReducer,
  uploadImageReducer,
} from "./reducers/lessonReducers"
import {
  forgotPasswordReducer,
  newInstructorReducer,
  profileReducer,
  registerReducer,
  regSocialReducer,
  resetPasswordReducer,
  updateProfileReducer,
} from "./reducers/userReducers"

const reducer = combineReducers({
  register: registerReducer,
  profile: profileReducer,
  update: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  regSocial: regSocialReducer,
  updateProfile: updateProfileReducer,
  newInstructor: newInstructorReducer,

  //lessons
  selectVideo: selectVideoReducer,
  createCourse: createCourseReducer,
  uploadImage: uploadImageReducer,
  deleteImage: deleteImageReducer,
  coursesLoad: coursesLoadReducer,
  coursePublished: coursePublishedReducer,
  courseLoad: courseLoadReducer,
})

export default reducer
