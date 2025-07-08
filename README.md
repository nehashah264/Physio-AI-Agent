# Physiotherapy AI Agent

A web application that recommends physiotherapy exercises based on user-reported pain areas and intensity, powered by Google's Gemini API. Users can select a pain area from a dropdown or enter a custom pain area, and the app displays exercise recommendations with descriptions, repetitions, and images.

## Features
- **Frontend**: Built with React, TypeScript, Tailwind CSS, and Redux Toolkit for a responsive and type-safe UI.
- **Backend**: Flask API integrated with Google Gemini API to generate exercise recommendations, including public image URLs.
- **User Input**: Supports both dropdown selection (e.g., Neck Pain, Back Pain) and custom text input for pain areas.
- **Image Support**: Displays exercise images provided by Gemini API, with a fallback for invalid URLs.
- **Error Handling**: Robust validation for user inputs and API responses.
- **Deployment Ready**: Instructions for deploying to Render (backend) and Netlify/Vercel (frontend).

## Tech Stack
- **Frontend**: React 18.2.0, TypeScript, Tailwind CSS 3.4.3, Redux Toolkit 1.9.5, Axios 1.4.0
- **Backend**: Python 3.8+, Flask 2.3.2, Google Generative AI 0.5.4
- **Tools**: Node.js 16+, Git, PostCSS, Gunicorn

## Prerequisites
- **Node.js**: 16+ ([nodejs.org](https://nodejs.org/))
- **Python**: 3.8+ ([python.org](https://www.python.org/))
- **Gemini API Key**: Obtain from [Google AI Studio](https://aistudio.google.com/)
- **Git**: For cloning and version control

## Project Structure
```
physiotherapy-ai-agent/
├── .env                    # Environment variables (GEMINI_API_KEY)
├── app.py                  # Flask backend with Gemini API
├── requirements.txt        # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputForm.tsx        # Form for pain area and intensity
│   │   │   └── Recommendations.tsx   # Displays exercise recommendations with images
│   │   ├── store/
│   │   │   ├── recommendationSlice.ts # Redux slice for state management
│   │   │   └── store.ts              # Redux store configuration
│   │   ├── App.tsx                   # Main app component
│   │   ├── index.css                 # Tailwind CSS styles
│   │   ├── index.tsx                 # Entry point with Redux Provider
│   │   └── react-app-env.d.ts        # TypeScript declarations
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── tsconfig.json                # TypeScript configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── tailwind.config.js           # Tailwind CSS configuration
└── venv/                           # Python virtual environment
```

## Setup Instructions

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/physiotherapy-ai-agent.git
   cd physiotherapy-ai-agent
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment**:
   - Create a `.env` file in the root directory:
     ```text
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - Replace `your_gemini_api_key_here` with your Gemini API key.

5. **Run Backend**:
   ```bash
   python app.py
   ```
   - Backend runs at `http://localhost:5000`.

### Frontend Setup
1. **Navigate to Frontend**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Frontend**:
   ```bash
   npm start
   ```
   - Frontend runs at `http://localhost:3000`.

## Usage
1. Open `http://localhost:3000` in your browser.
2. Choose an input method:
   - **Dropdown**: Select a predefined pain area (e.g., Neck Pain, Back Pain, Shoulder Pain).
   - **Custom**: Enter a specific pain area (e.g., "lower back pain").
3. Enter pain intensity (1–10).
4. Click "Get Recommendations" to view exercises, descriptions, repetitions, images, and a safety note.
5. Test with different inputs:
   - Dropdown: "Neck Pain", intensity 5 → Multiple exercises with images.
   - Custom: "lower back pain", intensity 8 → One gentle exercise with an image.

## API Endpoints
- **POST `/api/recommend`**:
  - **Request**:
    ```json
    {
      "pain_area": "neck_pain",
      "intensity": 5
    }
    ```
  - **Response**:
    ```json
    {
      "exercises": [
        {
          "name": "Neck Stretch",
          "description": "Tilt head to one side, hold for 15 seconds.",
          "reps": "5 per side",
          "image_url": "https://images.unsplash.com/photo-1601582589909-f92b1dd3f4f4"
        },
        {
          "name": "Chin Tuck",
          "description": "Pull chin back to align with spine, hold 5 seconds.",
          "reps": "10",
          "image_url": "https://images.unsplash.com/photo-1594882645126-14020914d58d"
        }
      ],
      "note": "Perform these exercises gently to avoid strain."
    }
    ```

## Deployment

### Backend (Render)
1. Push the repository to GitHub.
2. Create a new Web Service on [Render](https://render.com/).
3. Set up:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment Variable**: Add `GEMINI_API_KEY` in Render’s dashboard.
4. Update CORS in `app.py`:
   ```python
   CORS(app, resources={r"/api/*": {"origins": "https://your-frontend-url.netlify.app"}})
   ```

### Frontend (Netlify/Vercel)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
3. Add environment variable in `.env`:
   ```text
   REACT_APP_API_URL=https://your-backend.onrender.com
   ```
4. Update `src/components/InputForm.tsx`:
   ```typescript
   const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/recommend`, {
     pain_area: painArea.trim(),
     intensity,
   });
   ```

## Troubleshooting
- **Tailwind CSS Error**:
  - Ensure `@tailwindcss/postcss@0.1.3` is used:
    ```bash
    npm install -D @tailwindcss/postcss@0.1.3 tailwindcss@3.4.3
    ```
- **Invalid Hook Call**:
  - Verify single React instance:
    ```bash
    npm ls react react-dom
    ```
  - Add to `package.json` if needed:
    ```json
    "resolutions": {
      "react": "18.2.0",
      "react-dom": "18.2.0"
    }
    ```
  - Reinstall: `npm install`
- **Gemini API Issues**:
  - Verify `GEMINI_API_KEY` is valid.
  - If image URLs fail, test with a standalone script or revert to a predefined database (contact for code).
- **CORS Errors**:
  - Ensure backend allows `http://localhost:3000` locally and the deployed frontend URL.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature-name"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contact
For issues or suggestions, open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).