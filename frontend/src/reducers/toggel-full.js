const initialFullState = false;

const fullReducer = (state = initialFullState, action) => {
  switch (action.type) {
    case 'TOGGLE_FULL':
      return action.payload;
    default:
      return state;
  }
};

export default fullReducer;
