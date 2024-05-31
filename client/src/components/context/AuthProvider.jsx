import {createContext, useContext, useState} from 'react';

const AuthContext = createContext({})

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)

    // const [cartItems, setCartItems] = useState([])

    const login = (data) => setUser(data)
    const update = (data) => setUser(data)
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{user, setUser, update, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


// import {createContext, useContext, useState} from 'react';

// const AuthContext = createContext({})

// export const useAuth = ()=>{
//     return useContext(AuthContext)
// }

// export const AuthProvider = ({children})=>{
//     const [user, setUser] = useState(null)

//     // const [cartItems, setCartItems] = useState([])

//     const login = (data) => setUser(data)
//     const update = (data) => setUser(data)
//     const logout = () => setUser(null)

//     return (
//         <AuthContext.Provider value={{user, setUser, update, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }