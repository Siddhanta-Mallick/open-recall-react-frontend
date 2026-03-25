import { useState, useContext, createContext } from "react";

const SubjectContext = createContext();

export function useSubject() {
    return useContext(SubjectContext);
}

export function SubjectContextProvider({ children }) {
    const [subject, setSubject] = useState("");

    return (
        <SubjectContext.Provider value={{
            subject,
            setSubject,
        }} >
            {children}
        </SubjectContext.Provider>
    )
}