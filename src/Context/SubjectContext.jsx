import { useState, useContext, createContext } from "react";

const SubjectContext = createContext();

export function useSubject() {
    return useContext(SubjectContext);
}

export function SubjectContextProvider({ children }) {

    const subjectOptions = ["Vocabulary", "DSA", "Option 3"];

    const [subject, setSubject] = useState(subjectOptions[0]);

    return (
        <SubjectContext.Provider value={{
            subject,
            setSubject,
            subjectOptions,
        }} >
            {children}
        </SubjectContext.Provider>
    )
}