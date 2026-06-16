import { useState } from "react";

const STEPS = ["Supplier Info", "Environmental Data", "Confirm & Submit"];

export default function SupplierForm() {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    supplierName: "",
    contactName: "",
    contactTitle: "",
    location: "",
    transportDistance: "",
    transportMode: "",
    energyConsumption: "",
    materialWeight: "",
    waterUsage: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.65rem 0.9rem",
    border: "1px solid #d0d5dd",
    borderRadius: "6px",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    outline: "none",
    background: "white",
    color: "#222",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.4rem",
    fontWeight: "500",
    fontSize: "0.85rem",
    color: "#344054",
  };

  const fieldWrap = { marginBottom: "1.2rem" };

  if (submitted) {
    return (
      <div style={{
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh", background: "#f4f6f4",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          background: "white", borderRadius: "16px",
          padding: "3rem 2.5rem", textAlign: "center",
          maxWidth: "480px", width: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "#d8f3dc", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 1.5rem",
            fontSize: "1.6rem", color: "#2d6a4f", fontWeight: "bold"
          }}>✓</div>
          <h2 style={{ color: "#1b4332", margin: "0 0 0.8rem" }}>Submission Complete</h2>
          <p style={{ color: "#666", margin: "0 0 1.5rem", lineHeight: "1.6", fontSize: "0.92rem" }}>
            Thank you, <strong>{form.contactName}</strong>. Carter's sustainability
            team has received your environmental data for <strong>{form.supplierName}</strong>.
            You will receive a confirmation email shortly.
          </p>
          <div style={{
            background: "#f8faf8", borderRadius: "8px",
            padding: "0.9rem 1rem", fontSize: "0.8rem", color: "#888",
            textAlign: "left", lineHeight: "1.8"
          }}>
            <div><strong>Submitted by:</strong> {form.contactName} ({form.contactTitle})</div>
            <div><strong>Company:</strong> {form.supplierName}</div>
            <div><strong>Date:</strong> {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f0f2f0" }}>

      {/* Top Nav */}
      <div style={{
        background: "#1b4332", color: "white",
        padding: "1rem 2.5rem", display: "flex",
        justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>EcoTrace</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Life Cycle Assessment Platform</div>
        </div>
        <span style={{ opacity: 0.8, fontSize: "0.9rem" }}>Supplier Data Portal</span>
      </div>

      {/* Document Banner */}
      <div style={{
        background: "#fff8e1", borderBottom: "1px solid #f0d080",
        padding: "0.75rem 2.5rem", fontSize: "0.83rem", color: "#7a5c00",
        display: "flex", alignItems: "center", gap: "0.5rem"
      }}>
        <span>📋</span>
        <span>
          <strong>Carter's Inc.</strong> has requested your facility's environmental data
          for use in their Life Cycle Assessment program. Please complete all fields accurately.
        </span>
      </div>

      <div style={{ maxWidth: "620px", margin: "2rem auto", padding: "0 1.5rem 4rem" }}>

        {/* Step Progress */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: i < step ? "#2d6a4f" : i === step ? "#1b4332" : "#ddd",
                  color: i <= step ? "white" : "#999",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.78rem", fontWeight: "700", flexShrink: 0
                }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{
                  fontSize: "0.78rem", fontWeight: i === step ? "600" : "400",
                  color: i === step ? "#1b4332" : i < step ? "#2d6a4f" : "#999",
                  whiteSpace: "nowrap"
                }}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: "2px", margin: "0 0.75rem",
                  background: i < step ? "#2d6a4f" : "#ddd"
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: "white", borderRadius: "12px",
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          overflow: "hidden"
        }}>

          {/* Card Header */}
          <div style={{
            background: "#1b4332", padding: "1.2rem 1.8rem",
            color: "white"
          }}>
            <div style={{ fontSize: "0.72rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.2rem" }}>
              Step {step + 1} of {STEPS.length}
            </div>
            <div style={{ fontWeight: "600", fontSize: "1rem" }}>{STEPS[step]}</div>
          </div>

          <div style={{ padding: "1.8rem" }}>

            {/* Step 1: Supplier Info */}
            {step === 0 && (
              <div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Company / Supplier Name *</label>
                  <input style={inputStyle} type="text" name="supplierName"
                    placeholder="e.g. Delta Cotton Co."
                    value={form.supplierName} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Contact Name *</label>
                  <input style={inputStyle} type="text" name="contactName"
                    placeholder="e.g. Jane Smith"
                    value={form.contactName} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Contact Title / Role *</label>
                  <input style={inputStyle} type="text" name="contactTitle"
                    placeholder="e.g. Sustainability Manager"
                    value={form.contactTitle} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Facility Location *</label>
                  <input style={inputStyle} type="text" name="location"
                    placeholder="City, Country"
                    value={form.location} onChange={handleChange} />
                </div>
              </div>
            )}

            {/* Step 2: Environmental Data */}
            {step === 1 && (
              <div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Primary Transport Mode *</label>
                  <select name="transportMode" value={form.transportMode}
                    onChange={handleChange}
                    style={{ ...inputStyle, background: "white", cursor: "pointer" }}>
                    <option value="">Select transport mode...</option>
                    <option>Sea Freight</option>
                    <option>Air Freight</option>
                    <option>Road Truck</option>
                    <option>Rail</option>
                    <option>Multimodal (Sea + Truck)</option>
                  </select>
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Transport Distance to Carter's Distribution Center (km) *</label>
                  <input style={inputStyle} type="number" name="transportDistance"
                    placeholder="e.g. 12400"
                    value={form.transportDistance} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Annual Energy Consumption (kWh) *</label>
                  <input style={inputStyle} type="number" name="energyConsumption"
                    placeholder="e.g. 850000"
                    value={form.energyConsumption} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Material Weight per Unit (grams) *</label>
                  <input style={inputStyle} type="number" name="materialWeight"
                    placeholder="e.g. 120"
                    value={form.materialWeight} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Water Usage per Unit (liters) *</label>
                  <input style={inputStyle} type="number" name="waterUsage"
                    placeholder="e.g. 2200"
                    value={form.waterUsage} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    rows={3}
                    placeholder="Any additional context about your facility or processes..."
                    style={{ ...inputStyle, resize: "vertical" }} />
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 2 && (
              <div>
                {/* Summary */}
                <div style={{
                  background: "#f8faf8", borderRadius: "8px",
                  padding: "1.2rem", marginBottom: "1.5rem",
                  border: "1px solid #e8e8e8"
                }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.8rem" }}>
                    Submission Summary
                  </div>
                  {[
                    { label: "Company", value: form.supplierName },
                    { label: "Contact", value: `${form.contactName} (${form.contactTitle})` },
                    { label: "Location", value: form.location },
                    { label: "Transport Mode", value: form.transportMode },
                    { label: "Transport Distance", value: form.transportDistance ? `${form.transportDistance} km` : "—" },
                    { label: "Energy Consumption", value: form.energyConsumption ? `${parseInt(form.energyConsumption).toLocaleString()} kWh/yr` : "—" },
                    { label: "Material Weight", value: form.materialWeight ? `${form.materialWeight}g/unit` : "—" },
                    { label: "Water Usage", value: form.waterUsage ? `${form.waterUsage}L/unit` : "—" },
                  ].map((row) => (
                    <div key={row.label} style={{
                      display: "flex", justifyContent: "space-between",
                      fontSize: "0.85rem", padding: "0.35rem 0",
                      borderBottom: "1px solid #f0f0f0"
                    }}>
                      <span style={{ color: "#888" }}>{row.label}</span>
                      <span style={{ color: "#222", fontWeight: "500" }}>{row.value || "—"}</span>
                    </div>
                  ))}
                </div>

                {/* Confirmation Checkboxes */}
                <div style={{ marginBottom: "1.5rem" }}>
                  {[
                    "I confirm that the data provided above is accurate to the best of my knowledge.",
                    "I confirm that I am the person qualified and authorized to submit this environmental data on behalf of my organization.",
                  ].map((text, i) => (
                    <label key={i} style={{
                      display: "flex", gap: "0.75rem", alignItems: "flex-start",
                      marginBottom: "1rem", cursor: "pointer"
                    }}>
                      <input
                        type="checkbox"
                        checked={i === 0 ? confirmed : confirmed}
                        onChange={() => setConfirmed(!confirmed)}
                        style={{ marginTop: "2px", accentColor: "#1b4332", width: "16px", height: "16px", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: "0.85rem", color: "#444", lineHeight: "1.5" }}>{text}</span>
                    </label>
                  ))}
                </div>

                {/* Signature Line */}
                <div style={{
                  borderTop: "2px solid #1b4332", paddingTop: "1rem",
                  display: "flex", justifyContent: "space-between",
                  fontSize: "0.8rem", color: "#888"
                }}>
                  <span>{form.contactName || "Signee"} · {form.supplierName || "Company"}</span>
                  <span>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginTop: "1.8rem", paddingTop: "1.2rem",
              borderTop: "1px solid #f0f0f0"
            }}>
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} style={{
                  padding: "0.6rem 1.3rem", background: "white",
                  border: "1px solid #ddd", borderRadius: "6px",
                  cursor: "pointer", color: "#555", fontSize: "0.9rem"
                }}>
                  Back
                </button>
              ) : <div />}

              {step < 2 ? (
                <button onClick={() => setStep(step + 1)} style={{
                  padding: "0.6rem 1.5rem", background: "#1b4332",
                  color: "white", border: "none", borderRadius: "6px",
                  cursor: "pointer", fontWeight: "600", fontSize: "0.9rem"
                }}>
                  Continue →
                </button>
              ) : (
                <button
                  onClick={() => confirmed && setSubmitted(true)}
                  style={{
                    padding: "0.6rem 1.5rem",
                    background: confirmed ? "#1b4332" : "#ccc",
                    color: "white", border: "none", borderRadius: "6px",
                    cursor: confirmed ? "pointer" : "not-allowed",
                    fontWeight: "600", fontSize: "0.9rem"
                  }}
                >
                  Submit Data
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}