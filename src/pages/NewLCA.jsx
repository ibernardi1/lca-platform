import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productCategories, materials, suppliers } from "../data/mockData";

const STEPS = ["Product Info", "Materials & Supply Chain", "Review"];

export default function NewLCA() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    productName: "",
    category: "",
    unitsPerYear: "",
    material: "",
    supplierIds: [],
    manufacturingCountry: "",
    transportMode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSupplier = (id) => {
    setForm((prev) => ({
      ...prev,
      supplierIds: prev.supplierIds.includes(id)
        ? prev.supplierIds.filter((s) => s !== id)
        : [...prev.supplierIds, id],
    }));
  };

  const inputStyle = {
    width: "100%", padding: "0.65rem 0.9rem",
    border: "1px solid #d0d5dd", borderRadius: "6px",
    fontSize: "0.95rem", boxSizing: "border-box",
    outline: "none", background: "white", color: "#222",
  };

  const labelStyle = {
    display: "block", marginBottom: "0.4rem",
    fontWeight: "500", fontSize: "0.85rem",
    color: "#344054", textAlign: "left",
  };

  const fieldWrap = { marginBottom: "1.2rem", textAlign: "left" };

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

      <div style={{ maxWidth: "620px", margin: "2rem auto", padding: "0 1.5rem 4rem" }}>

        {/* Back */}
        <button onClick={() => navigate("/")} style={{
          background: "none", border: "none", color: "#2d6a4f",
          cursor: "pointer", fontSize: "0.9rem", marginBottom: "1.2rem",
          padding: 0, fontWeight: "600"
        }}>
          ← Back to Dashboard
        </button>

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
          <div style={{ background: "#1b4332", padding: "1.2rem 1.8rem", color: "white" }}>
            <div style={{ fontSize: "0.72rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.2rem" }}>
              Step {step + 1} of {STEPS.length}
            </div>
            <div style={{ fontWeight: "600", fontSize: "1rem" }}>{STEPS[step]}</div>
          </div>

          <div style={{ padding: "1.8rem", textAlign: "left" }}>

            {/* Step 1: Product Info */}
            {step === 0 && (
              <div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Product Name *</label>
                  <input style={inputStyle} type="text" name="productName"
                    placeholder="e.g. Baby Cotton Romper"
                    value={form.productName} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Product Category *</label>
                  <select name="category" value={form.category}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select a category...</option>
                    {productCategories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Estimated Annual Units Produced *</label>
                  <input style={inputStyle} type="number" name="unitsPerYear"
                    placeholder="e.g. 500000"
                    value={form.unitsPerYear} onChange={handleChange} />
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Manufacturing Country *</label>
                  <select name="manufacturingCountry" value={form.manufacturingCountry}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select country...</option>
                    {["Bangladesh", "Vietnam", "China", "India", "Cambodia", "Mexico", "USA", "Turkey"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Materials & Supply Chain */}
            {step === 1 && (
              <div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Primary Material *</label>
                  <select name="material" value={form.material}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select a material...</option>
                    {materials.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Primary Transport Mode *</label>
                  <select name="transportMode" value={form.transportMode}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select transport mode...</option>
                    {["Sea Freight", "Air Freight", "Road Truck", "Rail", "Multimodal (Sea + Truck)"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div style={fieldWrap}>
                  <label style={labelStyle}>Link Existing Suppliers</label>
                  <p style={{ fontSize: "0.8rem", color: "#888", margin: "0 0 0.8rem" }}>
                    Select suppliers already in your network. Data requests will be sent automatically.
                  </p>
                  {suppliers.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => toggleSupplier(s.id)}
                      style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "0.8rem 1rem",
                        borderRadius: "8px", marginBottom: "0.5rem",
                        cursor: "pointer",
                        border: form.supplierIds.includes(s.id) ? "1.5px solid #2d6a4f" : "1.5px solid #eee",
                        background: form.supplierIds.includes(s.id) ? "#f0f7f4" : "white",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "500", fontSize: "0.88rem" }}>{s.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#888" }}>{s.location} · {s.type}</div>
                      </div>
                      <div style={{
                        width: "20px", height: "20px", borderRadius: "50%",
                        border: form.supplierIds.includes(s.id) ? "none" : "2px solid #ddd",
                        background: form.supplierIds.includes(s.id) ? "#2d6a4f" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white", fontSize: "0.75rem", fontWeight: "bold"
                      }}>
                        {form.supplierIds.includes(s.id) ? "✓" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 2 && (
              <div>
                <div style={{
                  background: "#f8faf8", borderRadius: "8px",
                  padding: "1.2rem", marginBottom: "1.5rem",
                  border: "1px solid #e8e8e8"
                }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.8rem" }}>
                    LCA Summary
                  </div>
                  {[
                    { label: "Product Name", value: form.productName },
                    { label: "Category", value: form.category },
                    { label: "Annual Units", value: form.unitsPerYear ? parseInt(form.unitsPerYear).toLocaleString() : "—" },
                    { label: "Manufacturing Country", value: form.manufacturingCountry },
                    { label: "Primary Material", value: form.material },
                    { label: "Transport Mode", value: form.transportMode },
                    { label: "Linked Suppliers", value: form.supplierIds.length > 0 ? `${form.supplierIds.length} selected` : "None" },
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

                <div style={{
                  background: "#fff8e1", border: "1px solid #f0d080",
                  borderRadius: "8px", padding: "1rem",
                  fontSize: "0.83rem", color: "#7a5c00", lineHeight: "1.6"
                }}>
                  Data requests will be automatically sent to your selected suppliers.
                  AI gap-filling will estimate any missing values using industry averages
                  for <strong>{form.material || "the selected material"}</strong> in <strong>{form.manufacturingCountry || "the selected country"}</strong>.
                </div>
              </div>
            )}

            {/* Navigation */}
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
                <button onClick={() => navigate("/")} style={{
                  padding: "0.6rem 1.5rem", background: "#1b4332",
                  color: "white", border: "none", borderRadius: "6px",
                  cursor: "pointer", fontWeight: "600", fontSize: "0.9rem"
                }}>
                  Submit & Start LCA →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}