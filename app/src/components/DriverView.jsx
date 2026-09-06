import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const translations = {
    en: {
        title: "NetraX Logistics Driver Hub",
        back: "Back to Dashboard",
        origin: "Origin Hub",
        dest: "Destination Hub",
        select: "Start Typing or Select...",
        active: "Active Route Dispatch",
        to: "to",
        landslide: "🏔️ LANDSLIDE AI",
        flood: "🌊 FLOOD AI",
        warningTitle: "⚠️ Extreme Mountain Weather Advisory",
        warningText: "Weather conditions in the Northeast Himalayas can shift drastically within minutes. Always remain on high alert for incoming fog, sudden rain flashes, or landslides along your assigned active terrain route, regardless of forecast clarity.",
        expectedWeather: "🌦️ Expected Weather Changes En-route",
        standardETA: "Standard Route ETA",
        blocked: "Currently blocked by hazards",
        safeDetour: "Safe Alternative Detour",
        optimal: "AI Optimal Status",
        mins: "mins",
        routeBtnRoute: "▶ ROUTE TO DESTINATION",
        hazardBlockTitle: "⚠️ High-Risk Disruptions Identified",
        hazardClearTitle: "✅ No Critical Hazards",
        hazardClearText: "Route clearance granted. Weather and traffic metrics are well within safe thresholds.",
        scanning: "Scanning satellite data for route anomalies...",
        prompt: "Select an Origin and Destination above to assess hazards and calculate route variants."
    },
    hi: {
        title: "नेत्राएक्स लॉजिस्टिक्स ड्राइवर हब",
        back: "डैशबोर्ड पर वापस जाएं",
        origin: "आरंभिक स्थान (Origin)",
        dest: "गंतव्य स्थान (Destination)",
        select: "तलाश करें या चुनें...",
        active: "सक्रिय मार्ग विवरण",
        to: "से",
        landslide: "🏔️ भूस्खलन एआई",
        flood: "🌊 बाढ़ एआई",
        warningTitle: "⚠️ अत्यंत पर्वतीय मौसम चेतावनी",
        warningText: "पूर्वोत्तर हिमालय में मौसम मिनटों में बदल सकता है। हमेशा कोहरे, अचानक बारिश, या भूस्खलन के प्रति सतर्क रहें।",
        expectedWeather: "🌦️ रास्ते में अपेक्षित मौसम परिवर्तन",
        standardETA: "सामान्य मार्ग समय (ETA)",
        blocked: "वर्तमान में खतरों से अवरुद्ध",
        safeDetour: "सुरक्षित वैकल्पिक मार्ग",
        optimal: "एआई इष्टतम स्थिति",
        mins: "मिनट",
        routeBtnRoute: "▶ नेविगेशन प्रारंभ करें",
        hazardBlockTitle: "⚠️ उच्च जोखिम वाले खतरे पहचाने गए",
        hazardClearTitle: "✅ कोई महत्वपूर्ण खतरा नहीं",
        hazardClearText: "मार्ग स्पष्ट है। मौसम और यातायात सुरक्षित सीमा के भीतर हैं।",
        scanning: "मार्ग विसंगतियों के लिए उपग्रह डेटा स्कैन किया जा रहा है...",
        prompt: "खतरों का आकलन करने और मार्ग गणना के लिए ऊपर एक आरंभ और गंतव्य चुनें।"
    },
    bn: {
        title: "নেত্রাএক্স লজিস্টিকস ড্রাইভার হাব",
        back: "ড্যাশবোর্ডে ফিরে যান",
        origin: "শুরুর স্থান (Origin)",
        dest: "গন্তব্য স্থান (Destination)",
        select: "লিখুন বা নির্বাচন করুন...",
        active: "বর্তমান রুটের বিবরণ",
        to: "থেকে",
        landslide: "🏔️ ভূমিধস এআই",
        flood: "🌊 বন্যা এআই",
        warningTitle: "⚠️ চরম পাহাড়ি আবহাওয়া সতর্কতা",
        warningText: "উত্তর-পূর্ব হিমালয়ের আবহাওয়া কয়েক মিনিটের মধ্যে পরিবর্তিত হতে পারে। কুয়াশা, হঠাৎ বৃষ্টি বা ভূমিধসের জন্য সর্বদা সতর্ক থাকুন।",
        expectedWeather: "🌦️ পথে প্রত্যাশিত আবহাওয়ার পরিবর্তন",
        standardETA: "সাধারণ পথের সময় (ETA)",
        blocked: "বর্তমানে বিপদের কারণে অবরুদ্ধ",
        safeDetour: "নিরাপদ বিকল্প পথ",
        optimal: "এআই সর্বোত্তম অবস্থা",
        mins: "মিনিট",
        routeBtnRoute: "▶ শুরু করুন নেভিগেশন",
        hazardBlockTitle: "⚠️ উচ্চ-ঝুঁকিপূর্ণ বাধা চিহ্নিত",
        hazardClearTitle: "✅ কোনো গুরুতর বিপদ নেই",
        hazardClearText: "যাওয়ার রাস্তা নিরাপদ। আবহাওয়া এবং ট্রাফিক নিরাপদ সীমার মধ্যে আছে।",
        scanning: "রুটের সমস্যার জন্য স্যাটেলাইট ডেটা স্ক্যান করা হচ্ছে...",
        prompt: "বিপদ মূল্যায়ন এবং রুট গণনার জন্য উপরে শুরুর এবং গন্তব্য স্থান নির্বাচন করুন।"
    },
    as: {
        title: "নেত্ৰাএক্স লজিষ্টিকচ্ ড্ৰাইভাৰ হাব",
        back: "ডেচবৰ্ডলৈ উভতি যাওক",
        origin: "আৰম্ভণি স্থান (Origin)",
        dest: "গন্তব্য স্থান (Destination)",
        select: "টাইপ কৰক বা বাছনি কৰক...",
        active: "বৰ্তমান পথৰ বিৱৰণ",
        to: "ৰ পৰা",
        landslide: "🏔️ ভূমিস্খলন এআই",
        flood: "🌊 বানপানী এআই",
        warningTitle: "⚠️ চৰম পাহাৰীয়া বতৰৰ সতৰ্কবাণী",
        warningText: "উত্তৰ-পূৱ হিমালয়ত বতৰ মুহূৰ্তৰ ভিতৰতে সলনি হ'ব পাৰে। কুঁৱলী, হঠাতে অহা বৰষুণ বা ভূমিস্খলনৰ প্ৰতি সদায় সতৰ্ক থাকক।",
        expectedWeather: "🌦️ পথত হ’ব পৰা বতৰৰ পৰিৱৰ্তন",
        standardETA: "সাধাৰণ পথৰ সময় (ETA)",
        blocked: "বৰ্তমান বিপদৰ বাবে অৱৰুদ্ধ",
        safeDetour: "নিৰাপদ বিকল্প পথ",
        optimal: "এআই সৰ্বোত্তম অৱস্থা",
        mins: "মিনিট",
        routeBtnRoute: "▶ যাত্ৰা আৰম্ভ কৰক",
        hazardBlockTitle: "⚠️ উচ্চ-বিপদৰ বাধা চিনাক্ত কৰা হৈছে",
        hazardClearTitle: "✅ কোনো ডাঙৰ বিপদ নাই",
        hazardClearText: "যোৱাৰ পথ নিৰাপদ। বতৰ আৰু ট্ৰাফিক নিৰাপদ সীমাৰ ভিতৰত আছে।",
        scanning: "পথৰ বিসংগতি চাবলৈ উপগ্ৰহৰ তথ্য পৰীক্ষা কৰা হৈছে...",
        prompt: "বিপদ নিৰ্ধাৰণ কৰিবলৈ আৰু পথৰ হিচাপ কৰিবলৈ ওপৰত আৰম্ভণি আৰু গন্তব্যস্থান বাছনি কৰক।"
    }
};

