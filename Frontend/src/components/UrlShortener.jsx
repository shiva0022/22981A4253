import React, { useState, useEffect } from "react";
import "./UrlShortener.css";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [urlHistory, setUrlHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  // Simple URL validation
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Format URL for display (add protocol if missing)
  const formatUrl = (url) => {
    if (!url) return '';
    
    // Add https:// if no protocol is specified
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    
    return url;
  };

  // Simple copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  };

  // Generate mock short code
  const generateMockShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Load URL history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('urlHistory') || '[]');
      setUrlHistory(savedHistory);
    } catch (err) {
      console.error('Error loading history:', err);
      setUrlHistory([]);
    }
  }, []);

  // Save URL history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('urlHistory', JSON.stringify(urlHistory));
    } catch (err) {
      console.error('Error saving history:', err);
    }
  }, [urlHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    const formattedUrl = formatUrl(originalUrl.trim());

    if (!validateUrl(formattedUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Try to call the actual API
      const response = await urlShortenerAPI.shortenUrl(formattedUrl);
      const newShortUrl = response.data.shortUrl;
      setShortUrl(newShortUrl);

      // Add to history
      const newEntry = {
        id: Date.now(),
        original: formattedUrl,
        short: newShortUrl,
        createdAt: new Date().toISOString(),
      };
      setUrlHistory((prev) => [newEntry, ...prev.slice(0, 9)]); // Keep last 10
    } catch (err) {
      // For demo purposes, create a mock short URL when API is not available
      const mockShortCode = generateMockShortCode();
      const mockShortUrl = `https://short.ly/${mockShortCode}`;
      setShortUrl(mockShortUrl);

      const newEntry = {
        id: Date.now(),
        original: formattedUrl,
        short: mockShortUrl,
        createdAt: new Date().toISOString(),
      };
      setUrlHistory((prev) => [newEntry, ...prev.slice(0, 9)]);

      console.log("API call failed, using mock data:", err.message);
    }

    setIsLoading(false);
    setOriginalUrl(""); // Clear input after successful submission
  };

  const handleCopyToClipboard = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearHistory = () => {
    setUrlHistory([]);
    storage.remove("urlHistory");
  };

  return (
    <div className="url-shortener">
      <div className="container">
        <div className="hero-section">
          <h2>Shorten Your URLs Instantly</h2>
          <p>Transform long URLs into short, shareable links in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your URL here (e.g., example.com or https://example.com)"
              className="url-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="shorten-btn"
              disabled={isLoading || !originalUrl.trim()}
            >
              {isLoading ? "Shortening..." : "Shorten"}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>

        {shortUrl && (
          <div className="result-section">
            <h3>Your Shortened URL:</h3>
            <div className="result-container">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="result-input"
              />
              <button
                onClick={() => handleCopyToClipboard(shortUrl)}
                className={`copy-btn ${copied ? "copied" : ""}`}
              >
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <div className="original-url">
              <small>Original: {originalUrl}</small>
            </div>
          </div>
        )}

        {urlHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3>Recent URLs</h3>
              <button onClick={clearHistory} className="clear-btn">
                Clear History
              </button>
            </div>
            <div className="history-list">
              {urlHistory.map((entry) => (
                <div key={entry.id} className="history-item">
                  <div className="history-urls">
                    <div className="history-original">
                      <strong>Original:</strong>
                      <span title={entry.original}>
                        {entry.original.length > 50
                          ? `${entry.original.substring(0, 50)}...`
                          : entry.original}
                      </span>
                    </div>
                    <div className="history-short">
                      <strong>Short:</strong>
                      <a
                        href={entry.short}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.short}
                      </a>
                      <button
                        onClick={() => handleCopyToClipboard(entry.short)}
                        className="mini-copy-btn"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                  <div className="history-date">
                    <small>{new Date(entry.createdAt).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="features-section" id="features">
          <h3>Why Choose Our URL Shortener?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h4>Lightning Fast</h4>
              <p>Generate short URLs in milliseconds</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Secure & Reliable</h4>
              <p>Your data is safe and links are always available</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h4>Track Performance</h4>
              <p>Monitor clicks and engagement (coming soon)</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h4>Custom Links</h4>
              <p>Create memorable, branded short URLs (coming soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
