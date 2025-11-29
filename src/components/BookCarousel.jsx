import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BookCarousel.css';
import kahonNiLolaCover from '../assets/book_covers/ang kahon ni lola cover.png';
import aklatangPusaCover from '../assets/book_covers/ang aklatang pusa cover.png';
import batangMaramingBawalCover from '../assets/book_covers/ang batang maraming bawal cover.png';
import silimCover from '../assets/book_covers/silim prinsesa ng dilim cover.png';
import whereAreMyLegsCover from '../assets/book_covers/where are my legs cover.png';

const booksData = [
  {
    id: 1,
    title: "Ang Kahon ni Lola",
    author: "Ioannis Sicuya",
    cover: kahonNiLolaCover,
    pdfPath: "/book_pdfs/ang kahon ni lola.pdf"
  },
  {
    id: 2,
    title: "Ang Aklatang Pusa (The Cat Library)",
    author: "Eugene Y. Evasco",
    cover: aklatangPusaCover,
    pdfPath: "/book_pdfs/ang aklatang pusa.pdf"
  },
  {
    id: 3,
    title: "Ang Batang Maraming Bawal",
    author: "Fernando Rosal Gonzalez",
    illustrator: "Rodel Tapaya",
    cover: batangMaramingBawalCover,
    pdfPath: "/book_pdfs/ang batang maraming bawal.pdf"
  },
  {
    id: 4,
    title: "Silim - Prinsesa ng Dilim",
    author: "Mark Joseph Bacho",
    illustrator: "Luis Lorenzana",
    cover: silimCover,
    pdfPath: "/book_pdfs/silim.pdf"
  },
  {
    id: 5,
    title: "Where Are My Legs?",
    author: "Leonard John Banaag",
    illustrator: "Nat Lamina",
    cover: whereAreMyLegsCover,
    pdfPath: "/book_pdfs/where are my legs.pdf"
  }
];

const BookCarousel = ({ searchQuery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredBooks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredBooks.length) % filteredBooks.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
    setIsSwiping(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
    const diff = Math.abs(touchStart - e.touches[0].clientX);
    if (diff > 10) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (Math.abs(swipeDistance) > 75) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        handleNext();
      } else {
        // Swiped right - go to prev
        handlePrev();
      }
    }
    // Reset swiping state after a short delay
    setTimeout(() => setIsSwiping(false), 100);
  };

  const handleMouseDrag = (e, info) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  const handleDownloadPDF = () => {
    if (selectedBook && selectedBook.pdfPath) {
      const link = document.createElement('a');
      link.href = selectedBook.pdfPath;
      link.download = `${selectedBook.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (selectedBook) return;
    
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Enter' && filteredBooks[currentIndex]) {
      handleSelectBook(filteredBooks[currentIndex]);
    }
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="no-results">
        <p>Walang nakitang libro. Subukan ang ibang paghahanap.</p>
      </div>
    );
  }

  return (
    <div 
      className="carousel-container" 
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        {!selectedBook ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="carousel-view"
          >
            <motion.div 
              className="carousel-title-top"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="carousel-book-title">{filteredBooks[currentIndex]?.title}</h2>
            </motion.div>

            <motion.div 
              className="carousel-wrapper"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleMouseDrag}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="books-stack">
                {filteredBooks.map((book, index) => {
                  const position = (index - currentIndex + filteredBooks.length) % filteredBooks.length;
                  const isCenter = position === 0;
                  
                  return (
                    <motion.div
                      key={book.id}
                      className={`book-card ${isCenter ? 'center' : ''}`}
                      style={{
                        zIndex: filteredBooks.length - position,
                      }}
                      animate={{
                        x: position === 0 ? 0 : position < 3 ? position * 80 : 200,
                        scale: position === 0 ? 1 : 1 - position * 0.1,
                        rotateY: position === 0 ? 0 : position * 15,
                        opacity: position < 3 ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                      onClick={() => isCenter && !isSwiping && handleSelectBook(book)}
                    >
                      <div className="book-cover-wrapper">
                        <img 
                          src={book.cover} 
                          alt={book.title}
                          className="book-cover"
                        />
                        <div className="book-spine"></div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              className="carousel-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="book-counter">
                {currentIndex + 1} / {filteredBooks.length}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="detail-view"
          >
            <motion.div 
              className="detail-info"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <button className="back-button" onClick={handleBack}>
                ← Bumalik
              </button>
              <h1 className="book-title">{selectedBook.title}</h1>
              <p className="book-author">
                {selectedBook.illustrator 
                  ? `isinulat ni ${selectedBook.author}, inilarawan ni ${selectedBook.illustrator}`
                  : `ni ${selectedBook.author}`
                }
              </p>
              <button className="read-button" onClick={handleDownloadPDF}>
                Basahin Ngayon
              </button>
            </motion.div>

            <motion.div 
              className="detail-cover"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="book-cover-large-wrapper">
                <img 
                  src={selectedBook.cover} 
                  alt={selectedBook.title}
                  className="book-cover-large"
                />
                <div className="book-spine-large"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookCarousel;
