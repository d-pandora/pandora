import React, {
  createContext, useContext, useState, FC,
} from 'react'

const StoreContext: any = createContext({})

export const StoreProvider: FC = ({ children }) => {
  const [state, setState]: any = useState({})


  const setStore = (storeName: string, value: any) => {
    setState({
      ...state,
      [storeName]: value,
    })
  }

  return (
    <StoreContext.Provider value={{ ...state, setStore }}>
      {children}
    </StoreContext.Provider>
  )
}


export const useStore = (storeName: string) => (initialValue: any) => {
  const store: { [key: string]: any } = useContext(StoreContext)

  if (!store[storeName]) {
    store[storeName] = initialValue
  }
  return [store[storeName], (value: any) => store.setStore(storeName, value)]
}
