import {
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  LOAD_COURSES_FAIL,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  SELECT_VIDEO_FAIL,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/lessonTypes"

export const coursesLoadReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
      return { loading: true }
    case LOAD_COURSES_SUCCESS:
      return { loading: false, courses: action.payload }
    case LOAD_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const selectVideoReducer = (
  state = { loading: false, video: null },
  action
) => {
  switch (action.type) {
    case SELECT_VIDEO_REQUEST:
      return { loading: true }
    case SELECT_VIDEO_SUCCESS:
      return { loading: false, video: action.payload }
    case SELECT_VIDEO_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createCourseReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { loading: true }
    case CREATE_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case CREATE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const uploadImageReducer = (
  state = { loading: false, image: null },
  action
) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true }
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, image: action.payload }
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteImageReducer = (
  state = { loading: false, image: null },
  action
) => {
  switch (action.type) {
    case DELETE_IMAGE_REQUEST:
      return { loading: true }
    case DELETE_IMAGE_SUCCESS:
      return { loading: false, image: action.payload }
    case DELETE_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
