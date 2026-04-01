import SubjectSelection from "./Components/SubjectSelection"
import { SubjectContextProvider } from "./Context/SubjectContext"
import { Routes, Route } from 'react-router-dom'

import AddWord from "./Components/Vocabulary/AddWord.jsx"
import WordlistMenu from "./Components/Vocabulary/WordlistMenu.jsx"
import EditWordInput from "./Components/Vocabulary/EditWordInput.jsx"
import QuizModal from "./Components/Vocabulary/QuestionModal.jsx"

function App() {

  return (
    <div id="container" className="w-full h-screen flex justify-center">
      <SubjectContextProvider>
        <Routes>
          <Route path="/" element={<SubjectSelection />} />
          <Route path="/vocabulary/add" element={<AddWord />} />
          <Route path="/vocabulary/edit" element={<WordlistMenu />} />
          <Route path="/vocabulary/edit-input" element={<EditWordInput />} />
          <Route path="/vocabulary/test" element={<QuizModal />} />
        </Routes>
      </SubjectContextProvider>
    </div>
  )
}

export default App