from app import app, db, ProtestRoute, CrowdDensity, Volunteer, SafeCheckpoint

def seed_data():
    with app.app_context():
        db.create_all()

        # Add protest routes
        route1 = ProtestRoute(name='Kangemi route', start_location='Thika road', end_location='CBD')
        route2 = ProtestRoute(name='Mombasa route', start_location='mombasa road', end_location='CBD')
        db.session.add(route1)
        db.session.add(route2)

        # Add crowd densities
        density1 = CrowdDensity(location='-4.0188142,39.7069454', density=100)
        density2 = CrowdDensity(location='-4.0188142,39.7069454', density=200)
        db.session.add(density1)
        db.session.add(density2)

        # Add volunteers
        volunteer1 = Volunteer(name='Odiedo', contact_info='0743050069', role='Medical')
        volunteer2 = Volunteer(name='Josiah', contact_info='0759680813', role='Legal')
        db.session.add(volunteer1)
        db.session.add(volunteer2)

        # Add safe checkpoints
        checkpoint1 = SafeCheckpoint(location='Mombasa Road Med', supplies='Medical tent')
        checkpoint2 = SafeCheckpoint(location='CBD', supplies='First aid kits')
        db.session.add(checkpoint1)
        db.session.add(checkpoint2)

        db.session.commit()

if __name__ == '__main__':
    seed_data()
