import faker as fk
import random as rnd
import string
from faker.providers import address
import random

fake = fk.Faker()
fake.add_provider(address)


def escape_single_quote(stri):
    new_str = ''
    for let in stri:
        if let == "'":
            new_str += "''"
        elif let == ",":
            new_str += ""
        else:
            new_str += let
    return new_str


def generate_username(first_name, last_name):
    first = first_name.lower()[len(first_name) // 2 - 1: len(first_name) // 2 + 2]
    last = last_name.lower()[len(last_name) // 2 - 1: len(last_name) // 2 + 2]
    return first + rnd.choice(string.ascii_lowercase) + last + str(rnd.randint(100, 999))


def generate_user():
    first_name = escape_single_quote(fake.first_name())
    last_name = escape_single_quote(fake.last_name())
    email = f"{first_name.lower()}.{last_name.lower()}@{fake.domain_name()}"
    username = generate_username(first_name, last_name)
    return username, email, first_name, last_name


def put_user_together(username, email, password):
    return "('" + username + "','" + email + "','" + password + "',true,true,true,'','','2023-04-27 22:18:54')"



def generate(nr, batch_size=100):
    print("GENERATING USERS ")

    file_u = open('data_generation/insert_data_users.sql', 'a')

    ##     file_u.write('ALTER TABLE auth_user DISABLE TRIGGER ALL; TRUNCATE auth_user RESTART IDENTITY CASCADE;\n')

    # unhashed password = Easy123Pass
    password = 'pbkdf2_sha256$390000$VxXug1jiSC6hHTD9MUAEuJ$qZvuOVv2BToBIcrWKm4+DZ+/6FyZ84pAq0/wDb1MwEM='
    nr_written = 0
    stmt_u = 'INSERT INTO auth_user (username,email,password,is_active,is_staff,is_superuser,first_name,last_name,date_joined) VALUES '
    usernames = {}
    emails = {}
    for i_u in range(1, nr + 1):
        if nr_written != 0:
            stmt_u += ","

        name, email, first_name, last_name = generate_user()
        if usernames.get(name) is not None:
            usernames[name] += 1
            name = name + str(usernames[name])
        else:
            usernames[name] = 1
        if emails.get(email) is not None:
            emails[email] += 1
            email = email.split('@')[0] + emails[email] + email.split('@')[1]
        user = put_user_together(name, email, password)

        stmt_u += user
        nr_written += 1

        # if written more than batch size, write stmt to new line
        if nr_written > batch_size:
            nr_written = 0
            file_u.write(stmt_u + ";\n")
            stmt_u = 'INSERT INTO auth_user (username,email,password,is_active,is_staff,is_superuser,first_name,last_name,date_joined) VALUES '

    # write out last line as well
    if nr_written != 0:
        file_u.write(stmt_u + ";\n")
    ##     file_u.write('ALTER TABLE auth_user ENABLE TRIGGER ALL;')
    print("Finished " + str(i_u) + " with users!")
    file_u.close()


generate(1000, 100)
