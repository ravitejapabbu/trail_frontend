import './Explore.css';  // still reusing your homepage styles

function Explore() {
  return (
    <div className="homepage">

      {/* Header */}
      <div className="header">
        <div className="header-logo">Trail</div>

        <div className="header-actions">
          <a href="#aiml" className="header-link">AIML</a>
          <a href="#cloud" className="header-link">Cloud Computing</a>
        </div>
      </div>

      {/* Description */}
      <div className="homepage-description">
        <p>
          Stay updated with the latest breakthroughs in Cloud Computing and Artificial Intelligence.
        </p>
      </div>

      {/* Trending list */}
      <div className="trending-list">
        <h2>🔥 Trending Now</h2>
        <ul>
          <li>OpenAI releases GPT-5 roadmap for enterprise AI assistants</li>
          <li>Google Cloud launches new Vertex AI Agent Builder</li>
          <li>AWS introduces Serverless Data Warehousing with Redshift</li>
          <li>Anthropic’s Claude 4 vision model enters private preview</li>
          <li>GitHub Copilot gains context-aware code generation upgrades</li>
        </ul>
      </div>

    </div>
  );
}

export default Explore;
