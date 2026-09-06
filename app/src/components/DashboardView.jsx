import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const translations = {
    en: {
        navBrand: "Dashboard Center",
        heroTitle1: "Live Threat & ",
        heroTitle2: "Logistics Dashboard",
        heroSub: "Real-time integration with Open-Meteo, Bhuvan satellites, and IoT Cold-Chain",
        buttonLaunch: "🚚 LAUNCH DRIVER NAVIGATION APP",
        telemetry: "🌦️ Live Telemetry",
        temp: "Temp:",
        precip: "Precipitation:",
        humidity: "Humidity:",
        soil: "Soil Moisture:",
        aiRiskTitle: "⚠️ AI Risk Predictions",
        landslideLabel: "Landslide Risk:",
        floodLabel: "Flood Risk:",
        riskLvl: "Risk Level:",
        forecastTitle: "📅 7-Day Extended Weather Forecast",
        activeDeliveriesTitle: "📦 Active Fleet & Deliveries",
        loading: "Loading Live Telemetry...",
        connecting: "Connecting to FastAPI Backend (port 8085)...",
        onTime: "ON TIME",
        delay: "DELAYED",
        eta: "ETA"
    },
    hi: {
        navBrand: "डैशबोर्ड सेंटर",
        heroTitle1: "लाइव खतरा और ",
        heroTitle2: "लॉजिस्टिक्स डैशबोर्ड",
        heroSub: "ओपन-मेटियो, भुवन सैटेलाइट और आईओटी कोल्ड-चेन के साथ वास्तविक समय एकीकरण",
        buttonLaunch: "🚚 ड्राइवर नेविगेशन ऐप लॉन्च करें",
        telemetry: "🌦️ लाइव टेलीमेट्री",
        temp: "तापमान:",
        precip: "वर्षा:",
        humidity: "नमी:",
        soil: "मिट्टी की नमी:",
        aiRiskTitle: "⚠️ एआई जोखिम भविष्यवाणियां",
        landslideLabel: "भूस्खलन का जोखिम:",
        floodLabel: "बाढ़ का जोखिम:",
        riskLvl: "जोखिम स्तर:",
        forecastTitle: "📅 7-दिवसीय मौसम पूर्वानुमान",
        activeDeliveriesTitle: "📦 सक्रिय फ्लीट और डिलीवरी",
        loading: "लाइव टेलीमेट्री लोड हो रही है...",
        connecting: "FastAPI सर्वर से कनेक्ट हो रहा है...",
        onTime: "समय पर",
        delay: "देरी से",
        eta: "ETA"
    },
    bn: {
        navBrand: "ড্যাশবোর্ড সেন্টার",
        heroTitle1: "লাইভ থ্রেট ও ",
        heroTitle2: "লজিস্টিকস ড্যাশবোর্ড",
        heroSub: "Open-Meteo, Bhuvan স্যাটেলাইট এবং IoT কোল্ড-চেইনের সাথে রিয়েল-টাইম ইন্টিগ্রেশন",
        buttonLaunch: "🚚 ড্রাইভার নেভিগেশন অ্যাপ চালু করুন",
        telemetry: "🌦️ লাইভ টেলিমেট্রি",
        temp: "তাপমাত্রা:",
        precip: "বৃষ্টিপাত:",
        humidity: "আর্দ্রতা:",
        soil: "মাটির আর্দ্রতা:",
        aiRiskTitle: "⚠️ এআই ঝুঁকি পূর্বাভাস",
        landslideLabel: "ভূমিধসের ঝুঁকি:",
        floodLabel: "বন্যার ঝুঁকি:",
        riskLvl: "ঝুঁকির পরিমাণ:",
        forecastTitle: "📅 ৭ দিনের আবহাওয়ার পূর্বাভাস",
        activeDeliveriesTitle: "📦 সক্রিয় ফ্লিট এবং ডেলিভারি",
        loading: "লাইভ টেলিমেট্রি লোড হচ্ছে...",
        connecting: "FastAPI সার্ভারের সাথে সংযুক্ত হচ্ছে...",
        onTime: "সঠিক সময়ে",
        delay: "বিলম্বে",
        eta: "ETA"
    },
    as: {
        navBrand: "ডেচবৰ্ড কেন্দ্ৰ",
        heroTitle1: "লাইভ থ্ৰেট আৰু ",
        heroTitle2: "লজিষ্টিকচ্ ডেচবৰ্ড",
        heroSub: "Open-Meteo, Bhuvan উপগ্ৰহ আৰু IoT Cold-Chain ৰ সৈতে ৰিয়েল-টাইম সংহতি",
        buttonLaunch: "🚚 ড্ৰাইভাৰ নেভিগেশ্যন এপত প্ৰৱেশ কৰক",
        telemetry: "🌦️ লাইভ টেলিমেট্ৰি",
        temp: "উত্তাপ:",
        precip: "বৰষুণ:",
        humidity: "আৰ্দ্ৰতা:",
        soil: "মাটিৰ আৰ্দ্ৰতা:",
        aiRiskTitle: "⚠️ এআই বিপদৰ আগজাননী",
        landslideLabel: "ভূমিস্খলনৰ বিপদ:",
        floodLabel: "বানপানীৰ বিপদ:",
        riskLvl: "বিপদৰ মাত্ৰা:",
        forecastTitle: "📅 ৭-দিনীয়া বতৰৰ অগ্ৰাধিকাৰ",
        activeDeliveriesTitle: "📦 সক্ৰিয় ফ্লীট আৰু ডেলিভাৰী",
        loading: "লাইভ টেলিমেট্ৰি লোড হৈ আছে...",
        connecting: "FastAPI চাৰ্ভাৰৰ সৈতে সংযোগ কৰা হৈছে...",
        onTime: "সঠিক সময়ত",
        delay: "পলম",
        eta: "ETA"
    }
};

