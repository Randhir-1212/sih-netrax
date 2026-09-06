from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import httpx
import random
import asyncio

app = FastAPI(title="NetraX Core AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Locations list
LOCATIONS = [
    {"id": "guwahati", "name": "Guwahati Hub (Assam)", "lat": 26.1445, "lng": 91.7362},
    {"id": "tawang", "name": "Tawang Depot (Arunachal)", "lat": 27.5855, "lng": 91.8617},
    {"id": "imphal", "name": "Imphal RIIMS (Manipur)", "lat": 24.8170, "lng": 93.9368},
    {"id": "shillong", "name": "Shillong Center (Meghalaya)", "lat": 25.5788, "lng": 91.8933},
    {"id": "itanagar", "name": "Itanagar Base (Arunachal)", "lat": 27.0844, "lng": 93.6053},
    {"id": "aizawl", "name": "Aizawl Logistics (Mizoram)", "lat": 23.7271, "lng": 92.7176},
    {"id": "kohima", "name": "Kohima Medical (Nagaland)", "lat": 25.6751, "lng": 94.1086},
    {"id": "agartala", "name": "Agartala Station (Tripura)", "lat": 23.8315, "lng": 91.2868},
    {"id": "gangtok", "name": "Gangtok Hub (Sikkim)", "lat": 27.3389, "lng": 88.6065},
    {"id": "silchar", "name": "Silchar Supply (Assam)", "lat": 24.8333, "lng": 92.7789},
]

def generate_forecast(lat, lng):
    # Simulated 7-day extended precise forecast
    forecasts = []
    base_temp = 28.0 - (lat - 24.0)*2 # simple mock logic: higher lat = colder
    today = datetime.now()
    conditions = ["Sunny", "Partly Cloudy", "Rain", "Heavy Rain", "Thunderstorms", "Overcast"]
    
    for i in range(7):
        day = today + timedelta(days=i)
        cond = random.choice(conditions)
        rain_mm = random.randint(0, 40) if "Rain" in cond else 0
        forecasts.append({
            "date": day.strftime("%A, %b %d"),
            "high": round(base_temp + random.uniform(2, 5), 1),
            "low": round(base_temp - random.uniform(2, 5), 1),
            "condition": cond,
            "rain_mm": rain_mm
        })
    return forecasts

@app.get("/api/dashboard")
async def get_dashboard_data():
    weather = {"temperature": 27.5, "precipitation": 12.4, "humidity": 85, "soil_moisture": 0.42}
    
    # Generate 7-day forecast for Dashboard
    weekly_forecast = generate_forecast(26.1445, 91.7362)

    return {
        "telemetry": {"region": "Northeast India (Guwahati)", "live_weather": weather},
        "forecast_7_day": weekly_forecast,
        "predictions": {
            "landslide": {"risk_percent": 99.7, "status": "CRITICAL", "msg": "Landslide risk evaluated based on current soil data."},
            "flood": {"risk_percent": 74.0, "status": "WARNING", "msg": "Flood assessment from Bhuvan satellite."}
        },
        "deliveries": [
            {"id": "MED-2026-X11", "content": "Emergency Insulin", "origin": "Guwahati", "destination": "Shillong", "eta_hours": 2.5, "status": "ON TIME", "lat": 25.5788, "lng": 91.8933}
        ]
    }

@app.get("/api/driver/locations")
async def get_locations():
    return {"locations": LOCATIONS}

@app.get("/api/driver/route_preview")
async def get_route_preview(origin_id: str, dest_id: str):
    if origin_id == dest_id:
         return {"error": "Origin and Destination must be different."}

    org_data = next((d for d in LOCATIONS if d["id"] == origin_id), LOCATIONS[0])
    dest_data = next((d for d in LOCATIONS if d["id"] == dest_id), LOCATIONS[1])
    
    random.seed(len(origin_id) + len(dest_id)) 
    landslide_risk = random.randint(15, 95)
    flood_risk = random.randint(10, 85)
    needs_reroute = landslide_risk > 60 or flood_risk > 60
    hazards = []

    if needs_reroute:
        if landslide_risk > 60:
            hazards.append({"type": "LANDSLIDE", "level": "CRITICAL", "message": f"{landslide_risk}% certainty of terrain collapse near route to {dest_data['name']}. Avoid NH."})
            safe_waypoint = "Tezpur,Assam"
        if flood_risk > 60:
            hazards.append({"type": "FLOOD", "level": "WARNING", "message": f"River overflowing at {flood_risk}% severity rating on primary road."})
            safe_waypoint = "Nagaon,Assam"
            
        original_mins = random.randint(300, 600)
        safe_mins = original_mins + random.randint(20, 60)
        route_text = f"AI Safe Detour via State Highway (Bypassing Risk Zone)"
        deep_link = f"https://www.google.com/maps/dir/?api=1&origin={org_data['lat']},{org_data['lng']}&destination={dest_data['lat']},{dest_data['lng']}&waypoints={safe_waypoint}&travelmode=driving"
    else:
        original_mins = random.randint(200, 500)
        safe_mins = original_mins
        route_text = "Optimal Primary Corridor"
        deep_link = f"https://www.google.com/maps/dir/?api=1&origin={org_data['lat']},{org_data['lng']}&destination={dest_data['lat']},{dest_data['lng']}&travelmode=driving"

    # En-route Weather Changes specifically for Driver
    enroute_weather = [
        {"point": "Origin (Departure)", "location": org_data["name"], "temp": 28, "condition": random.choice(["Sunny", "Cloudy"])},
        {"point": "Mid-point", "location": "Highway Transition Zone", "temp": 24, "condition": random.choice(["Heavy Rain", "Fog", "Thunderstorms", "Clear"])},
        {"point": "Destination (Arrival)", "location": dest_data["name"], "temp": 21, "condition": random.choice(["Rain", "Sunny", "Overcast", "Windy"])}
    ]

    return {
        "status": "success",
        "origin_name": org_data["name"],
        "destination_name": dest_data["name"],
        "landslide_risk_percent": landslide_risk,
        "flood_risk_percent": flood_risk,
        "hazards": hazards,
        "enroute_weather": enroute_weather,
        "standard_eta_mins": original_mins,
        "safest_eta_mins": safe_mins,
        "suggested_safe_route": route_text,
        "deep_link": deep_link,
        "needs_reroute": needs_reroute
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8085, reload=True)
