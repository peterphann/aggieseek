import {createContext, useContext, useState} from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popupText, setPopupText] = useState([])

    const setPopup = text => {
        setPopupText({
            text: text,
            key: Date.now(),
        })
    }

    return (
        <PopupContext.Provider value={{ popupText, setPopup }}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext)