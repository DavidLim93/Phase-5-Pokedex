const UPDATE_SCORES = "UPDATE_SCORES";

export const updateScores = (turns) => ({
  type: UPDATE_SCORES,
  payload: turns,
});

const initialState = {
    scores: [],
  };
  
  const scoreReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_SCORES:
        return {
          ...state,
          scores: [...state.scores, action.payload]
        };
      default:
        return state;
    }
  };
  

  export default scoreReducer;