import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VerbEntry from './pages/VerbEntry';
import LookUpEntry from './pages/LookUpEntry';
import Header from './components/Header';
import View from './pages/View'
import Edit from './pages/Edit'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verb-entry" element={<VerbEntry />} />
        <Route path="/lookup-entry" element={<LookUpEntry />} />
        <Route path='/view' element={<View />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;