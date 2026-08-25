# HeartGuard AI

HeartGuard AI is an educational machine-learning platform that estimates a binary risk class for heart disease based on commonly studied health-related variables.

**Educational Use Only:** This application does not diagnose heart disease and does not replace a qualified healthcare professional. It is built strictly for educational and analytical purposes.

## Project Structure

- `backend/`: FastAPI Python backend for prediction inference using a pre-trained Joblib model.
- `frontend/`: Next.js 15+ React application using Tailwind CSS for UI and Recharts for visualization.
- `heart_disease_logistic_model.joblib`: The serialized Logistic Regression scikit-learn model.

## Technology Stack

- **Backend**: Python, FastAPI, Pandas, Scikit-learn, Pydantic, Uvicorn
- **Frontend**: Next.js, React, Tailwind CSS, TypeScript, Zod, React Hook Form, Lucide Icons

## Model Information

- **Selected Model**: Logistic Regression
- **Training Dataset**: 1,024 records
- **Input Features**: 13
- **Target Variable**: `target_binary`
- **Excluded Variable**: `num` (prevented data leakage)

### 13 Input Variables
1. Age (Years)
2. Sex (0 = Female, 1 = Male)
3. Resting Blood Pressure (mm Hg)
4. Serum Cholesterol (mg/dl)
5. Fasting Blood Sugar > 120 mg/dl (0 = No, 1 = Yes)
6. Maximum Heart Rate Achieved (bpm)
7. ST Depression (Oldpeak)
8. Chest Pain Type (1, 2, 3, 4)
9. Resting ECG (0, 1, 2)
10. Exercise Induced Angina (0 = No, 1 = Yes)
11. ST-Segment Slope (1, 2, 3)
12. Number of Major Vessels (0, 1, 2, 3)
13. Thalassemia Result (3, 6, 7)

### Target Meaning
- **Class 0 (Lower Risk Class)**: Indicates patterns associated with a lower probability of heart-disease risk factors.
- **Class 1 (Higher Risk Class)**: Indicates patterns associated with a higher probability of heart-disease risk factors.

## Local Setup

### 1. Backend Setup

From the `backend` directory:

```bash
# Create and activate virtual environment (if not already done)
python -m venv .venv
# Windows: .\.venv\Scripts\activate
# Unix/Mac: source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend API
python -m uvicorn main:app --host 0.0.0.0 --port 3201 --reload
```

The API will be available at: http://127.0.0.1:3201
Swagger Docs at: http://127.0.0.1:3201/docs

### 2. Frontend Setup

From the `frontend` directory:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will be available at: http://localhost:3000

### 3. Environment Variables
The frontend uses the `.env.local` file inside the `frontend` folder:
`NEXT_PUBLIC_API_URL=http://127.0.0.1:3201`

## API Details

**Health Check**
`GET /api/health`
Returns model availability status.

**Prediction**
`POST /api/predict`
Accepts a JSON payload of the 13 required variables.
Returns success flag, risk class, human-readable result, confidence probabilities, and an educational disclaimer.

## How to Test
1. Run both the backend (port 3201) and frontend (port 3000).
2. Open the frontend in your browser.
3. The dashboard should indicate "API: Model Online".
4. Navigate to "New Assessment" and complete all 13 fields.
5. Check the required consent box and click "Analyze Heart Risk".
6. Observe the simulated processing animation and the final classification result.

## Common Errors
- **Connection Error**: If the frontend displays "API Offline", ensure the backend FastAPI server is running on port 3201.
- **Validation Errors**: Ensure input numerical ranges match constraints (e.g. Age 18-100).
