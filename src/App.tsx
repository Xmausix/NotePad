import React from 'react';
import Editor from './components/Editor';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Editor />
    </ThemeProvider>
  );
}

export default App;