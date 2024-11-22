import { ConsolePage } from './pages/ConsolePage';
import './App.scss';
import { FileUpload } from './pages/FileUpload';
import {  Routes, Route, Outlet} from 'react-router-dom';

function App() {
  return (
    <div data-component="App">
       <Routes>
          <Route index path="/" element={<FileUpload />} />
          <Route path="console" element={<ConsolePage />} />
      </Routes>
      <Outlet />
    </div>  
  );
}

export default App;
