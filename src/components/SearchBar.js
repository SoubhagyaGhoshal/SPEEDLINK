import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes, FaWifi, FaTv, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
  width: 100%;
`;

const SearchInput = styled(motion.input)`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#333333'};
  border-radius: 25px;
  background: ${props => props.theme === 'light' ? '#ffffff' : '#1a1a1a'};
  color: ${props => props.theme === 'light' ? '#333333' : '#ffffff'};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #ff6600;
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
    transform: scale(1.02);
  }

  &::placeholder {
    color: ${props => props.theme === 'light' ? '#999999' : '#666666'};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #ff6600;
  font-size: 1rem;
  z-index: 2;
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #999999;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #ff6600;
    background: rgba(255, 102, 0, 0.1);
  }
`;

const SearchResults = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: ${props => props.theme === 'light' ? '#ffffff' : '#1a1a1a'};
  border: 1px solid ${props => props.theme === 'light' ? '#e0e0e0' : '#333333'};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
`;

const SearchResultItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${props => props.theme === 'light' ? '#f0f0f0' : '#2a2a2a'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${props => props.theme === 'light' ? '#f8f9fa' : '#2a2a2a'};
    transform: translateX(4px);
  }
`;

const ResultIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color || '#ff6600'};
  color: white;
  font-size: 0.9rem;
`;

const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ResultTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme === 'light' ? '#333333' : '#ffffff'};
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
`;

const ResultDescription = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme === 'light' ? '#666666' : '#999999'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme === 'light' ? '#666666' : '#999999'};
  font-style: italic;
`;

const SearchBar = ({ theme = 'dark', onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);

  // Search data - you can expand this
  const searchData = [
    {
      id: 'broadband',
      title: 'Broadband Plans',
      description: 'High-speed internet packages',
      icon: <FaWifi />,
      color: '#ff6600',
      link: '/broadband',
      keywords: ['internet', 'wifi', 'broadband', 'plans', 'speed']
    },
    {
      id: 'cable-tv',
      title: 'Cable TV',
      description: 'Digital TV channels and packages',
      icon: <FaTv />,
      color: '#ffb81a',
      link: '/cable-tv',
      keywords: ['tv', 'cable', 'channels', 'entertainment', 'digital']
    },
    {
      id: 'support',
      title: 'Customer Support',
      description: '24/7 help and assistance',
      icon: <FaQuestionCircle />,
      color: '#10b981',
      link: '/support',
      keywords: ['help', 'support', 'customer', 'assistance', 'service']
    },
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Get in touch with our team',
      icon: <FaPhone />,
      color: '#3b82f6',
      link: '/enquire',
      keywords: ['contact', 'phone', 'call', 'enquire', 'reach']
    }
  ];

  const performSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredResults = searchData.filter(item => 
      item.keywords.some(keyword => keyword.includes(query)) ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );

    setResults(filteredResults);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    setShowResults(isFocused && results.length > 0);
  }, [isFocused, results]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const handleResultClick = (result) => {
    if (onSearch) {
      onSearch(result);
    }
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      inputRef.current?.blur();
    }
  };

  return (
    <SearchContainer>
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      
      <SearchInput
        ref={inputRef}
        theme={theme}
        type="text"
        placeholder="Search for plans, support, or services..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={handleKeyDown}
        initial={{ scale: 1 }}
        whileFocus={{ scale: 1.02 }}
      />

      {query && (
        <ClearButton
          onClick={handleClear}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes />
        </ClearButton>
      )}

      <AnimatePresence>
        {showResults && (
          <SearchResults
            theme={theme}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {results.length > 0 ? (
              results.map((result, index) => (
                <SearchResultItem
                  key={result.id}
                  theme={theme}
                  onClick={() => handleResultClick(result)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ResultIcon color={result.color}>
                    {result.icon}
                  </ResultIcon>
                  <ResultContent>
                    <ResultTitle theme={theme}>{result.title}</ResultTitle>
                    <ResultDescription theme={theme}>{result.description}</ResultDescription>
                  </ResultContent>
                </SearchResultItem>
              ))
            ) : (
              <NoResults theme={theme}>
                No results found for "{query}"
              </NoResults>
            )}
          </SearchResults>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
};

export default SearchBar;
