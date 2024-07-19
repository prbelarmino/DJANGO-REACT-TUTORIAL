from .report_styles import *
from reportlab.platypus import  Paragraph, Image
from reportlab.lib.units import inch

class ReportContent():

    def __init__(self, data):

        self.location = data["equip"]["owner"]
        image_path = 'api/pdf_creator/logo.png'  # Replace with your image path
        top_logo = Image(image_path, width=1.5*inch, height=0.75*inch)
        header = Paragraph("CERTIFICADO DE CALIBRAÇÃO", title_style)
        calib_number = Paragraph("Nº: " + str(data["number"].value), calib_number_style)
        self.header_data = [[top_logo, header,"",""],
                    ["",calib_number,"",""]]
        self.calib_data = [
            [Paragraph("Sistema<br/>Internacional<br/>MPa", multiline_style),
            Paragraph("Valor do<br/>Instrumento<br/>( kgf/cm² )", multiline_style),
            "Calibração - Valor de Referência ( kgf/cm² )", "", "",
            Paragraph("Média dos<br/>Ciclos<br/>( kgf/cm² )", multiline_style),
            Paragraph("Erro<br/>( kgf/cm² )", multiline_style),
            Paragraph("Incerteza de<br/>Medição - U<br/>( kgf/cm² )", multiline_style),"k","veff"],
            ["", "", "1º Ciclo", "", "2º Ciclo", "", "", "","",""],
            ["", "", "Carregamento", "Descarregamento", "Carregamento", "Descarregamento", "", "","",""],
            ["0,00", "0,0", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00","",""],
            ["0,15", "1,5", "1,53", "1,52", "1,53", "1,52", "1,52", "-0,02","",""],
            ["0,49", "5,0", "5,07", "5,05", "5,07", "5,05", "5,06", "-0,06","",""],
            ["0,83", "8,5", "8,57", "8,57", "8,57", "8,56", "8,57", "-0,07","",""],
            ["1,18", "12,0", "12,10", "12,08", "12,10", "12,08", "12,09", "-0,09","",""],
            ["1,67", "17,0", "17,13", "17,10", "17,13", "17,10", "17,11", "-0,11","",""]
        ]


        self.sections = {
            "1 - CLIENTE: " + self.location["client"]["name"].value : {
                "Endereço:": " ".join ([self.location["street"].value, self.location["number"].value]),
                "Cidade:": " - ".join ([self.location["city"].value, self.location["state"].value]),
                "Telefone:": self.location["phone_number"].value,
                "Responsável:": self.location["supervisor"].value
            },
            "2 - IDENTIFICAÇÃO DO INSTRUMENTO:": {
                "Descrição:": data["equip"]["type"].value,
                "Identificação:": data["equip"]["identification"].value,
                "Nº de série": data["equip"]["serial_number"].value,
                "Fabricante:": data["equip"]["manufacturer"].value,
                "Faixa nominal:": "0~17 kgf/cm²",
                "Modelo:": data["equip"]["model"].value,
                "Resolução:": "0,5 kgf/cm²"
            },
            "3 - METODOLOGIA EMPREGADA NA CALIBRAÇÃO": {
                "Instrução de Calibração:": "I.RBC 012/07",
                "Descrição:": """A calibração foi realizada através do método comparativo (padrão e instrumento), utilizando-se de um sistema gerador de pressão/vácuo.
                            Foram definidos pontos de calibração ao longo da faixa de indicação do equipamento em teste (conforme Norma NBR 14105), sendo efetuadas 
                            as leituras das medidas no padrão em dois ciclos de Carregamento e Descarregamento (salvo solicitação do cliente). A incerteza expandida 
                            relatada é baseada em uma incerteza padronizada, combinada, multiplicada por um fator de abrangência k, para um nível de confiança 
                            de aproximadamente 95%. A incerteza padrão de medição foi determinada de acordo com a publicação EA-4/02."""
            },
            "4 - PADRÕES UTILIZADOS:": {
                "Nº de Controle": "MV.-1/40bar",
                "Certific. De Calibração nº:": "017309-21",
                "Orgão:": "PRESERTEC",
                "Validade:": data["expiration"].value
            },
            "5 - CONDIÇÕES AMBIENTAIS:": {
                "TEMPERATURA:": "23 ± 1 ºC",
                "UMIDADE RELATIVA:": "65 ± 3 u.r"
            },
            "6 - RESULTADOS:": {},
            "7 - CARACTERISTICAS METROLÓGICAS APRESENTADAS PELO INSTRUMENTO (%):": {
                "ERRO FIDUCIAL (INDICE DE CLASSE):": "± 0,75 %",
                "REPETITIVIDADE:": "± 0,02 %",
                "HISTERESE:": "± 0,18 %"
            },
            "8 - OBSERVAÇÕES:": {
                "Data da emissão do certificado:": "31/01/2023",
                "Descrição:": "Calibração realizada nas instalações do cliente.\n"
                            "Setor: Caldeira\n"
                            "A validade de calibração do instrumento deve ser estabelecida pelo usuário em plano de calibração descrito no sistema da qualidade.\n"
                            "Nota:\n"
                            "CERTIFICADO DE CALIBRAÇÃO\n"
                            "Nº: WY-300104-23\n"
                            "--\n"
                            "Incerteza de Medição - U\n"
                            "Alex Lopes Siqueira\n"
                            "Calibração - Valor de Referência ( kgf/cm² ) Média dos Ciclos\n"
                            "Local: Gerador de vapor da caldeira\n"
                            "1º Ciclo\n"
                            "2º Ciclo\n"
                            "Acreditado pelo CGCRE de acordo com a ABNT NBR ISO/IEC 17025 sob o nº 134\n"
                            "Supervisor Técnico:\n"
                            "Valor do Instrumento\n"
                            "Sistema Internacional\n"
                            "PRESERTEC - Serviços de Calibração Ltda.\n"
                            "Av. Gastão Vidigal Neto, 220 - Cidade Nova - Cep 12414-020\n"
                            "Fone: (12) 3642-8205 / 3642-2699 - Pindamonhangaba - SP - e-mail: presertec@presertec.com.br\n"
                            "C.N.P.J. 69 113 322/0001-43 Inscrição Estadual: 528.126.564.115"
            }
        }

