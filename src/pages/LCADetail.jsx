import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { existingLCAs } from "../data/mockData";

function formatTotalFootprint(emissions, units) {
  const total = (emissions * units) / 1000;
  if (total >= 1000) return (total / 1000).toFixed(1) + "K tonnes CO₂e";
  return total.toFixed(0) + " tonnes CO₂e";
}

function formatUnits(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n;
}

const feasibilityColor = {
  High: { bg: "#d8f3dc", text: "#2d6a4f" },
  Medium: { bg: "#fff3cd", text: "#856404" },
  Low: { bg: "#ffe5e5", text: "#e63946" },
};

export default function LCADetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lca = existingLCAs.find((l) => l.id === parseInt(id));
  const [selected, setSelected] = useState([]);

  if (!lca) return <div style={{ padding: "2rem" }}>Product not found.</div>;

  const toggleRec = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectedRecs = lca.recommendations.filter((_, i) => selected.includes(i));
  const totalReduction = selectedRecs.reduce((acc, r) => {
    return acc + parseFloat(r.emissionsReduction.replace("%", ""));
  }, 0);
  const newEmissions = lca.totalEmissions * (1 - totalReduction / 100);
  const newFootprint = formatTotalFootprint(newEmissions, lca.unitsPerYear);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f4f6f4" }}>

      {/* Nav */}
      <div style={{
        background: "#1b4332", color: "white",
        padding: "1rem 2.5rem", display: "flex",
        justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>EcoTrace</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Life Cycle Assessment Platform</div>
        </div>
        <span style={{ opacity: 0.8, fontSize: "0.9rem" }}>Carter's Inc.</span>
      </div>

      <div style={{ padding: "2rem 2.5rem", maxWidth: "1000px", margin: "0 auto" }}>

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none", color: "#2d6a4f",
            cursor: "pointer", fontSize: "0.9rem", marginBottom: "1.2rem",
            padding: 0, fontWeight: "600"
          }}
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div style={{
          background: "white", borderRadius: "12px",
          padding: "1.5rem", marginBottom: "1.5rem",
          border: "1px solid #e8e8e8", boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={{ margin: "0 0 0.3rem", fontSize: "1.4rem", color: "#1b4332" }}>{lca.productName}</h1>
              <p style={{ margin: 0, color: "#888", fontSize: "0.9rem" }}>{lca.category} · {lca.material}</p>
            </div>
            <span style={{
              padding: "0.3rem 0.9rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "600",
              background: lca.status === "Complete" ? "#d8f3dc" : "#fff3cd",
              color: lca.status === "Complete" ? "#2d6a4f" : "#856404",
            }}>
              {lca.status}
            </span>
          </div>

          {/* Stats Row */}
          <div style={{
            display: "flex", gap: "2rem", marginTop: "1.2rem",
            paddingTop: "1.2rem", borderTop: "1px solid #f0f0f0"
          }}>
            {[
              { label: "Per Unit Emissions", value: lca.totalEmissions + " kg CO₂e" },
              { label: "Annual Units", value: formatUnits(lca.unitsPerYear) },
              { label: "Total Annual Footprint", value: formatTotalFootprint(lca.totalEmissions, lca.unitsPerYear), highlight: true },
              { label: "Top Emission Source", value: lca.hotspot, red: true },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontSize: "1.1rem", fontWeight: "700",
                  color: s.red ? "#e63946" : s.highlight ? "#1b4332" : "#222"
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Emissions Breakdown */}
        <div style={{
          background: "white", borderRadius: "12px",
          padding: "1.5rem", marginBottom: "1.5rem",
          border: "1px solid #e8e8e8", boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
        }}>
          <h2 style={{ margin: "0 0 1.2rem", fontSize: "1rem", color: "#1b4332" }}>Emissions Breakdown by Lifecycle Stage</h2>
          {lca.emissionsBreakdown.map((stage) => (
            <div key={stage.stage} style={{ marginBottom: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                <span style={{ color: "#444" }}>{stage.stage}</span>
                <strong style={{ color: stage.percent === Math.max(...lca.emissionsBreakdown.map(s => s.percent)) ? "#e63946" : "#1b4332" }}>
                  {stage.percent}%
                </strong>
              </div>
              <div style={{ background: "#f0f0f0", borderRadius: "99px", height: "8px" }}>
                <div style={{
                  width: `${stage.percent}%`, height: "8px", borderRadius: "99px",
                  background: stage.percent === Math.max(...lca.emissionsBreakdown.map(s => s.percent)) ? "#e63946" : "#2d6a4f",
                  transition: "width 0.4s ease"
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div style={{
          background: "white", borderRadius: "12px",
          padding: "1.5rem", border: "1px solid #e8e8e8",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
        }}>
          <h2 style={{ margin: "0 0 0.4rem", fontSize: "1rem", color: "#1b4332" }}>
            Recommendations & Cost Tradeoffs
          </h2>
          <p style={{ margin: "0 0 1.2rem", fontSize: "0.83rem", color: "#888" }}>
            Select scenarios to model their combined impact
          </p>

          {/* Table Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 40px",
            gap: "0.5rem", padding: "0.5rem 0.8rem",
            background: "#f8faf8", borderRadius: "8px",
            fontSize: "0.75rem", fontWeight: "600", color: "#888",
            marginBottom: "0.5rem"
          }}>
            <span>Action</span>
            <span>Emissions Reduction</span>
            <span>Cost Impact</span>
            <span>Feasibility</span>
            <span></span>
          </div>

          {lca.recommendations.map((rec, i) => (
            <div
              key={i}
              onClick={() => toggleRec(i)}
              style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 40px",
                gap: "0.5rem", padding: "0.8rem",
                borderRadius: "8px", marginBottom: "0.4rem",
                cursor: "pointer",
                background: selected.includes(i) ? "#f0f7f4" : "white",
                border: selected.includes(i) ? "1.5px solid #2d6a4f" : "1.5px solid #f0f0f0",
                transition: "all 0.15s"
              }}
            >
              <span style={{ fontSize: "0.88rem", fontWeight: "500", color: "#222", alignSelf: "center" }}>{rec.action}</span>
              <span style={{ fontSize: "0.88rem", color: "#2d6a4f", fontWeight: "700", alignSelf: "center" }}>{rec.emissionsReduction}</span>
              <span style={{ fontSize: "0.88rem", color: "#555", alignSelf: "center" }}>{rec.costImpact}</span>
              <span style={{ alignSelf: "center" }}>
                <span style={{
                  padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600",
                  background: feasibilityColor[rec.feasibility]?.bg,
                  color: feasibilityColor[rec.feasibility]?.text,
                }}>
                  {rec.feasibility}
                </span>
              </span>
              <span style={{ alignSelf: "center", textAlign: "center", fontSize: "1rem" }}>
                {selected.includes(i) ? "✓" : "+"}
              </span>
            </div>
          ))}

          {/* Scenario Result */}
          {selected.length > 0 && (
            <div style={{
              marginTop: "1.2rem", padding: "1rem 1.2rem",
              background: "#1b4332", color: "white", borderRadius: "10px"
            }}>
              <div style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "0.5rem" }}>
                Modeled Scenario ({selected.length} change{selected.length > 1 ? "s" : ""} selected)
              </div>
              <div style={{ display: "flex", gap: "3rem" }}>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: "700" }}>{totalReduction.toFixed(0)}%</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.75 }}>Emissions Reduction</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: "700" }}>{newEmissions.toFixed(1)} kg CO₂e</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.75 }}>New Per Unit Emissions</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: "700" }}>{newFootprint}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.75 }}>New Total Annual Footprint</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}