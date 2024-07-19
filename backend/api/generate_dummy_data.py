import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
# Configure o Django
django.setup()

# Verificar se as configurações estão carregadas corretamente
from django.conf import settings


from faker import Faker
from random import choice, choices, randint
from datetime import date, timedelta
from api.models import *
from api.equip_dict import *
import csv

fake = Faker('pt_BR')

# Create dummy calibrations
def create_client():
    clients = []

    for name in company_names:

        client = Client.objects.create(
            name = name,
            cnpj = fake.cnpj(),
            contract_number = fake.random_number(digits=6)
        )
        clients.append(client)
    return clients

def create_location(clients):
    locations = []
    #place = choices(location_options, location_weights)[0]
    for place in location_options:
        
        for hospital in place["hospitals"]:

            location = Location.objects.create(
                name = hospital,
                supervisor = fake.name(),
                phone_number = fake.phone_number(),
                street = fake.street_name(),
                number = fake.building_number(),
                neighborhood = fake.neighborhood(),
                cep = fake.postcode(),
                city = place["city"],
                state = place["state"],
                client = choice(clients),
            )
            locations.append(location)
    return locations
# Create dummy users
def create_users(num_users):
    users = []
    credentials = []
    today = date.today()
    min_birth_date = today - timedelta(days=65*365)
    max_birth_date = today - timedelta(days=18*365)

    # Generate a random birth date within the range
    
    
    for _ in range(num_users):
        user_name = fake.user_name() 
        password = fake.password()
        user = CustomUser.objects.create(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            function=choices(functions_options, functions_weights)[0],
            phone_number=fake.phone_number(),
            matriculation=fake.random_number(digits=6),
            birth_date = fake.date_between(start_date=min_birth_date, end_date=max_birth_date),
            location=choices([location["city"] for location in location_options], location_weights)[0],
            username=user_name,
            password=password,
        )
        credentials.append((user_name,password))
        users.append(user)

    return users, credentials

# Create dummy equipment
def create_equipment(num_equipment, users, locations):
    equipment = []
    equip_options = list(equip_dict.keys()) 
    equip_weights = [equip["PESO"] for equip in list(equip_dict.values())]

    for _ in range(num_equipment):

        tipo = choices(equip_options, equip_weights)[0]
        provider_options = [equip for equip in equip_dict[tipo]["FORNECEDORES"]]
        provider = choice(provider_options)
        # print(provider["MODELO"], len(provider["MODELO"]))
        # print(provider["FABRICANTE"], len(provider["FABRICANTE"]))
        user = choice(users)
        equip = Equipment.objects.create(
            type= tipo,
            state=choice(['ATIVO', 'INATIVO']),
            owner=choice(locations),
            model=provider["MODELO"],
            manufacturer=provider["FABRICANTE"],
            identification=fake.random_number(digits=10),
            serial_number=fake.random_number(digits=10),
            added_by=user
        )
        #print(equip.id)
        equipment.append(equip)
    return equipment

# Create dummy service orders
def create_service_orders(num_orders, users, equipment):
    orders = []
    for _ in range(num_orders):

        requester = choice(users)
        requester_full_name = requester.get_full_name()
        executor = choice(users)
        executor_full_name = executor.get_full_name()
        equip = choice(equipment)
        tipo = choices(service_type_options,service_type_weights)[0]
        issue_options = [equip for equip in equip_dict[equip.type]["DEFEITOS"]]
        issue = "CHECK UP DO EQUIPAMENTO" if tipo == "PREVENTIVA" else choice(issue_options)
        today = date.today()
        max_birth_date = today - timedelta(days=30)
        min_birth_date = today - timedelta(days=2*365)
        created_at = fake.date_between(start_date=min_birth_date, end_date=max_birth_date)
        closed_at = created_at + timedelta(days=randint(0, 30))

        order = ServiceOrder.objects.create(
            number=fake.random_number(digits=6),
            state=choice(['FECHADA', 'ABERTA']),
            requester=requester_full_name,
            executor=executor_full_name,
            service_type=tipo,
            closed_at=closed_at,
            priority=choice(['URGENTE', 'NÃO URGENTE']),
            title="Ordem de Serviço",
            issue_description=issue,
            created_at=created_at,
            equip=equip
        )
        orders.append(order)
    return orders

# Create dummy calibrations
def create_calibrations(num_calibrations, users, equipment):
    calibrations = []
    
    for _ in range(num_calibrations):

        requester = choice(users)
        requester_full_name = requester.get_full_name()
        executor = choice(users)
        executor_full_name = executor.get_full_name()
        equip = choice(equipment)
        calibration = Calibration.objects.create(
            number=fake.random_number(digits=6),
            requester=requester_full_name,
            executor=executor_full_name,
            expiration=fake.date_this_decade(),
            equip=equip
        )
        calibrations.append(calibration)
    return calibrations

# Generate dummy data
def generate_dummy_data(num_users=15, num_equipment=50, num_orders=100, num_calibrations=150):
    
    clients = create_client()
    locations = create_location(clients)
    users, credentials = create_users(num_users)
    equipment = create_equipment(num_equipment, users, locations)
    service_orders = create_service_orders(num_orders, users, equipment)
    calibrations = create_calibrations(num_calibrations, users, equipment)

    # with open("dados.csv", mode='w', newline='', encoding='utf-8') as file:
    #     writer = csv.writer(file)

    #     # Escreve cada linha da lista no arquivo CSV
    #     for row in credentials:
    #         writer.writerow(row)

# Call the function to generate data
#generate_dummy_data()
