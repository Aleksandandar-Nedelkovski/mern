import {
  // GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  // GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_VIDEO,
  GET_VIDEOS,
} from "../actions/types";

const initialState = {
  videos: [],
  video: null,
  description: "",
  privacy: "",
  fiepath: "",
  duration: "",
  thumbnail: "",
  loading: true,
  error: {},
};

function videoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case GET_VIDEO:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        videos: [payload, ...state.videos],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        videos: state.videos.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        videos: state.videos.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}

export default videoReducer;
