import './App.css';
import Test from './Test';
import DynamicTable from './DynamicTable';
import SingleCalc from './SingleCalc';
import MyComponent from './MyComponent';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Link to="/test" className="styled-link">
        test
      </Link>
      <Link to="/single" className="styled-link">
        single
      </Link>
      <Link to="/d" className="styled-link">
        DynamicTable
      </Link>
      <Link to="/mycomponent" className="styled-link">
        mycomponent
      </Link>

      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/single" element={<SingleCalc />} />
            <Route path="/d" element={<DynamicTable />} />
            <Route path="/mycomponent" element={<MyComponent />} />
          </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
