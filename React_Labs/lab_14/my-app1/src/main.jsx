import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'

function Abc1(){
  return(
    <h1>Hello World using Function</h1>
  )
}

class Abc2 extends React.Component{
  render(){
    return(
      <h1>Hello World from class</h1>
    )
  }
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <h1>Hello World</h1>
      <Abc1 />
      <Abc2 />
  </StrictMode>,
)
