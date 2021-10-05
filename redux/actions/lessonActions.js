import axios from "axios"

import {
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  SELECT_VIDEO_FAIL,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/lessonTypes"

export const imageDelete = (image) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_IMAGE_REQUEST })

    const { data } = await axios.post("/api/course/delete", { image })

    dispatch({
      type: DELETE_IMAGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const imageUpload = (uri) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST })

    let { data } = await axios.post("/api/course/image", {
      image: uri,
    })

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const selectLesson = (video) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_VIDEO_REQUEST })

    const data = video

    dispatch({
      type: SELECT_VIDEO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SELECT_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const courseCreate = (image, values) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST })

    var strNum = values.price
    strNum = strNum.toString().replace("£", "")
    values.price = parseFloat(strNum)

    const { data } = await axios.post("/api/course/course", {
      ...values,
      image,
    })

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
