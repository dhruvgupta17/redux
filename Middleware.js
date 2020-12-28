const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

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

const logger =store=>{
    return next=>{
        return action=>{
            const result=next(action);
            console.log("middleware log" ,result);
            return result;
        }
    }
}


const store = createStore(reducerg,applyMiddleware(logger));
console.log("initial state",store.getState());

const show = store.subscribe(()=>{
console.log("update state",store.getState())});
store.dispatch(BuyBook());
store.dispatch(BuyPen());
show();











