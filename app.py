from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def load_and_preprocess_data():
    df = pd.read_excel("Student-Employability-Datasets.xlsx")
   
    # Keep original mapping
    df['CLASS'] = df['CLASS'].map({'Employable': 1, 'LessEmployable': 0})
   
    X = df.loc[:, "GENERAL APPEARANCE":"Student Performance Rating"]
    y = df["CLASS"]
   
    print("Shape of dataset:", df.shape)
    print("\nDistribution of classes:")
    print(y.value_counts(normalize=True))
    print("\nMean scores for Employable vs Less Employable:")
    print(X.groupby(y).mean())
   
    return X, y

def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
   
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
   
    best_k = 6
    model = KNeighborsClassifier(n_neighbors=best_k)
    model.fit(X_train_scaled, y_train)
   
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
   
    print(f"\nModel accuracy: {accuracy:.2f}")
   
    return model, scaler

X, y = load_and_preprocess_data()
model, scaler = train_model(X, y)

def apply_threshold(input_data, threshold=3.5):
    # Calculate the average score
    avg_score = sum(input_data) / len(input_data)
    return "Employable" if avg_score >= threshold else "Less Employable"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print('Received data:', data)
   
    input_data = [data.get(attr, 3) for attr in X.columns]
    input_scaled = scaler.transform([input_data])
   
    # Get KNN prediction and probabilities
    knn_prediction = model.predict(input_scaled)[0]
    probabilities = model.predict_proba(input_scaled)[0]
   
    # Apply the new threshold
    threshold_result = apply_threshold(input_data, threshold=3.5)
   
    # Combine KNN and threshold results
    final_result = "Employable" if (knn_prediction == 1 or threshold_result == "Employable") else "Less Employable"
   
    # Get the indices of the k nearest neighbors
    distances, indices = model.kneighbors(input_scaled)
   
    # Get the classes of these neighbors
    neighbor_classes = y.iloc[indices[0]].values
   
    # Convert neighbor classes to "Employable" or "Less Employable"
    neighbor_classes = ["Employable" if nc == 1 else "Less Employable" for nc in neighbor_classes]
   
    print('KNN Prediction:', "Employable" if knn_prediction == 1 else "Less Employable")
    print('Threshold Result:', threshold_result)
    print('Final Prediction:', final_result)
    print('Probabilities:', probabilities)
    print('Neighbor classes:', neighbor_classes)
   
    return jsonify({
        "prediction": final_result,
        "knn_prediction": "Employable" if knn_prediction == 1 else "Less Employable",
        "threshold_result": threshold_result,
        "probabilities": probabilities.tolist(),
        "neighbor_classes": neighbor_classes
    })

if __name__ == '__main__':
    app.run(debug=True)


"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
def load_and_preprocess_data():
    df = pd.read_excel("Student-Employability-Datasets.xlsx")
    
    # Keep original mapping
    df['CLASS'] = df['CLASS'].map({'Employable': 1, 'LessEmployable': 0})
    
    X = df.loc[:, "GENERAL APPEARANCE":"Student Performance Rating"]
    y = df["CLASS"]
    
    print("Shape of dataset:", df.shape)
    print("\nDistribution of classes:")
    print(y.value_counts(normalize=True))
    print("\nMean scores for Employable vs Less Employable:")
    print(X.groupby(y).mean())
    
    return X, y

def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    best_k = 6
    model = KNeighborsClassifier(n_neighbors=best_k)
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\nModel accuracy: {accuracy:.2f}")
    
    return model, scaler

X, y = load_and_preprocess_data()
model, scaler = train_model(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print('Received data:', data)
    
    input_data = [data.get(attr, 3) for attr in X.columns]
    input_scaled = scaler.transform([input_data])
    
    prediction = model.predict(input_scaled)[0]
    probabilities = model.predict_proba(input_scaled)[0]
    
    # Adjust interpretation: high probability of class 0 means "Employable"
    result = "Employable" if probabilities[0] > 0.5 else "Less Employable"
    
    # Get the indices of the k nearest neighbors
    distances, indices = model.kneighbors(input_scaled)
    
    # Get the classes of these neighbors
    neighbor_classes = y.iloc[indices[0]].values
    
    # Adjust neighbor class interpretation
    neighbor_classes = ["Employable" if nc == 0 else "Less Employable" for nc in neighbor_classes]
    
    print('Prediction:', result)
    print('Probabilities:', probabilities)
    print('Neighbor classes:', neighbor_classes)
    
    return jsonify({
        "prediction": result,
        "probabilities": probabilities.tolist(),
        "neighbor_classes": neighbor_classes
    })

if __name__ == '__main__':
    app.run(debug=True)
"""