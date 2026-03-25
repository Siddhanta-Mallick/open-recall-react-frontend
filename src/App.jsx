import SubjectSelection from "./Components/SubjectSelection"
import { SubjectContextProvider } from "./Context/SubjectContext"

function App() {

  return (
    <div id="container" className="w-full h-screen flex justify-center">
      <SubjectContextProvider>
        <SubjectSelection />
      </SubjectContextProvider>
    </div>
  )
}

export default App