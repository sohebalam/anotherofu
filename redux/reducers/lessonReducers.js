import {
  SELECT_VIDEO_FAIL,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
} from "../constants/lessonTypes"

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
