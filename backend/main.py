from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import matplotlib.pyplot as plt
from fastapi.middleware.cors import CORSMiddleware
import logging
from datetime import datetime
from io import BytesIO
import base64
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.manifold import TSNE
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import nltk
import traceback
import numpy as np

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Initialize FastAPI application
app = FastAPI()

# Set up CORS middleware for the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize feedback DataFrame and counter
# feedback_df = pd.DataFrame(columns=['ID', 'Time', 'Group', 'Feedback'])
file_name = "feedback_data.xlsx"

try:
    feedback_df = pd.read_excel(file_name)
except FileNotFoundError:
    feedback_df = pd.DataFrame(columns=['ID', 'Time', 'Group', 'Feedback'])
feedback_counter = feedback_df.shape[0] + 1

# Download required NLTK resources
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Define the feedback model
class Feedback(BaseModel):
    group: str
    feedback: str

# Endpoint for submitting feedback
@app.post("/submit_feedback/")
async def submit_feedback(feedback: Feedback):
    
    global feedback_df, feedback_counter
    try:

        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        feedback_id = f"{feedback_counter:03d}"
        feedback_counter += 1

        new_feedback_entry = pd.DataFrame({
            'ID': [feedback_id],
            'Time': [current_time],
            'Group': [feedback.group],
            'Feedback': [feedback.feedback]
        })
        

        feedback_df = pd.concat([feedback_df, new_feedback_entry], ignore_index=True)
        print(feedback_df)
      
        feedback_df.to_excel('feedback_data.xlsx', index=False)

        return {"message": "Feedback received", "feedback_id": feedback_id}
    except Exception as e:
        logging.error(f"Error in submit_feedback: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/plot_feedback/")
async def plot_feedback():
    global feedback_df
    # print(feedback_df)
   
    if feedback_df.empty:
        return {"message": "No feedback available to plot"}

    try:
        # Directly use the output of preprocess_text without joining
        preprocessed_data = [preprocess_text(feedback) for feedback in feedback_df['Feedback']]
        logging.debug(f"Preprocessed data immediately after list comprehension: {preprocessed_data}")
        print("Preprocessed data:", preprocessed_data)  # Additional logging

        if not preprocessed_data:
            logging.error("Preprocessed data is empty after text processing.")
            return {"message": "Processed feedback is empty or only contains stop words"}

        vectorizer = TfidfVectorizer(min_df=1)
        try:
            word_vectors = vectorizer.fit_transform(preprocessed_data)
        except ValueError as e:
            logging.error(f"Vectorization error: {e}")
            return {"message": "Vectorization failed due to insufficient data"}

        tsne = TSNE(n_components=2, perplexity=15, random_state=42, init="random", learning_rate=200)
        reduced_vectors = tsne.fit_transform(word_vectors.toarray())

        plt.figure()
        colors = {'tab1': 'red', 'tab2': 'blue'}
        for group_name, group_data in feedback_df.groupby('Group'):
            color = colors.get(group_name, 'green')
            plt.scatter(reduced_vectors[group_data.index, 0], reduced_vectors[group_data.index, 1], label=group_name, color=color)

            for i, text in enumerate(group_data.index):
                plt.annotate(text, (reduced_vectors[group_data.index[i], 0], reduced_vectors[group_data.index[i], 1]))

        plt.xlabel('t-SNE Dimension 1')
        plt.ylabel('t-SNE Dimension 2')
        plt.title('Feedback Visualization')
        plt.legend()

        img_bytes = BytesIO()
        plt.savefig(img_bytes, format='png')
        img_bytes.seek(0)
        image_url = "data:image/png;base64," + base64.b64encode(img_bytes.read()).decode()
        plt.close()

        return {"image_url": image_url}
    except Exception as e:
        logging.error(f"Error in plot_feedback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))


# Preprocessing function for feedback text
def preprocess_text(text):
    try:
        text = text.lower()
        tokens = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word.isalpha() and word not in stop_words]

        # Return the filtered tokens as a single string
        return ' '.join(filtered_tokens)
    except Exception as e:
        logging.error(f"Error in preprocess_text: {e}")
        return ""

    


# Run the app
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
