import random

import faker as fk
import random as rnd
from faker.providers import address
import datetime

fake = fk.Faker()
fake.add_provider(address)

car_name_list = ['BMW series 1', 'BMW series 3', 'BMW series 4', 'BMW series 5', 'BMW series 6',
                 'BMW series 7', 'BMW x1', 'BMW x3', 'BMW x5', 'BMW x7',
                 "Acura NSX",
                 "Alfa Romeo Giulia",
                 "Audi A4",
                 "BMW 3 Series",
                 "Cadillac Escalade",
                 "Chevrolet Camaro",
                 "Dodge Charger",
                 "Ferrari 488",
                 "Ford Mustang",
                 "Honda Accord",
                 "Hyundai Sonata",
                 "Jaguar F-PACE",
                 "Kia Sorento",
                 "Lamborghini Huracan",
                 "Lexus RX",
                 "Mazda CX-5",
                 "Mercedes-Benz E-Class",
                 "Nissan Altima",
                 "Porsche 911",
                 "Subaru Outback",
                 "Tesla Model S",
                 "Toyota Camry",
                 "Volkswagen Golf",
                 "Volvo XC90"
                 ]


def escape_single_quote(string):
    new_str = ''
    for let in string:
        if let == "'":
            new_str += "''"
        elif let == ",":
            new_str += ""
        else:
            new_str += let
    return new_str


def generate_repaireds():
    id_car = rnd.randint(1, 100)
    id_mechanic = rnd.randint(1, 100)
    year = random.randint(2000, 2022)
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    date_created = str(year) + "-" + str(month) + "-" + str(day)
    price = rnd.randint(100, 35000)
    return "('" + date_created + "'," + str(price) + "," + str(id_mechanic) + "," + str(id_car) + ")"


def generate(nr, batch_size=1000):
    print("GENERATING Cars")
    file = open('data_generation/insert_data.sql', 'a')
    ##     file.write('ALTER TABLE first_app_repaired DISABLE TRIGGER ALL;TRUNCATE first_app_repaired RESTART IDENTITY '
    ##     'CASCADE;')

    i_ca = 1
    nr_written = 0

    for b in range(nr // batch_size):
        stmt = 'INSERT INTO public.first_app_repaired(date_created, price, mechanic_id, car_id) VALUES'
        for i in range(batch_size):
            if i != 0:
                stmt += generate_repaireds()
                stmt += ","
        stmt += generate_repaireds()
        file.write(stmt + ";\n")
        print("Finished " + str(b * batch_size) + " with repairs!")
    ##     file.write('ALTER TABLE first_app_repaired ENABLE TRIGGER ALL;')
    file.close()


generate(1000, 100)
