import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import BookCard from '../components/BookCard';
export default function Saved({ saved, onToggle }) {
  return <section className="saved-page"><div className="eyebrow">YOUR PERSONAL COLLECTION</div><h1>My reading list<span className="count">{saved.length}</span></h1><p className="saved-intro">All the stories you want to come back to, in one place.</p>{saved.length ? <div className="book-grid">{saved.map(book => <BookCard key={book.id} book={book} saved onToggle={onToggle}/>)}</div> : <div className="empty-saved"><Bookmark size={34}/><h2>Your shelf is waiting.</h2><p>Save a book while exploring and it will appear here.</p><Link to="/" className="primary-button">Explore books</Link></div>}</section>;
}
