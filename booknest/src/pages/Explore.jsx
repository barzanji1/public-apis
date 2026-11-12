import { useEffect, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import BookCard from '../components/BookCard';
import { searchBooks } from '../lib/books';
export default function Explore({ saved, onToggle }) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('fiction');
  const [retry, setRetry] = useState(0);
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading'); setError('');
    searchBooks(query, controller.signal).then(result => { setBooks(result); setStatus('success'); }).catch(err => { if (err.name !== 'AbortError') { setError(err.message); setStatus('error'); } });
    return () => controller.abort();
  }, [query, retry]);
  function submit(e) { e.preventDefault(); if (input.trim()) setQuery(input.trim()); }
  return <>
    <section className="hero"><div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div><h1>Find a story worth <em>getting lost in.</em></h1><p>Explore millions of books, discover new favorites, and build a reading list that feels like you.</p>
      <form className="search-form" onSubmit={submit}><Search size={20}/><input aria-label="Search books" value={input} onChange={e => setInput(e.target.value)} placeholder="Search by title, author, or subject..."/><button type="submit">Discover <ArrowRight size={17}/></button></form>
      <div className="suggestions"><span>Try searching:</span>{['Mystery','Science fiction','History'].map(term => <button key={term} onClick={() => {setInput(term);setQuery(term);}}>{term}</button>)}</div>
    </section>
    <section className="catalog"><div className="section-heading"><div><div className="eyebrow">THE BOOKSHELF</div><h2>{query === 'fiction' ? 'Explore something new' : `Results for “${query}”`}</h2></div><span className="result-label">Powered by Open Library</span></div>
      {status === 'loading' && <div className="message" role="status">Finding your next great read…</div>}
      {status === 'error' && <div className="message error" role="alert">{error} <button onClick={() => setRetry(n => n + 1)}>Retry search</button></div>}
      {status === 'success' && (books.length ? <div className="book-grid">{books.map(book => <BookCard key={book.id} book={book} saved={saved.some(b => b.id === book.id)} onToggle={onToggle}/>)}</div> : <div className="message">No books found. Try another title or author.</div>)}
    </section>
  </>;
}
