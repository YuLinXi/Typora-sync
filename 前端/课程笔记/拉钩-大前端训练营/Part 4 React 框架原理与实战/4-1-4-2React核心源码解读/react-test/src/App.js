import * as React from "react"

function App() {
  React.useEffect(() => {
    console.log("useEffect")
  }, [])
  return (<div>
      <div>1234</div>
      <div>23123</div>
  </div>)
}

// class App extends React.Component {
//   componentDidMount() {
//     console.log("componentDidMount")
//   }
//   render() {
//     return <div>class component</div>
//   }
// }

export default App
