import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { App } from './App'
import { createAppRoot } from './functions/createAppRoot'

// create root
const ROOT: Root = createRoot( createAppRoot( 'root' ))

// render application
ROOT.render(
 <React.StrictMode>
   <App />
 </React.StrictMode>
)