const redux = require('redux');
const createStore = redux.createStore;
const bookStore={
      NumberOfbook:10,
      NumberOfPen:10
}
function buybook(){
    return{
        type:"buy_book",
    }
}
function buyPen(){
    return{
        type:"buy_pen"
    }
}
const Reducer =(state=bookStore,action)=>{
    switch(action.type){
       case "buy_book":return{
           ...state,
        NumberOfbook:state.NumberOfbook-1
       }
       case "buy_pen":return{
           ...state,
        NumberOfPen:state.NumberOfPen-2
       }
       default:return state;
    }  
}
const store = createStore(Reducer);
console.log("initial state",store.getState());
const unsubscribe =store.subscribe(()=>{
console.log('updated state',store.getState())});
store.dispatch(buybook());
store.dispatch(buybook());
store.dispatch(buybook());
store.dispatch(buyPen());
store.dispatch(buyPen());
store.dispatch(buyPen());
unsubscribe();
console.log("initial state",bookStore.NumberOfbook);