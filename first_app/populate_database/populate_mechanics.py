import faker as fk
import random as rnd
from faker.providers import address
import random

fake = fk.Faker()
fake.add_provider(address)


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


def generate_mechanics():
    experience_list = ['experienced', 'beginer', 'advanced', 'medium']
    price_list = ['$', '$$', '$$$$', '$$$$$']
    name = escape_single_quote(fake.name())
    description = escape_single_quote(fake.catch_phrase())
    experience = random.choice(experience_list)
    price = random.choice(price_list)
    age = rnd.randint(18, 75)

    return "('" + name + "','" + experience + "','" + price + "'," + str(age) + ",'" + description + "')"


def generate(nr, batch_size=1000):
    print("GENERATING COMPANIES")
    file = open('data_generation/insert_data.sql', 'a')
    file.write('ALTER TABLE first_app_mechanic DISABLE TRIGGER ALL;TRUNCATE first_app_mechanic RESTART IDENTITY '
               'CASCADE;')

    i_ca = 1
    nr_written = 0

    for b in range(nr // batch_size):
        stmt = 'INSERT INTO public.first_app_mechanic (name, experience, price, age, description) VALUES'
        for i in range(batch_size):
            if i != 0:
                stmt += generate_mechanics()
                stmt += ","
        stmt += generate_mechanics()
        file.write(stmt + ";\n")
        print("Finished " + str(b * batch_size) + " with mechanics!")
    file.write('ALTER TABLE first_app_mechanic ENABLE TRIGGER ALL;')
    file.close()


generate(1000, 100)
