import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: #ef4444;
  margin-bottom: 2rem;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin: 2rem 0;
  padding: 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  font-family: monospace;
  font-size: 0.9rem;
  max-width: 800px;
  width: 100%;
  text-align: left;
`;

const ErrorSummary = styled.summary`
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &.primary {
    background: var(--primary-color);
    color: white;
    
    &:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border-color);
    
    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      transform: translateY(-2px);
    }
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate a unique error ID for tracking
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      errorId
    });

    // Log error to console for development
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In production, you could send this to an error reporting service
    // this.logErrorToService(error, errorInfo, errorId);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, errorId: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, errorId: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorIcon>
            <FaExclamationTriangle />
          </ErrorIcon>
          
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          
          <ErrorMessage>
            We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
            {this.state.errorId && (
              <span> Error ID: <strong>{this.state.errorId}</strong></span>
            )}
          </ErrorMessage>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <ErrorSummary>Error Details (Development Only)</ErrorSummary>
              <div>
                <strong>Error:</strong> {this.state.error.toString()}
                <br /><br />
                <strong>Stack Trace:</strong>
                <pre style={{ whiteSpace: 'pre-wrap', margin: '0.5rem 0' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            </ErrorDetails>
          )}

          <ButtonGroup>
            <ActionButton
              className="primary"
              onClick={this.handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRedo /> Try Again
            </ActionButton>
            
            <ActionButton
              className="secondary"
              onClick={this.handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Go Home
            </ActionButton>
          </ButtonGroup>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
