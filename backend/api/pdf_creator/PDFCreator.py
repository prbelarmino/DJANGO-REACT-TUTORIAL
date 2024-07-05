from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Flowable, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER
from .static_content import ReportContent
from .report_styles import *
from datetime import datetime

# Custom Flowable to draw a double line
class DoubleLine(Flowable):
    def __init__(self, width):
        super().__init__()
        self.width = width

    def draw(self):

        self.canv.setStrokeColor(colors.black)
        self.canv.setLineWidth(1.0)
        self.canv.line(0, 0, self.width, 0)
        self.canv.setLineWidth(1.0)
        self.canv.line(0, -2, self.width, -2)

    def  draw_logo(self):
        pass

class PDFCreator():

    def __init__(self,response,data):

        self.pdf = SimpleDocTemplate(response, pagesize=letter,
                        rightMargin=0.75*inch, leftMargin=0.75*inch,
                        topMargin=0.75*inch, bottomMargin=0.75*inch)
        self.content = ReportContent(data)
        self.header_table = Table(self.content.header_data, style=header_table_style,
                              hAlign='LEFT')
        self.elements = [self.header_table]
        
    def create(self):

        for header, content in self.content.sections.items():

            self.elements.append(Spacer(1, 0.05 * inch))
            self.elements.append(DoubleLine(width=self.pdf.width - 0.0 * inch))  # Adjust the width to match the content area
            self.elements.append(Paragraph(header, header_style))
            table_data = []

            if header[0] != "6":

                for key, value in content.items():
                    if "Descrição" in key and len(value) > 30:
       
                        line = f'{key} {value}'
                        self.elements.append(Paragraph(line,justify_style))
                    else:
                        table_data.append([key, value])

                content_table = Table(table_data, style=content_table_style,
                                    hAlign='LEFT', rowHeights=8,spaceBefore=2,
                                    colWidths=120)
                #content_table.setStyle(content_table_style)
                self.elements.append(content_table)

            else:
                table = Table(self.content.calib_data, style=table_style,
                                    hAlign='LEFT', rowHeights=10, spaceBefore=2,
                                    spaceAfter=10, colWidths=50)
                self.elements.append(table)
                self.elements.append(Spacer(1, 15))

                # Add signature and date at the bottom
        signature_text = "<b>Signature:</b> ___________________________<br/><br/><b>Date:</b> " + datetime.now().strftime("%Y-%m-%d")
        signature_paragraph = Paragraph(signature_text, signature_style)
        self.elements.append(signature_paragraph)
        self.pdf.build(self.elements)

