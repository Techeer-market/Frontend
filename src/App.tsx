import { Suspense } from 'react';
import Router from './Router';

function App() {
  return (
    <Suspense>
      <div className="App">
        <Router></Router>
      </div>
    </Suspense>
  );
}

export default App;
