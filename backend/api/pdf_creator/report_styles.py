from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

styles = getSampleStyleSheet()
justify_style = ParagraphStyle(
    name='Justify',
    parent=styles['Normal'],
    leading=6,
    fontSize=6,
    alignment=4,  # 0=left, 1=center, 2=right, 3=justify
    spaceAfter=3,
    spaceBefore=2
)

header_style = ParagraphStyle(
    'Header',
    parent=styles['Heading1'],
    fontSize=8,
    leading=14,
    spaceAfter=0,
    spaceBefore=8,
    fontName='Helvetica-Bold'
)

title_style = ParagraphStyle(
    'Title',
    parent=styles['Title'],
    fontSize=14,
    leading=16,
    alignment=1,
    spaceAfter=12
)

calib_number_style = ParagraphStyle(
    'Title',
    parent=styles['Title'],
    fontSize=10,
    leading=16,
    alignment=1,
    spaceAfter=12
)
content_style = ParagraphStyle(
    'Content',
    parent=styles['Normal'],
    fontSize=6,
    leading=6,
    spaceAfter=2,
    spaceBefore=2
)

multiline_style = ParagraphStyle(
    name='Multiline',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=6,
    leading=8,  # Adjust this for line spacing
    spaceAfter=6,
    alignment=1,
)

signature_style = ParagraphStyle(
    name='Signature',
    parent=styles['Normal'],
    alignment=2,  # Right align for the signature
    fontSize=10,
)

header_table_style = [
    ('SPAN',(0,0),(0,1)), #(column,row)
    ('SPAN',(1,0),(2,0)), #(column,row)
    ('SPAN',(1,1),(2,1)), #(column,row)
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),  # Align values column left
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'), # Align all cells vertically middle
    #('TEXTCOLOR', (0, 0), (-1, -1), (0, 0, 0)),  # Black text color
    #('GRID', (0, 0), (-1, -1), 0.5, (1, 1, 1)),  # Remove all grid lines
    #('GRID', (0, 0), (-1, -1), 1, colors.black),
    ('FONTSIZE', (0, 0), (-1, -1), 6),  # Font size
    #('LEFTPADDING', (0, 0), (-1, -1), 0),

]

content_table_style = [
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),  # Align values column left
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'), # Align all cells vertically middle
    ('TEXTCOLOR', (0, 0), (-1, -1), (0, 0, 0)),  # Black text color
    #('GRID', (0, 0), (-1, -1), 0.5, (1, 1, 1)),  # Remove all grid lines
    #('GRID', (0, 0), (-1, -1), 1, colors.black),
    ('FONTSIZE', (0, 0), (-1, -1), 6),  # Font size
    ('LEFTPADDING', (0, 0), (-1, -1), 0),

]

table_style = [
    ('SPAN',(0,0),(0,2)), #(column,row)
    ('SPAN',(1,0),(1,2)),
    ('SPAN', (2, 0), (5, 0)),
    ('SPAN', (2, 1), (3, 1)),
    ('SPAN', (4, 1), (5, 1)),
    ('SPAN', (6, 0), (6, 2)),
    ('SPAN', (7, 0), (7, 2)),
    ('SPAN', (8, 0), (8, 2)),
    ('SPAN', (9, 0), (9, 2)),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # Align values column left
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'), # Align all cells vertically middle
    ('TEXTCOLOR', (0, 0), (-1, -1), (0, 0, 0)),  # Black text color
    #('GRID', (0, 0), (-1, -1), 0.5, (1, 1, 1)),  # Remove all grid lines
    ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ('FONTSIZE', (0, 0), (-1, -1), 6),  # Font size
    ('TOPPADDING', (0, 3), (-1, -1), 8),
    ('TOPPADDING', (2, 0), (5, 2), 8)
    #('LEFTPADDING', (0, 0), (-1, -1), 0),

]
[


]