export default function DashboardView({ lang, setLang }) {
    const [data, setData] = useState(null);
    const t = translations[lang] || translations.en;
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8085";

    useEffect(() => {
        fetch(`${BASE_URL}/api/dashboard`)
            .then((r) => r.json())
            .then(setData)
            .catch((e) => console.error("Error fetching dashboard data:", e));
    }, []);

    return (
        <div className="dashboard-page">
            <nav className="navbar">
                <div className="nav-brand">
                    <span className="logo-icon">◉</span>
                    <span className="logo-text">
                        Netra<span className="logo-highlight">X</span>
                    </span>
                </div>

                {/* Global Language Toggle inside Navbar */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.9rem" }}>Languages:</span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => setLang("en")} style={{ padding: "0.5rem 1rem", borderRadius: "50px", border: "1px solid", borderColor: lang === "en" ? "var(--cyan)" : "#cbd5e1", background: lang === "en" ? "var(--cyan)" : "transparent", color: lang === "en" ? "#fff" : "var(--text-secondary)", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>EN</button>
                        <button onClick={() => setLang("hi")} style={{ padding: "0.5rem 1rem", borderRadius: "50px", border: "1px solid", borderColor: lang === "hi" ? "var(--cyan)" : "#cbd5e1", background: lang === "hi" ? "var(--cyan)" : "transparent", color: lang === "hi" ? "#fff" : "var(--text-secondary)", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>HI</button>
                        <button onClick={() => setLang("bn")} style={{ padding: "0.5rem 1rem", borderRadius: "50px", border: "1px solid", borderColor: lang === "bn" ? "var(--cyan)" : "#cbd5e1", background: lang === "bn" ? "var(--cyan)" : "transparent", color: lang === "bn" ? "#fff" : "var(--text-secondary)", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>BN</button>
                        <button onClick={() => setLang("as")} style={{ padding: "0.5rem 1rem", borderRadius: "50px", border: "1px solid", borderColor: lang === "as" ? "var(--cyan)" : "#cbd5e1", background: lang === "as" ? "var(--cyan)" : "transparent", color: lang === "as" ? "#fff" : "var(--text-secondary)", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>AS</button>
                    </div>
                </div>
            </nav>

            <header className="hero" style={{ minHeight: "60vh", padding: "8rem 2rem 4rem" }}>
                <div className="hero-badge">🏆 NetraX Operations Center</div>
                <h1 className="hero-title">
                    {t.heroTitle1} <span className="text-gradient">{t.heroTitle2}</span>
                </h1>
                <p className="hero-subtitle">
                    {t.heroSub}
                </p>
                <div style={{ marginTop: "2rem" }}>
                    <Link to="/driver" style={{
                        padding: "1rem 2rem", background: "var(--cyan)",
                        color: "#fff", borderRadius: "8px", textDecoration: "none",
                        fontWeight: "700", fontSize: "1.2rem", boxShadow: "0 4px 15px rgba(6, 182, 212, 0.4)"
                    }}>
                        {t.buttonLaunch}
                    </Link>
                </div>
            </header>

            {data ? (
                <section className="dashboard-section" style={{ paddingTop: "2rem" }}>
                    <div className="dashboard-grid">

                        {/* Live Telemetry */}
                        <div className="dash-card">
                            <div className="dash-card-header">
                                <h4>{t.telemetry} — {data.telemetry.region}</h4>
                                <span className="dash-live-badge">● LIVE </span>
                            </div>
                            <div style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
                                <p style={{ fontSize: "1.2rem" }}>{t.temp} <strong style={{ color: "var(--cyan)" }}>{data.telemetry.live_weather.temperature}°C</strong></p>
                                <p>{t.precip} <strong>{data.telemetry.live_weather.precipitation} mm</strong></p>
                                <p>{t.humidity} <strong>{data.telemetry.live_weather.humidity}%</strong></p>
                                <p>{t.soil} <strong>{data.telemetry.live_weather.soil_moisture}</strong></p>
                            </div>
                        </div>

                        {/* AI Predictions */}
                        <div className="dash-card">
                            <div className="dash-card-header">
                                <h4>{t.aiRiskTitle}</h4>
                            </div>
                            <div className="alerts-list">
                                <div className={`alert-item ${data.predictions.landslide.status.toLowerCase()}`}>
                                    <span className="alert-icon">🏔️</span>
                                    <div className="alert-info">
                                        <strong>{t.landslideLabel} {data.predictions.landslide.status}</strong>
                                        <span>{t.riskLvl} {data.predictions.landslide.risk_percent}%</span>
                                        <span>{data.predictions.landslide.msg}</span>
                                    </div>
                                </div>
                                <div className={`alert-item ${data.predictions.flood.status.toLowerCase()}`}>
                                    <span className="alert-icon">🌊</span>
                                    <div className="alert-info">
                                        <strong>{t.floodLabel} {data.predictions.flood.status}</strong>
                                        <span>{t.riskLvl} {data.predictions.flood.risk_percent}%</span>
                                        <span>{data.predictions.flood.msg}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 7-DAY EXTENDED FORECAST */}
                        <div className="dash-card dash-map">
                            <div className="dash-card-header">
                                <h4>{t.forecastTitle}</h4>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
                                {data.forecast_7_day && data.forecast_7_day.map((day, idx) => (
                                    <div key={idx} style={{ padding: "1rem", background: "var(--bg-dark)", border: "1px solid var(--border)", borderRadius: "12px", textAlign: "center" }}>
                                        <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>{day.date}</p>
                                        <p style={{ fontSize: "1.6rem", margin: "0.5rem 0" }}>
                                            {day.condition.includes("Rain") ? "🌧️" : day.condition.includes("Cloud") ? "⛅" : day.condition.includes("Thunder") ? "⛈️" : "☀️"}
                                        </p>
                                        <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--text-primary)" }}>{day.high}° / {day.low}°</p>
                                        <p style={{ fontSize: "0.8rem", color: "var(--blue)", marginTop: "0.3rem" }}>{day.rain_mm} mm</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Deliveries */}
                        <div className="dash-card dash-map">
                            <div className="dash-card-header">
                                <h4>{t.activeDeliveriesTitle}</h4>
                                <span className="dash-live-badge">● TRACKING</span>
                            </div>
                            <div className="delivery-list" style={{ marginTop: "1rem" }}>
                                {data.deliveries.map((del) => (
                                    <div key={del.id} className="delivery-item">
                                        <div className={`delivery-status ${del.status === 'ON TIME' ? 'on-time' : 'delayed'}`}>
                                            {del.status === 'ON TIME' ? t.onTime : t.delay}
                                        </div>
                                        <div className="delivery-info">
                                            <strong>
                                                {del.id} — {del.content}
                                            </strong>
                                            <span>
                                                {del.origin} ➔ {del.destination} | Pos: {del.lat}, {del.lng}
                                            </span>
                                        </div>
                                        <span className="delivery-eta">{t.eta} {del.eta_hours}h</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            ) : (
                <div style={{ textAlign: "center", padding: "4rem" }}>
                    <h2>{t.loading}</h2>
                    <p>{t.connecting}</p>
                </div>
            )}
        </div>
    );
}
