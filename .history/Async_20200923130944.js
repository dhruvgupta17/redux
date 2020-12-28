const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios =require('axios');

// intial state
const InitialState={
    loading:false,
    User:[],
    error:""
}

// Action
const USER_REQUEST="USER_REQUEST";
const USER_SUCCESS="USER_SUCCESS";
const USER_ERROR="USER_ERROR";


// Action call  function
const UserRequest=()=>{
    return{
        type:USER_REQUEST
    }
}

const UserSuccess=(user)=>{
    return{
        type:USER_SUCCESS,
        payload:user
    }
}
const UserError=(error)=>{
    return{
        type:USER_ERROR,
        payload:error
    }
}

// reducer Function
const reducer=(state=InitialState,action)=>{
     switch(action.type){
          case "USER_REQUEST":return{
              ...state,
              loading:true
          }
          case "USER_SUCCESS":return{
            loading:false,
            user:action.payload,
            error:''
        }
        case "USER_ERROR":return{
            loading:false,
            user:[],
            error:action.payload,
        }
     }
}

// dispatch conditional function
  const fetchUser=()=>{
      return function(dispatch){
          dispatch(UserRequest());
          axios.get('https://jsonplaceholder.typicode.com/users')
          .then(response=>{
           const users = response.data.map(user=>user.name)
           dispatch(UserSuccess(users))
          })
          .catch(error=>{
            //   errorMSG
            dispatch(UserError(error.message))
          })
      }
  }
// Store Function
const store = createStore(reducer,applyMiddleware(thunkMiddleware));
// Subscribe Function
store.subscribe(()=>{
    console.log("int status" ,store.getState())
});
store.dispatch(fetchUser());