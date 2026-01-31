import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<Navigate to="/books" replace />} />
         <Route path="/books" element={<BookList />} />
         <Route path="/books/:id" element={<BookDetails />} />
       </Routes>
    </Router>
  );
}

export default App;
