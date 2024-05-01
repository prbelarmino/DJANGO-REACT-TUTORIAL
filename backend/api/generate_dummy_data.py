from faker import Faker
from random import choice, choices
from .equip_dict import *
from .models import *

fake = Faker('pt_BR')

# Create dummy users
def create_users(num_users):
    users = []
    credentials = []
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
            age=fake.random_int(min=18, max=70),
            location=choices(location_options, location_weights)[0],
            username=user_name,
            password=password,
        )
        credentials.append((user_name,password))
        users.append(user)
    return users, credentials

# Create dummy equipment
def create_equipment(num_equipment, users):
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
            state=choice(['Ativo', 'Inativo']),
            owner=choice(hospitals),
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

        order = ServiceOrder.objects.create(
            number=fake.random_number(digits=6),
            state=choice(['Fechada', 'Aberta']),
            requester=requester_full_name,
            executor=executor_full_name,
            service_type=tipo,
            priority=choice(['URGENTE', 'NÃO URGENTE']),
            title="Ordem de Serviço",
            issue_description=issue,
            equip_id=equip
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
            equip_id=equip
        )
        calibrations.append(calibration)
    return calibrations

# Generate dummy data
def generate_dummy_data(num_users=15, num_equipment=50, num_orders=100, num_calibrations=150):
    users, credentials = create_users(num_users)
    equipment = create_equipment(num_equipment, users)
    service_orders = create_service_orders(num_orders, users, equipment)
    calibrations = create_calibrations(num_calibrations, users, equipment)
    #print(credentials)

# Call the function to generate data
#generate_dummy_data()
