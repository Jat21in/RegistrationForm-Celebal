import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './summary.css';

function Summary() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return <div>No data submitted. <button onClick={() => navigate('/')}>Go Back</button></div>;
  }

  return (
    <div className="summary-glow-wrapper">
      <div className="summary-container">
        <h2>Submitted Details</h2>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Summary;
