import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home'; 
import VerbEntry from './pages/VerbEntry';
import LookUpEntry from './pages/LookUpEntry';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verb-entry" element={<VerbEntry />} />
        <Route path="/lookup-entry" element={<LookUpEntry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;