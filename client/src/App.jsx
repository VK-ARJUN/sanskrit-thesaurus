import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VerbEntry from './pages/VerbEntry';
import LookUpEntry from './pages/LookUpEntry';
import Header from './components/Header';
import Edit from './pages/Edit'
import Root from './pages/Root';
import ViewHome from './pages/ViewHome';
import ViewVerb from './pages/ViewVerb';
import ViewLookup from './pages/ViewLookup';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verb-entry" element={<VerbEntry />} />
        <Route path="/lookup-entry" element={<LookUpEntry />} />
        <Route path='/view' element={<ViewHome />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
        <Route path='/root' element={<Root />}></Route>
        <Route path='/view/verb' element={<ViewVerb />}></Route>
        <Route path='/view/lookup' element={<ViewLookup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;