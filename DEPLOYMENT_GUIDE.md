# NetraX Deployment Guide (SIH 2026)

Since this project has a separate Backend (FastAPI) and Frontend (React/Vite), you need to deploy them to two different cloud services. The easiest and completely **FREE** platforms for hackathons are **Render** (for the backend) and **Vercel** (for the frontend).

---

## 1. Deploy the Backend (FastAPI) to Render

Render will host your Python API. 

1. Create a GitHub repository and push your entire `SIH PEOBLEM 2` folder to it.
2. Sign up at [Render.com](https://render.com/).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub account and select your repository.
5. In the settings, configure the following:
   - **Name**: `netrax-backend`
   - **Root Directory**: `backend` *(This tells Render to only look in your backend folder)*
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
6. Click **Create Web Service**. 
7. Once deployed, Render will give you a live URL (e.g., `https://netrax-backend.onrender.com`). **Copy this URL**.

---

## 2. Update the Frontend to use the Live API

Before deploying the frontend, you need to point it to your new live backend instead of `localhost`.

1. Open `app/src/components/DashboardView.jsx` and `app/src/components/DriverView.jsx`.
2. Find `http://localhost:8085` and replace it with your new Render URL (e.g., `https://netrax-backend.onrender.com`).
3. Push these changes to GitHub.

---

## 3. Deploy the Frontend (React Vite) to Vercel

Vercel is the fastest way to host React applications.

1. Sign up at [Vercel.com](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. In the configuration settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `app` *(Important! This tells Vercel your frontend is inside the `app` folder)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.
6. Wait 1-2 minutes. Vercel will give you a live HTTPS link (e.g., `https://netrax-logistics.vercel.app`).

### 🎉 You're Done!
Your NetraX Command Center is now live on the internet! You can share the Vercel link with the Smart India Hackathon judges.
