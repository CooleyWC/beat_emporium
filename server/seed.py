from config import app, db
from faker import Faker
from models.users import User
from models.rentals import Rental
from models.reviews import Review
from models.instruments import Instrument
from datetime import datetime, date

if __name__ == "__main__":
  with app.app_context():
    print('starting seed...')

    User.query.delete()
    Rental.query.delete()
    Review.query.delete()
    Instrument.query.delete()

    fake = Faker()

    print('adding users')
    user_1 = User(first_name=fake.first_name(), last_name=fake.last_name(), email=fake.email(), location=fake.city())
    user_1.password_hash='paradiddle'
    user_2 = User(first_name=fake.first_name(), last_name=fake.last_name(), email=fake.email(), location=fake.city())
    user_2.password_hash='paradiddle'
    user_3 = User(first_name=fake.first_name(), last_name=fake.last_name(), email=fake.email(), location=fake.city())
    user_3.password_hash='paradiddle'

    db.session.add_all([user_1, user_2, user_3])
    db.session.commit()

    print('adding instruments...')
    instrument_1 = Instrument(name='Snare Drum', brand='Pearl', model='Philharmonic', size='14x5', color='Maple', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1626962131658-603aae425e19?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', for_rent=True, rent_price=10.50, sale_price=400, in_stock=True)
    instrument_2 = Instrument(name='Marimba', brand='Marimba One', model='Standard', size='5 Octave', color='Natural Wood', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1635737775897-cbc4c19a697d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFyaW1iYXxlbnwwfHwwfHx8MA%3D%3D', for_rent=True, rent_price=70, sale_price=12000, in_stock=True)
    instrument_3 = Instrument(name='Tambourine', brand='Black Swamp', model='German Silver', size='10in', color='Natural Wood', description=fake.paragraph(nb_sentences=5), image='https://plus.unsplash.com/premium_photo-1702552106545-feef7cbecfe0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', for_rent=True, rent_price=10.50, sale_price=400, in_stock=True)
    instrument_4 = Instrument(name='Triangle', brand='Alan Abel', model='Alan Abel', size='9in', color='silver', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=3655&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', for_rent=True, rent_price=4.00, sale_price=50.75, in_stock=True)


    db.session.add_all([instrument_1, instrument_2, instrument_3, instrument_4])
    db.session.commit()

    print('adding rentals...')

    rental_1 = Rental(user_id=1, instrument_id=1, created_at=datetime(2024,3,1,10,10,10), start_date=date(2024, 4, 14), return_date=date(2024, 5, 10))
    rental_2 = Rental(user_id=2, instrument_id=2, created_at=datetime(2024,5,10,11,1,0), start_date=date(2024, 5, 14), return_date=date(2024, 6, 1))
    rental_3 = Rental(user_id=3, instrument_id=3, created_at=datetime(2024,6,3,11,5,0), start_date=date(2024, 6, 27), return_date=date(2024, 7, 1))
    rental_4 = Rental(user_id=2, instrument_id=4, created_at=datetime(2024,5,11,10,1,0), start_date=date(2024, 6, 14), return_date=date(2024, 7, 1))

    db.session.add_all([rental_1, rental_2, rental_3, rental_4])
    db.session.commit()

    print('adding reviews')

    review_1 = Review(user_id=1, instrument_id=1, rental_id=1, created_at=datetime(2024,8,10,10,10,0), content=fake.paragraph(nb_sentences=5))
    review_2 = Review(user_id=2, instrument_id=2, rental_id=2, created_at=datetime(2024,8,10,10,10,0), content=fake.paragraph(nb_sentences=5))
    review_3 = Review(user_id=2, instrument_id=4, rental_id=4, created_at=datetime(2024,9,10,10,10,0), content=fake.paragraph(nb_sentences=5))


    db.session.add_all([review_1, review_2, review_3])
    db.session.commit()

