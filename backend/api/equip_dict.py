functions_options = ["Técnico", "Supervisor", "Gerente"]
functions_weights = [25, 5, 1]
location_options = ["Aracaju", "Salvador"]
location_weights = [1, 7]
location_options = ["Aracaju", "Salvador"]
location_weights = [1, 7]
location_weights = [1, 7]
service_type_options = ["CORRETIVA", "PREVENTIVA"]
service_type_weights = [5, 1]

hospitals = [
    "HOSPITAL SÃO RAFAEL",
    "HOSPITAL GERAL ROBERTO SANTOS",
    "HOSPITAL SANTA ISABEL",
    "HOSPITAL PORTUGUÊS",
    "HOSPITAL ERNESTO SIMÕES FILHO",
    "HUSE"
]

equip_dict = {
    "MONITORES DE PACIENTE": {
        "FORNECEDORES": [
            {"MODELO": "INTELLIVUE MX750", "FABRICANTE": "PHILIPS"},
            {"MODELO": "CARESCAPE B450", "FABRICANTE": "GE"},
            {"MODELO": "RADIUS PPG", "FABRICANTE": "MASIMO"}
        ],
        "DEFEITOS": [
            "falhas na tela", "problemas de calibração", "falhas no sensor de pressão arterial",
            "alarmes falsos", "problemas de conectividade"
        ],
        "PESO": 9
    },
    "DESFIBRILADOR": {
        "FORNECEDORES": [
            {"MODELO": "LIFEPAK 15", "FABRICANTE": "PHYSIO-CONTROL"},
            {"MODELO": "POWERHEART G5", "FABRICANTE": "CARDIAC SCIENCE"},
            {"MODELO": "SAMARITAN PAD 500P", "FABRICANTE": "HEARTSINE TECHNOLOGIES"}
        ],
        "DEFEITOS": [
            "falha na carga da bateria", "problemas de eletrodos", "falhas na detecção de ritmo",
            "falhas no carregamento do capacitor", "problemas no software"
        ],
        "PESO": 8
    },
    "VENTILADOR PULMONAR": {
        "FORNECEDORES": [
            {"MODELO": "EVITA V500", "FABRICANTE": "DRÄGERWERK AG"},
            {"MODELO": "RESPIRONICS V680", "FABRICANTE": "PHILIPS"},
            {"MODELO": "PURITAN BENNETT 840", "FABRICANTE": "MEDTRONIC"}
        ],
        "DEFEITOS": [
            "falhas mecânicas", "problemas no circuito de ar", "falhas no sensor de pressão",
            "problemas no modo de ventilação", "falhas no monitoramento de oxigênio"
        ],
        "PESO": 9
    },
    "BOMBA DE INFUSÃO": {
        "FORNECEDORES": [
            {"MODELO": "ALARIS 8015", "FABRICANTE": "BD"},
            {"MODELO": "ORCHESTRA", "FABRICANTE": "FRESENIUS KABI"},
            {"MODELO": " CADD-SOLIS", "FABRICANTE": "SMITHS MEDICAL"}
        ],
        "DEFEITOS": [
            "alarmes falsos", "obstruções no sistema de infusão", "problemas no motor da bomba",
            "falhas na administração de medicamentos", "vazamentos"
        ],
        "PESO": 8
    },
    "MÁQUINA DE ANESTESIA": {
        "FORNECEDORES": [
            {"MODELO": "AISYS CS²", "FABRICANTE": "GE"},
            {"MODELO": "A7", "FABRICANTE": "MINDRAY"},
            {"MODELO": "MEDFUSION 3500", "FABRICANTE": "SMITHS MEDICAL"}
        ],
        "DEFEITOS": [
            "vazamentos de gases", "problemas na calibração", "falhas no vaporizador",
            "problemas no sistema de alarme", "falhas no monitor de gases"
        ],
        "PESO": 9
    },
    "AUTOCLAVE": {
        "FORNECEDORES": [
            {"MODELO": "GEB STEAM STERILIZER", "FABRICANTE": "GETINGE GROUP"},
            {"MODELO": "WD 290", "FABRICANTE": "BELIMED"},
            {"MODELO": "AMSCO EVOLUTION FLOOR LOADER", "FABRICANTE": "STERIS CORPORATION"}
        ],
        "DEFEITOS": [
            "vazamentos de vapor", "problemas na selagem", "falhas no ciclo de esterilização",
            "problemas no sistema de pressão", "falhas no controle de temperatura"
        ],
        "PESO": 8
    },
    "INCUBADORA NEONATAL": {
        "FORNECEDORES": [
            {"MODELO": "BABYTHERM 8010", "FABRICANTE": "DRÄGERWERK AG"},
            {"MODELO": "NEOCOT", "FABRICANTE": "ATOM"},
            {"MODELO": "NEOBLUE LED PHOTOTHERAPY", "FABRICANTE": "NATUS"}
        ],
        "DEFEITOS": [
            "problemas no sistema de aquecimento", "falhas no controle de umidade", "falhas no sistema de alarme",
            "problemas no sistema de rotação", "problemas no sistema de controle de temperatura"
        ],
        "PESO": 9
    },
    "APARELHO DE PRESSÃO": {
        "FORNECEDORES": [
            {"MODELO": "M2 BASIC", "FABRICANTE": "OMRON"},
            {"MODELO": "BP A100 PLUS", "FABRICANTE": "MICROLIFE"},
            {"MODELO": "RI-CHAMPION N", "FABRICANTE": "RIESTER"}
        ],
        "DEFEITOS": [
            "vazamentos", "problemas na calibração", "falhas no manômetro",
            "problemas na braçadeira", "inconsistências nos resultados"
        ],
        "PESO": 7
    },
    "OXÍMETRO DE PULSO": {
        "FORNECEDORES": [
            {"MODELO": "OXIMAX N-600X", "FABRICANTE": "MEDTRONIC"},
            {"MODELO": "ONYX VANTAGE 9590", "FABRICANTE": "NONIN"},
            {"MODELO": "CMS50DL", "FABRICANTE": "CONTEC"}
        ],
        "DEFEITOS": [
            "problemas no sensor", "falhas na leitura", "problemas no display",
            "problemas na bateria", "inconsistências nos resultados"
        ],
        "PESO": 7
    },
    "ELETROCARDIÓGRAFO": {
        "FORNECEDORES": [
            {"MODELO": "PAGEWRITER TC20", "FABRICANTE": "PHILIPS"},
            {"MODELO": "AT-101", "FABRICANTE": "SCHILLER AG"},
            {"MODELO": "ELI 350", "FABRICANTE": "MORTARA INSTRUMENT"}
        ],
        "DEFEITOS": [
            "problemas na gravação", "falhas no sensor", "problemas no sistema de alimentação",
            "falhas na conectividade", "problemas no software"
        ],
        "PESO": 6
    },
    "CARDIOVERSOR": {
        "FORNECEDORES": [
            {"MODELO": "R SERIES", "FABRICANTE": "ZOLL"},
            {"MODELO": "LIFEPAK 20", "FABRICANTE": "PHYSIO-CONTROL"},
            {"MODELO": "FRED PA-1", "FABRICANTE": "SCHILLER AG"}
        ],
        "DEFEITOS": [
            "problemas na carga", "falhas no monitoramento", "problemas no software",
            "falhas na desfibrilação", "problemas no sistema de energia"
        ],
        "PESO": 6
    }
}
