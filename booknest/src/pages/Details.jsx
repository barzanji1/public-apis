import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookOpen, ExternalLink } from 'lucide-react';
import { coverUrl, getBook } from '../lib/books';
export default function Details({ saved, onToggle }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController(); setStatus('loading');setError('');
    getBook(id, controller.signal).then(data => {setBook(data);setStatus('success');}).catch(err => {if(err.name !== 'AbortError'){setError(err.message);setStatus('error');}});
    return () => controller.abort();
  }, [id]);
  const existing = saved.find(b => b.id === id);
  return <section className="details-page"><Link to="/" className="back-link"><ArrowLeft size={17}/> Back to explore</Link>
    {status === 'loading' && <div className="message" role="status">Loading book details…</div>}
    {status === 'error' && <div className="message error" role="alert">{error}</div>}
    {status === 'success' && book && <div className="details-layout"><div className="detail-cover">{book.coverId ? <img src={coverUrl(book.coverId, 'L')} alt={`Cover of ${book.title}`} /> : <div className="cover-fallback"><BookOpen size={48}/>{book.title}</div>}</div><div className="detail-content"><div className="eyebrow">BETWEEN THE COVERS</div><h1>{book.title}</h1>{book.firstPublishDate && <p className="detail-date">First published: {book.firstPublishDate}</p>}<h3>About this book</h3><p className="description">{book.description}</p>{book.subjects.length > 0 && <div className="tags">{book.subjects.map(s => <span key={s}>{s}</span>)}</div>}<div className="detail-actions"><button className="primary-button" onClick={() => onToggle(existing || {id:book.id,title:book.title,author:'Unknown author',year:null,coverId:book.coverId})}><Bookmark size={17} fill={existing ? 'currentColor' : 'none'}/>{existing ? 'Remove from reading list' : 'Save to reading list'}</button><a href={`https://openlibrary.org/works/${id}`} target="_blank" rel="noopener noreferrer" className="external-link">View on Open Library <ExternalLink size={16}/></a></div></div></div>}
  </section>;
}
