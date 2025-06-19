import './Homepage.css';

function Home() {
  return (
    <div className="homepage">

      {/* Header */}
      <div className="header">
        <div className="header-logo">Trail</div>

        <div className="header-actions">
          <a href="#docs" className="header-link">Docs</a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
              style={{ marginRight: '6px', verticalAlign: 'middle' }}
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 
                       0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94
                       -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53
                       .63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                       .07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95
                       0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1
                       0 0 .67-.21 2.2.82a7.6 7.6 0 012 0c1.53-1.03 2.2-.82
                       2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15
                       0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                       0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0016 8
                       c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>

          <a href="/signup" className="header-link">Sign in</a>
        </div>
      </div>

      {/* Description */}
      <div className="homepage-description">
        <p>
          Trail is an AI Agent that monitors your progressiveness and self development with inbuilt integration to GitHub, LinkedIn, LeetCode, and many more.
        </p>
      </div>

      {/* Get Started Button */}
      <div className="get-started-cylinder">
        <p>Get Started</p>
      </div>

    </div>
  );
}

export default Home;
