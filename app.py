from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')


@app.route('/api/recommend', methods=['POST'])
def recommend_exercises():
    data = request.json
    pain_area = data.get('pain_area', '')
    intensity = data.get('intensity', 5)

    if not pain_area or not isinstance(intensity, int) or intensity < 1 or intensity > 10:
        return jsonify({"error": "Invalid input. Provide pain_area and intensity (1-10)."}), 400

    # Create prompt for Gemini
    prompt = f"""
    You are a physiotherapy expert. A patient reports {pain_area} with a pain intensity of {intensity} out of 10.
    Recommend 1-2 appropriate physiotherapy exercises, including:
    - Exercise name
    - Description of how to perform it
    - Recommended repetitions or duration
    - A public image URL (e.g., from Unsplash or Pexels) showing the exercise being performed
    For high pain intensity (>7), suggest only one gentle exercise. Provide a note on how to perform the exercises safely.
    Format the response as JSON with 'exercises' (list of objects with name, description, reps, image_url) and 'note' (string).
    Example:
    ```json
    {{
      "exercises": [
        {{
          "name": "Neck Stretch",
          "description": "Tilt head to one side, hold for 15 seconds.",
          "reps": "5 per side",
          "image_url": "https://images.unsplash.com/photo-1601582589909-f92b1dd3f4f4"
        }}
      ],
      "note": "Perform gently to avoid strain."
    }}
    ```
    """

    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        if response_text.startswith('```json') and response_text.endswith('```'):
            response_text = response_text[7:-3].strip()
        recommendations = json.loads(response_text)

        # Validate response structure
        if not isinstance(recommendations, dict) or 'exercises' not in recommendations or 'note' not in recommendations:
            return jsonify({"error": "Invalid response format from AI model."}), 500

        for exercise in recommendations['exercises']:
            if not all(key in exercise for key in ['name', 'description', 'reps', 'image_url']):
                return jsonify({"error": "Missing required exercise fields in AI response."}), 500

        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": f"Failed to generate recommendations: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)