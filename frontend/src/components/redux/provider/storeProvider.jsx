"use client"

import { useRef } from "react";
import { Provider } from "react-redux";
import createStore from "../store/store";


const StoreProvider = function ({children}){
    const storeRef = useRef();

    if(!storeRef.current){
        storeRef.current = createStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>

}

export default StoreProvider;