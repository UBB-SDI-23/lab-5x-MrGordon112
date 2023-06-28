import faker as fk
import random as rnd
from faker.providers import address

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


def generate_carType():
    name = escape_single_quote(fake.company())
    description = "Car company that focus on:" + escape_single_quote(fake.catch_phrase())
    revenue = rnd.randint(5000000, 10000000)
    nationality = escape_single_quote(fake.country())
    year = rnd.randint(1890, 2020)
    return "('" + name + "','" + description + "'," + str(revenue) + "," + str(year) + ",'" + nationality + "')"


def generate(nr, batch_size=1000):
    print("GENERATING COMPANIES")
    file = open('data_generation/insert_data.sql', 'a')
    ##     file.write('ALTER TABLE first_app_carType DISABLE TRIGGER ALL;TRUNCATE first_app_carType RESTART IDENTITY CASCADE;')

    i_ca = 1
    nr_written = 0

    for b in range(nr // batch_size):
        stmt = 'INSERT INTO public.first_app_carType (name, description, revenue, year, nationality) VALUES'
        for i in range(batch_size):
            if i != 0:
                stmt += generate_carType()
                stmt += ","
        stmt += generate_carType()
        file.write(stmt + ";\n")
        print("Finished " + str(b * batch_size) + " with carTypes!")
    ##     file.write('ALTER TABLE first_app_carType ENABLE TRIGGER ALL;')
    file.close()


generate(1000, 100)
