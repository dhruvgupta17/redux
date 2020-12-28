const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BookStore ={
     NumberOfBook:10,
     TotelPrice:500
}

function BuyBook(){
    return{
        type:"BuyBook"
    }
}
const BookReducer =(state=BookStore,action)=>{
        switch(action.type){
            case "BuyBook":return{
                ...state,
                NumberOfBook:state.NumberOfBook-1
            }
            default:return state;
        }
}


// -------------- pen store

const PenStore ={
    NumberOfPen:50,
    Totelprice:400
 }

function BuyPen(){
    return{
        type:"BuyPen"
    }
}

const PenReducer =(state=PenStore,action)=>{
    switch(action.type){
        case "BuyPen":return{
            ...state,
            NumberOfPen:state.NumberOfPen-1
        }
        default:return state;
    }

}

const reducerg = combineReducers({
    Book:BookReducer,
    Pen:PenReducer
});


const BookStoreReduser = createStore(reducerg);
console.log("initial state",BookStoreReduser.getState());

const show = BookStoreReduser.subscribe(()=>{
console.log("update state",BookStoreReduser.getState())});
BookStoreReduser.dispatch(BuyBook());
BookStoreReduser.dispatch(BuyPen());
show();











