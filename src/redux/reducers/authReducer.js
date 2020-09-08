
const initialState = {
  loggedIn: false,
  regist: false,
  uid: null,
  email: null,
  fullname: null,
  phone: null,
  photo: false,
  newUser: false,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'LOGIN': {
      const { uid,email } = action.payload;
      return {
        ...state,
        ...{
          uid,
          email,
          loggedIn: true,
          regist: false,
        },
      };
    }
    
    case 'REGISTER': {
      const { email, uid } = action.payload;
      return {
        ...state,
        ...{
          email,
          uid,
          regist: true,
          newUser: true,
        },
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        ...{
          loggedIn: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};


export default authReducer;
