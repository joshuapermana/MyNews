
const initialState = {
    news: [],
    allnews:[]
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NEWS': {
        // console.log(news)
        return {
          ...state,
          news: [...state.news,action.payload],
        };
      }
      case 'ALLNEWS': {
        // console.log(news)
        return {
          ...state,
          allnews: [...state.allnews,action.payload],
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default newsReducer;
  