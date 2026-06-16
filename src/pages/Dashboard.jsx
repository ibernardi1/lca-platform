import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { existingLCAs, suppliers } from "../data/mockData";

const statusColor = {
  Complete: { bg: "#d8f3dc", text: "#2d6a4f" },
  "In Progress": { bg: "#fff3cd", text: "#856404" },
};

const supplierStatusColor = {
  submitted: { bg: "#d8f3dc", text: "#2d6a4f" },
  overdue: { bg: "#ffe5e5", text: "#e63946" },
  pending: { bg: "#fff3cd", text: "#856404" },
};

function formatUnits(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n;
}

function formatTotalFootprint(emissions, units) {
  const total = (emissions * units) / 1000;
  if (total >= 1000) return (total / 1000).toFixed(1) + "K tonnes CO₂e";
  return total.toFixed(0) + " tonnes CO₂e";
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("catalogue");
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f4f6f4" }}>

      {/* Top Nav */}
      <div style={{
        background: "#1b4332", color: "white",
        padding: "1rem 2.5rem", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div>
            <div style={{ fontWeight: "700", fontSize: "1.1rem", letterSpacing: "0.3px" }}>EcoTrace</div>
            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Life Cycle Assessment Platform</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ opacity: 0.8, fontSize: "0.9rem" }}>Carter's Inc.</span>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: "#2d6a4f", display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem"
          }}>S</div>
        </div>
      </div>

      {/* Summary Bar */}
      <div style={{
        background: "white", padding: "1.2rem 2.5rem",
        display: "flex", gap: "2.5rem",
        borderBottom: "1px solid #e0e0e0"
      }}>
        {[
          { label: "Total LCAs", value: existingLCAs.length },
          { label: "Complete", value: existingLCAs.filter(l => l.status === "Complete").length },
          { label: "In Progress", value: existingLCAs.filter(l => l.status === "In Progress").length },
          { label: "Avg Emissions", value: (existingLCAs.reduce((a, b) => a + b.totalEmissions, 0) / existingLCAs.length).toFixed(1) + " kg CO₂e" },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1b4332" }}>{stat.value}</div>
            <div style={{ fontSize: "0.78rem", color: "#888", marginTop: "2px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ padding: "2rem 2.5rem" }}>

        {/* Tab Bar */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.8rem" }}>
          {["catalogue", "suppliers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.55rem 1.3rem",
                border: activeTab === tab ? "none" : "1px solid #ddd",
                background: activeTab === tab ? "#1b4332" : "white",
                color: activeTab === tab ? "white" : "#555",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: activeTab === tab ? "600" : "normal",
                fontSize: "0.95rem",
              }}
            >
              {tab === "catalogue" ? "LCA Catalogue" : "Supplier Requests"}
            </button>
          ))}
        </div>

        {/* Catalogue Tab */}
        {activeTab === "catalogue" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "#1b4332", fontSize: "1.2rem" }}>Product Assessments</h2>
              <button
                onClick={() => navigate("/new")}
                style={{
                  padding: "0.6rem 1.3rem",
                  background: "#2d6a4f", color: "white",
                  border: "none", borderRadius: "6px",
                  cursor: "pointer", fontWeight: "600", fontSize: "0.95rem"
                }}
              >
                + New LCA
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem" }}>
              {existingLCAs.map((lca) => (
                <div
                  key={lca.id}
                  onClick={() => navigate(`/lca/${lca.id}`)}
                  style={{
                    background: "white", borderRadius: "12px",
                    padding: "1.3rem", cursor: "pointer",
                    border: "1px solid #e8e8e8",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"}
                >
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                    <div>
                      <h3 style={{ margin: "0 0 0.2rem", fontSize: "1rem", color: "#1a1a1a" }}>{lca.productName}</h3>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "#999" }}>{lca.category} · {lca.material}</p>
                    </div>
                    <span style={{
                      padding: "0.25rem 0.7rem", borderRadius: "20px",
                      fontSize: "0.72rem", fontWeight: "600", textTransform: "capitalize", whiteSpace: "nowrap",
                      background: statusColor[lca.status]?.bg,
                      color: statusColor[lca.status]?.text,
                    }}>
                      {lca.status}
                    </span>
                  </div>

                  {/* Emissions Block */}
                  <div style={{
                    background: "#f8faf8", borderRadius: "8px",
                    padding: "0.8rem", marginBottom: "0.8rem"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", marginBottom: "0.3rem" }}>
                      <span style={{ color: "#666" }}>Per unit</span>
                      <strong style={{ color: "#1b4332" }}>{lca.totalEmissions} kg CO₂e</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", marginBottom: "0.3rem" }}>
                      <span style={{ color: "#666" }}>Annual units</span>
                      <strong style={{ color: "#1b4332" }}>{formatUnits(lca.unitsPerYear)}</strong>
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      fontSize: "0.83rem", paddingTop: "0.4rem",
                      borderTop: "1px solid #e8e8e8", marginTop: "0.3rem"
                    }}>
                      <span style={{ color: "#666" }}>Total footprint</span>
                      <strong style={{ color: "#e63946" }}>{formatTotalFootprint(lca.totalEmissions, lca.unitsPerYear)}</strong>
                    </div>
                  </div>

                  {/* Top Emission Source */}
                  <div style={{ fontSize: "0.82rem", color: "#555" }}>
                    <span style={{ color: "#999" }}>Top Emission Source: </span>
                    <strong style={{ color: "#e63946" }}>{lca.hotspot}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supplier Requests Tab */}
        {activeTab === "suppliers" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "#1b4332", fontSize: "1.2rem" }}>Supplier Data Requests</h2>
              <span style={{ fontSize: "0.85rem", color: "#888" }}>
                Share <strong>yoursite.vercel.app/supplier-form</strong> with suppliers
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.2rem" }}>
              {suppliers.map((s) => (
                <div key={s.id} style={{
                  background: "white", borderRadius: "12px",
                  padding: "1.3rem", border: "1px solid #e8e8e8",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>{s.name}</h3>
                    <span style={{
                      padding: "0.25rem 0.7rem", borderRadius: "20px",
                      fontSize: "0.72rem", fontWeight: "600",
                      textTransform: "capitalize",
                      background: supplierStatusColor[s.status]?.bg,
                      color: supplierStatusColor[s.status]?.text,
                    }}>
                      {s.status}
                    </span>
                  </div>

                  <p style={{ margin: "0 0 0.8rem", fontSize: "0.83rem", color: "#888" }}>
                    {s.location} · {s.type}
                  </p>

                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    <span style={{ fontWeight: "600", color: "#444", display: "block", marginBottom: "0.4rem" }}>
                      Fields Requested:
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {s.dataNeeded.split(", ").map((field) => (
                        <span key={field} style={{
                          background: "#f0f4f0", color: "#2d6a4f",
                          padding: "0.2rem 0.6rem", borderRadius: "20px",
                          fontSize: "0.75rem", fontWeight: "500"
                        }}>
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}