export default function DriverView({ lang, setLang }) {
    const t = translations[lang] || translations.en;

    const [locations, setLocations] = useState([]);
    const [originId, setOriginId] = useState("");
    const [destId, setDestId] = useState("");
    const [routeInfo, setRouteInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8085/api/driver/locations`)
            .then(r => r.json())
            .then(data => setLocations(data.locations))
            .catch(e => console.error(e));
    }, []);

    useEffect(() => {
        if (!originId || !destId) {
            setRouteInfo(null);
            setErrorMsg("");
            return;
        }
        if (originId === destId) {
            setErrorMsg("Origin and Destination cannot be the same.");
            setRouteInfo(null);
            return;
        }

        setErrorMsg("");
        setLoading(true);
        fetch(`http://localhost:8085/api/driver/route_preview?origin_id=${originId}&dest_id=${destId}`)
            .then(r => r.json())
            .then(data => {
                if (data.error) {
                    setErrorMsg(data.error);
                    setRouteInfo(null);
                } else {
                    setRouteInfo(data);
                }
                setLoading(false);
            })
            .catch(e => {
                console.error("Error fetching preview:", e);
                setLoading(false);
            });
    }, [originId, destId]);

    return (
        <div className="driver-page" style={{ padding: "2rem", minHeight: "100vh", background: "var(--bg-dark)", color: "var(--text-primary)" }}>

            {/* LANGUAGE SELECTOR BAR */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                <span style={{ fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase", fontSize: "1.2rem", marginRight: "0.5rem" }}>Languages:</span>
                <button onClick={() => setLang("en")} style={{ padding: "0.8rem 1.5rem", borderRadius: "50px", border: "2px solid", borderColor: lang === "en" ? "var(--cyan)" : "#cbd5e1", background: lang === "en" ? "var(--cyan)" : "#fff", color: lang === "en" ? "#fff" : "var(--text-primary)", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}>A / English</button>
                <button onClick={() => setLang("hi")} style={{ padding: "0.8rem 1.5rem", borderRadius: "50px", border: "2px solid", borderColor: lang === "hi" ? "var(--cyan)" : "#cbd5e1", background: lang === "hi" ? "var(--cyan)" : "#fff", color: lang === "hi" ? "#fff" : "var(--text-primary)", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}>अ / Hindi</button>
                <button onClick={() => setLang("bn")} style={{ padding: "0.8rem 1.5rem", borderRadius: "50px", border: "2px solid", borderColor: lang === "bn" ? "var(--cyan)" : "#cbd5e1", background: lang === "bn" ? "var(--cyan)" : "#fff", color: lang === "bn" ? "#fff" : "var(--text-primary)", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}>অ / Bengali</button>
                <button onClick={() => setLang("as")} style={{ padding: "0.8rem 1.5rem", borderRadius: "50px", border: "2px solid", borderColor: lang === "as" ? "var(--cyan)" : "#cbd5e1", background: lang === "as" ? "var(--cyan)" : "#fff", color: lang === "as" ? "#fff" : "var(--text-primary)", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}>অ / Assamese</button>
            </div>

            <div className="driver-header" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "1.5rem 2rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>🚚</span> {t.title}
                </h2>
                <Link to="/" style={{ padding: "0.5rem 1rem", fontSize: "1rem", color: "var(--text-secondary)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: "50px", background: "#f8fafc" }}>
                    {t.back}
                </Link>
            </div>

            <div className="destination-selector" style={{ marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1.5rem", alignItems: "center", background: "#fff", padding: "1.5rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontSize: "2.5rem", color: "var(--text-muted)", fontWeight: "800", textTransform: "uppercase" }}>{t.origin}</label>
                    <select
                        value={originId}
                        onChange={(e) => setOriginId(e.target.value)}
                        style={{ width: "100%", padding: "1.2rem", fontSize: "2.2rem", borderRadius: "12px", border: "2px solid #cbd5e1", background: "#f8fafc", color: "var(--text-primary)", cursor: "pointer", outline: "none", transition: "border-color 0.2s" }}
                    >
                        <option value="">{t.select}</option>
                        {locations.map(d => <option key={`orig-${d.id}`} value={d.id}>{d.name}</option>)}
                    </select>
                </div>

                <div style={{ color: "var(--blue)", fontSize: "1.5rem" }}>➔</div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontSize: "2.5rem", color: "var(--text-muted)", fontWeight: "800", textTransform: "uppercase" }}>{t.dest}</label>
                    <select
                        value={destId}
                        onChange={(e) => setDestId(e.target.value)}
                        style={{ width: "100%", padding: "1.2rem", fontSize: "2.2rem", borderRadius: "12px", border: "2px solid #cbd5e1", background: "#f8fafc", color: "var(--text-primary)", cursor: "pointer", outline: "none", transition: "border-color 0.2s" }}
                    >
                        <option value="">{t.select}</option>
                        {locations.map(d => <option key={`dest-${d.id}`} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
            </div>

            {errorMsg && (
                <div style={{ padding: "1rem", color: "#b91c1c", background: "#fef2f2", borderRadius: "8px", textAlign: "center", marginBottom: "2rem", fontSize: "1.5rem" }}>
                    {errorMsg}
                </div>
            )}

            {loading && (
                <div style={{ textAlign: "center", padding: "3rem" }}>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.5rem" }}>{t.scanning}</p>
                </div>
            )}

            {routeInfo && !loading ? (
                <div className="driver-card" style={{ background: "#ffffff", padding: "2rem", borderRadius: "20px", border: "1px solid var(--border)", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1.5rem" }}>
                        <div>
                            <p style={{ fontSize: "1rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "700" }}>{t.active}</p>
                            <h2 style={{ fontSize: "2.2rem", color: "var(--text-primary)", marginTop: "0.5rem" }}>
                                {routeInfo.origin_name} <br /><span style={{ color: "var(--text-muted)", fontSize: "1.6rem" }}>{t.to}</span> {routeInfo.destination_name}
                            </h2>
                            <div style={{ marginTop: "1.5rem" }}>
                                <a
                                    href={routeInfo.deep_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: "inline-block", padding: "1rem 2rem", textAlign: "center",
                                        background: routeInfo.needs_reroute ? "var(--gradient-1)" : "#22c55e",
                                        border: "none", borderRadius: "12px", color: "#fff",
                                        fontSize: "1.1rem", fontWeight: "700", textDecoration: "none",
                                        boxShadow: routeInfo.needs_reroute ? "0 8px 32px rgba(37, 99, 235, 0.3)" : "0 8px 32px rgba(34, 197, 94, 0.3)",
                                        transition: "transform 0.2s"
                                    }}
                                >
                                    {t.routeBtnRoute}
                                </a>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div style={{ textAlign: "center", background: routeInfo.landslide_risk_percent > 60 ? "#fef2f2" : "#f0fdf4", padding: "0.6rem 1.2rem", borderRadius: "12px", border: `1px solid ${routeInfo.landslide_risk_percent > 60 ? '#fecaca' : '#bbf7d0'}` }}>
                                <p style={{ fontSize: "0.75rem", color: routeInfo.landslide_risk_percent > 60 ? "#ef4444" : "#22c55e", fontWeight: "700" }}>{t.landslide}</p>
                                <span style={{ fontSize: "1.4rem", fontWeight: "800", color: routeInfo.landslide_risk_percent > 60 ? "#b91c1c" : "#166534" }}>{routeInfo.landslide_risk_percent}%</span>
                            </div>
                            <div style={{ textAlign: "center", background: routeInfo.flood_risk_percent > 60 ? "#fef2f2" : "#f0fdf4", padding: "0.6rem 1.2rem", borderRadius: "12px", border: `1px solid ${routeInfo.flood_risk_percent > 60 ? '#fecaca' : '#bbf7d0'}` }}>
                                <p style={{ fontSize: "0.75rem", color: routeInfo.flood_risk_percent > 60 ? "#ef4444" : "#22c55e", fontWeight: "700" }}>{t.flood}</p>
                                <span style={{ fontSize: "1.4rem", fontWeight: "800", color: routeInfo.flood_risk_percent > 60 ? "#b91c1c" : "#166534" }}>{routeInfo.flood_risk_percent}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="hazard-block" style={{ marginBottom: "2rem" }}>
                        {routeInfo.needs_reroute ? (
                            <>
                                <h4 style={{ marginBottom: "1rem", color: "#ef4444", fontWeight: "700", fontSize: "1.3rem" }}>{t.hazardBlockTitle}</h4>
                                {routeInfo.hazards.map((h, i) => (
                                    <div key={i} style={{ padding: "1.2rem", background: "#fef2f2", borderLeft: "4px solid #ef4444", marginBottom: "0.8rem", borderRadius: "8px" }}>
                                        <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#b91c1c" }}>
                                            {h.type} {h.level}
                                        </p>
                                        <p style={{ fontSize: "1.2rem", marginTop: "0.2rem", color: "#7f1d1d" }}>{h.message}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div style={{ padding: "1.2rem", background: "#f0fdf4", borderLeft: "4px solid #22c55e", borderRadius: "8px", marginBottom: "1rem" }}>
                                <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "#166534" }}>
                                    {t.hazardClearTitle}
                                </p>
                                <p style={{ fontSize: "1.2rem", marginTop: "0.2rem", color: "#14532d" }}>{t.hazardClearText}</p>
                            </div>
                        )}
                    </div>

                    <div style={{ padding: "1.2rem 1.5rem", background: "#fffbeb", borderLeft: "4px solid #f59e0b", borderRadius: "12px", marginBottom: "2rem" }}>
                        <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "#b45309", marginBottom: "0.3rem" }}>{t.warningTitle}</p>
                        <p style={{ fontSize: "1.2rem", color: "#92400e", lineHeight: "1.5" }}>{t.warningText}</p>
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <h4 style={{ marginBottom: "1rem", fontSize: "1.2rem", color: "var(--text-secondary)" }}>{t.expectedWeather}</h4>
                        <div className="weather-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                            {routeInfo.enroute_weather && routeInfo.enroute_weather.map((w, idx) => (
                                <div key={idx} style={{ background: "var(--bg-dark)", padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--border)", textAlign: "center" }}>
                                    <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase" }}>{w.point}</p>
                                    <p style={{ fontSize: "1.2rem", margin: "0.3rem 0", color: "var(--text-primary)" }}>{w.location}</p>
                                    <div style={{ fontSize: "2rem", margin: "0.5rem 0" }}>
                                        {w.condition.includes("Rain") ? "🌧️" : w.condition.includes("Thunder") ? "⛈️" : w.condition.includes("Cloud") || w.condition.includes("Overcast") || w.condition.includes("Fog") ? "⛅" : "☀️"}
                                    </div>
                                    <p style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--blue)" }}>{w.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="routing-block" style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
                        <div style={{ flex: 1, padding: "1.5rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                            <p style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>{t.standardETA}</p>
                            <p style={{ fontSize: "2rem", fontWeight: "700", color: "var(--text-primary)" }}>{routeInfo.standard_eta_mins} {t.mins}</p>
                            {routeInfo.needs_reroute && <p style={{ fontSize: "1rem", color: "#ef4444", marginTop: "0.5rem" }}>{t.blocked}</p>}
                        </div>

                        <div style={{ flex: 1, padding: "1.5rem", background: routeInfo.needs_reroute ? "#eff6ff" : "#f8fafc", borderRadius: "12px", border: `1px solid ${routeInfo.needs_reroute ? '#bfdbfe' : '#e2e8f0'}` }}>
                            <p style={{ fontSize: "1rem", color: routeInfo.needs_reroute ? "#3b82f6" : "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>
                                {routeInfo.needs_reroute ? t.safeDetour : t.optimal}
                            </p>
                            <p style={{ fontSize: "2rem", fontWeight: "700", color: routeInfo.needs_reroute ? "#1d4ed8" : "var(--text-primary)" }}>{routeInfo.safest_eta_mins} {t.mins}</p>
                        </div>
                    </div>

                </div>
            ) : (
                !loading && (
                    <div style={{ padding: "4rem", textAlign: "center", borderRadius: "20px", background: "#fff", border: "1px dashed var(--border)" }}>
                        <span style={{ fontSize: "3rem" }}>🗺️</span>
                        <p style={{ fontSize: "1.5rem", color: "var(--text-muted)", marginTop: "1rem", fontWeight: "500" }}>{t.prompt}</p>
                    </div>
                )
            )}

        </div>
    );
}
