import { Link } from 'react-router-dom';
import { Bookmark, BookOpen } from 'lucide-react';
import { coverUrl } from '../lib/books';
export default function BookCard({ book, saved, onToggle }) {
  return <article className="book-card">
    <Link to={`/books/${book.id}`} className="cover-link" aria-label={`View ${book.title}`}>
      {book.coverId ? <img loading="lazy" src={coverUrl(book.coverId)} alt={`Cover of ${book.title}`} onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }} /> : null}
      <div className="cover-fallback" style={{display: book.coverId ? 'none' : 'flex'}}><BookOpen size={34}/><span>{book.title}</span></div>
    </Link>
    <div className="book-info"><Link to={`/books/${book.id}`} className="book-title">{book.title}</Link><p>{book.author}</p><div className="book-meta"><span>{book.year || 'Year unknown'}</span><button className={saved ? 'save-button active' : 'save-button'} aria-label={saved ? `Remove ${book.title} from saved books` : `Save ${book.title}`} title={saved ? 'Remove from list' : 'Save for later'} onClick={() => onToggle(book)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'}/></button></div></div>
  </article>;
}
