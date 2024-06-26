from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/feedback-app'
db = SQLAlchemy(app)


class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    stars = db.Column(db.Integer, nullable=False)


@app.route('/')
def home():
    return "home"


@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    if not all(key in data for key in ['name', 'email', 'stars']) or not (1 <= data['stars'] <= 5):
        return jsonify({"message": "Invalid feedback data"}), 400

    feedback = Feedback(name=data['name'], email=data['email'], stars=data['stars'])
    db.session.add(feedback)
    db.session.commit()
    return jsonify({"message": "Feedback submitted successfully!"})


@app.route('/feedback_list', methods=['GET'])
def get_all_feedbacks():
    feedbacks = Feedback.query.all()
    feedback_list = [{'id': f.id, 'name': f.name, 'email': f.email, 'stars': f.stars} for f in feedbacks]
    return jsonify(feedback_list)


@app.route('/update_feedback/<int:feedback_id>', methods=['PUT'])
def update_feedback(feedback_id):
    data = request.get_json()
    feedback = Feedback.query.get(feedback_id)
    if feedback is None:
        return jsonify({"message": "Feedback not found"}), 404
    if 'name' in data:
        feedback.name = data['name']
    if 'email' in data:
        feedback.email = data['email']
    if 'stars' in data:
        feedback.stars = data['stars']
    db.session.commit()
    return jsonify({"message": "Feedback updated successfully!"})


@app.route('/delete_feedback/<int:feedback_id>', methods=['DELETE'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    if feedback is None:
        return jsonify({"message": "Feedback not found"}), 404
    db.session.delete(feedback)
    db.session.commit()
    return jsonify({"message": "Feedback deleted successfully!"})


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
