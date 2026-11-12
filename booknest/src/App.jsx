import { useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { BookOpen, Bookmark } from 'lucide-react';
import Explore from './pages/Explore';
import Details from './pages/Details';
import Saved from './pages/Saved';
const STORAGE_KEY = 'booknest:saved:v1';
function readSaved() { try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } }
export default function App() {
  const [saved, setSaved] = useState(readSaved);
  function toggleSaved(book) { setSaved(previous => { const next = previous.some(b => b.id === book.id) ? previous.filter(b => b.id !== book.id) : [...previous,book]; try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Browsers may block storage; in-memory state still works. */ } return next; }); }
  return <BrowserRouter><div className="site-shell"><header className="site-header"><div className="header-inner"><Link to="/" className="brand"><span className="brand-icon"><BookOpen size={22}/></span>book<span>nest.</span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Explore</NavLink><NavLink to="/saved">My reading list <Bookmark size={15}/>{saved.length > 0 && <span className="nav-count">{saved.length}</span>}</NavLink></nav></div></header><main><Routes><Route path="/" element={<Explore saved={saved} onToggle={toggleSaved}/>}/><Route path="/books/:id" element={<Details saved={saved} onToggle={toggleSaved}/>}/><Route path="/saved" element={<Saved saved={saved} onToggle={toggleSaved}/>}/><Route path="*" element={<div className="message"><h2>Page not found</h2><Link to="/">Return to Explore</Link></div>}/></Routes></main><footer><div>© {new Date().getFullYear()} BookNest. Made for curious readers.</div><div>Book data provided by <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">Open Library</a>.</div></footer></div></BrowserRouter>;
}
