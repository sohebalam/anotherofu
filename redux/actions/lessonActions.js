import axios from "axios"

import {
  SELECT_VIDEO_FAIL,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
} from "../constants/lessonTypes"

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
