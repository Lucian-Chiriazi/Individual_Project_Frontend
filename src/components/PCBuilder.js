import React, { useState } from "react";
import "../App.css";

export default function PCBuilder() {
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [peripherals, setPeripherals] = useState({
    keyboard: false,
    mouse: false,
    monitor: false,
  });
  const [includeOS, setIncludeOS] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePeripheralChange = (e) => {
    setPeripherals({
      ...peripherals,
      [e.target.name]: e.target.checked,
    });
  };

  async function fetchRecommendations() {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: parseFloat(budget),
          purpose,
          includeOS: includeOS,
          peripherals: Object.keys(peripherals).filter((key) => peripherals[key]),
        }),
      });

      const data = await response.json();
      setRecommendation(data.recommendation || "No recommendations found.");
    } catch (error) {
      setRecommendation("Error fetching recommendation.");
    }
    setLoading(false);
  }

  return (
    <div className="builder-container">
      <label>Budget (£)</label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="e.g., 1500"
      />

      <label>Purpose</label>
      <input
        type="text"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        placeholder="e.g. gaming, editing"
      />

      <div className="checkbox-group">
        <label>Include Peripherals:</label>
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

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={includeOS}
            onChange={(e) => setIncludeOS(e.target.checked)}
          />
          Include Operating System
        </label>
      </div>

      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendation"}
      </button>

      {recommendation && (
        <div className="recommendation-box pretty-box">
          <h3>💡 AI-Recommended Build 💡</h3>
          <pre>{recommendation}</pre>
        </div>
      )}
    </div>
  );
}
