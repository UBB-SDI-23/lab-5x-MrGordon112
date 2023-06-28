import faker as fk
import random as rnd
from faker.providers import address
import random

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


def generate_cars():

    price_list = ['$', '$$', '$$$$', '$$$$$']
    name = random.choice(car_name_list)
    description = escape_single_quote(fake.catch_phrase())
    price = rnd.randint(700, 100000)
    year = rnd.randint(1940, 2022)
    carType_id= rnd.randint(1, 1000)
    return "('" + name + "','" + description + "'," + str(price) + "," + str(year) + ",'" + str(carType_id) + "')"


def generate(nr, batch_size=1000):
    print("GENERATING Cars")
    file = open('data_generation/insert_data.sql', 'a')
   ## file.write('ALTER TABLE first_app_car DISABLE TRIGGER ALL;TRUNCATE first_app_car RESTART IDENTITY '
      ##         'CASCADE;')

    i_ca = 1
    nr_written = 0

    for b in range(nr // batch_size):
        stmt = 'INSERT INTO public.first_app_car(name, description, price, year, "carType_id") VALUES'
        for i in range(batch_size):
            if i != 0:
                stmt += generate_cars()
                stmt += ","
        stmt += generate_cars()
        file.write(stmt + ";\n")
        print("Finished " + str(b * batch_size) + " with cars!")
    ##file.write('ALTER TABLE first_app_car ENABLE TRIGGER ALL;')
    file.close()


generate(1000, 100)
