import React, { useState } from "react";
import "../App.css";

// Main component
export default function PCBuilder() {
  // State variables
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [peripherals, setPeripherals] = useState({
    keyboard: false,
    mouse: false,
    monitor: false,
  }); // Peripherals selection checkbox states.
  const [includeOS, setIncludeOS] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to validate budget input
  const isValidBudget = (val) => {
    const parsed = parseFloat(val);
    return val !== "" && !isNaN(parsed) && parsed >= 500 && parsed <= 10000;
  };

  // Function to handle budget input change
  const handlePeripheralChange = (e) => {
    setPeripherals({
      ...peripherals,
      [e.target.name]: e.target.checked,
    });
  };

  // Function to format the recommendation text
  const formatRecommendation = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const items = [];
    let otherLines = [];
  
    for (let line of lines) {
      // Match category (CPU, GPU, etc), name (until the last dash before price), and price
      const match = line.match(
        /^(CPU|GPU|Motherboard|RAM|Storage|PSU|Case)?[:\-]?\s*(.+)\s[-–]\s£?(\d+(?:\.\d+)?)/i
      );
      // Assign extracted values to a component object
      if (match) {
        const category = match[1] || "Component";
        const name = match[2].trim();
        const price = match[3];
  
        items.push({ category, name, price });
      } else {
        otherLines.push(line); // For non-component lines
      }
    }
  
    return { items, otherLines };
  };

  // Function to fetch recommendations from the server
  async function fetchRecommendations() {
    setLoading(true); // Disable button
    try {
      const response = await fetch("https://pc-builder-app-531x.onrender.com/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: parseFloat(budget),
          purpose,
          include_os: includeOS,
          peripherals: Object.keys(peripherals).filter((key) => peripherals[key]),
        }),
      });

      // Parse the response
      const data = await response.json();
      // Update UI with recommendation and description
      setRecommendation(data.recommendation || "No recommendations found.");
      setDescription(data.description || "");
    } catch (error) {
      setRecommendation("Error fetching recommendation.");
    }
    setLoading(false); // End loading state
  }


  // Render the components
  return (
    <div className="builder-container">
      <label>Budget (£)</label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="e.g. 1500"
      />
      {budget !== "" && !isValidBudget(budget) && (
        <div style={{ color: "red", fontSize: "0.9rem", marginBottom: "10px" }}>
          Budget must be between £500 and £10,000.
        </div>
      )}

      <label>Purpose</label>
      <select
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      >
        <option value="">-- Select Purpose --</option>
        <option value="gaming">Gaming</option>
        <option value="editing">Editing</option>
        <option value="general">General</option>
      </select>

      <fieldset className="checkbox-group">
        <legend>Include Peripherals:</legend>
        <div className="checkbox-options">
          <label>
            <input
              type="checkbox"
              name="keyboard"
              checked={peripherals.keyboard}
              onChange={handlePeripheralChange}
            />
            Keyboard
          </label>
          <label>
            <input
              type="checkbox"
              name="mouse"
              checked={peripherals.mouse}
              onChange={handlePeripheralChange}
            />
            Mouse
          </label>
          <label>
            <input
              type="checkbox"
              name="monitor"
              checked={peripherals.monitor}
              onChange={handlePeripheralChange}
            />
            Monitor
          </label>
        </div>
      </fieldset>

      <fieldset className="checkbox-group">
        <legend>Other Options:</legend>
        <div className="checkbox-options">
          <label>
            <input
              type="checkbox"
              checked={includeOS}
              onChange={(e) => setIncludeOS(e.target.checked)}
            />
            Include Operating System
          </label>
        </div>
      </fieldset>

      <button
        onClick={fetchRecommendations}
        disabled={loading || !isValidBudget(budget) || purpose === ""}
      >
        {loading ? "Loading..." : "Get Recommendation"}
      </button>

      {recommendation && (
        <div className="recommendation-box pretty-box">
          <h3>Recommended Build:</h3>
          {formatRecommendation(recommendation).items.map((item, index) => (
            <div key={index} className="component-card">
              <strong>{item.category}:</strong> {item.name}
              <span className="price">£{item.price}</span>
            </div>
          ))}

          <div className="summary-text">
            {formatRecommendation(recommendation).otherLines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>

          {description && (
            <div className="description-text">
              <h4>Build Description:</h4>
              <p>{description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
