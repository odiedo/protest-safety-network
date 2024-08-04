from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'you-will-never-guess'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///protest_safety.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class ProtestRoute(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    start_location = db.Column(db.String(128), nullable=False)
    end_location = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class CrowdDensity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(128), nullable=False)
    density = db.Column(db.Integer, nullable=False)
    reported_at = db.Column(db.DateTime, default=datetime.utcnow)

class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    contact_info = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(64), nullable=False)

class SafeCheckpoint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(128), nullable=False)
    supplies = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/routes', methods=['POST'])
def add_route():
    data = request.get_json()
    route = ProtestRoute(name=data['name'], start_location=data['start_location'], end_location=data['end_location'])
    db.session.add(route)
    db.session.commit()
    return jsonify(id=route.id, name=route.name, start_location=route.start_location, end_location=route.end_location), 201

@app.route('/routes', methods=['GET'])
def get_routes():
    routes = ProtestRoute.query.all()
    return jsonify([{'id': route.id, 'name': route.name, 'start_location': route.start_location, 'end_location': route.end_location} for route in routes]), 200

@app.route('/crowd_density', methods=['POST'])
def add_crowd_density():
    data = request.get_json()
    density = CrowdDensity(location=data['location'], density=data['density'])
    db.session.add(density)
    db.session.commit()
    return jsonify(id=density.id, location=density.location, density=density.density, reported_at=density.reported_at), 201

@app.route('/crowd_density', methods=['GET'])
def get_crowd_density():
    densities = CrowdDensity.query.all()
    return jsonify([{'id': density.id, 'location': density.location, 'density': density.density, 'reported_at': density.reported_at} for density in densities]), 200

@app.route('/volunteers', methods=['POST'])
def add_volunteer():
    data = request.get_json()
    volunteer = Volunteer(name=data['name'], contact_info=data['contact_info'], role=data['role'])
    db.session.add(volunteer)
    db.session.commit()
    return jsonify(id=volunteer.id, name=volunteer.name, contact_info=volunteer.contact_info, role=volunteer.role), 201

@app.route('/volunteers', methods=['GET'])
def get_volunteers():
    volunteers = Volunteer.query.all()
    return jsonify([{'id': volunteer.id, 'name': volunteer.name, 'contact_info': volunteer.contact_info, 'role': volunteer.role} for volunteer in volunteers]), 200

@app.route('/checkpoints', methods=['POST'])
def add_checkpoint():
    data = request.get_json()
    checkpoint = SafeCheckpoint(location=data['location'], supplies=data['supplies'])
    db.session.add(checkpoint)
    db.session.commit()
    return jsonify(id=checkpoint.id, location=checkpoint.location, supplies=checkpoint.supplies, created_at=checkpoint.created_at), 201

@app.route('/checkpoints', methods=['GET'])
def get_checkpoints():
    checkpoints = SafeCheckpoint.query.all()
    return jsonify([{'id': checkpoint.id, 'location': checkpoint.location, 'supplies': checkpoint.supplies, 'created_at': checkpoint.created_at} for checkpoint in checkpoints]), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
