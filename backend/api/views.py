from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from django.http import HttpResponse
#from .generate_dummy_data import generate_dummy_data
# views.py
import pandas as pd
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Equipment
import pandas as pd

class UploadFile(APIView):
    def post(self, request, format=None):
        file = request.FILES['file']
        expected_columns = [
                'Tipo', 'Estado', 'Proprietario', 'Modelo', 'Fabricante',
                'Indetificação', 'Numero de Serie'
            ]
        try:
            if file.name.endswith('.csv'):
                df = pd.read_csv(file)
            elif file.name.endswith('.xlsx'):
                df = pd.read_excel(file)
            else:
                return Response({'error': 'Unsupported file format'}, status=status.HTTP_400_BAD_REQUEST)

            if not all(col in df.columns for col in expected_columns):
                return Response({'error': 'Invalid file format. Header does not match expected columns'}, status=status.HTTP_400_BAD_REQUEST)

            for index, row in df.iterrows():
                if Equipment.objects.filter(serial_number=row['Numero de Serie']).exists():
                    return Response({'error': 'Serial number must be unique'}, status=status.HTTP_400_BAD_REQUEST)
               
                else:

                    Equipment.objects.create(
                        type=row['Tipo'],
                        state=row['Estado'],
                        owner=row['Proprietario'],
                        model=row['Modelo'],
                        manufacturer=row['Fabricante'],
                        identification=row['Indetificação'],
                        serial_number=row['Numero de Serie'],
                        added_by=request.user  # Assuming user is authenticated
                    )

            return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EquipmentListCreate(generics.ListCreateAPIView):

    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        queryset = Equipment.objects.all()
        field = self.request.query_params.get('field')
        value = self.request.query_params.get('value')
        if field and value:
            queryset = queryset.filter(**{field: value})
        
        return queryset
    
    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
        else:
            print(serializer.errors)

class EquipmentDelete(generics.DestroyAPIView):
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Equipment.objects
    
class EquipmentUpdate(generics.UpdateAPIView):

    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

class ServiceOrderListCreate(generics.ListCreateAPIView):

    serializer_class = ServiceOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        queryset = ServiceOrder.objects.all()
        #field = self.request.query_params.get('field')
        #value = self.request.query_params.get('value')
        id = self.request.query_params.get('equip_id')
        # field_name = list(self.request.query_params.keys())[0]
        # value = self.request.query_params.get(field_name)
        # print(field_name,value)
        
        if id:
            queryset = queryset.filter(**{"equip_id": id})
        
        return queryset
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class ServiceOrderDelete(generics.DestroyAPIView):
    serializer_class = ServiceOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return ServiceOrder.objects

class CalibrationListCreate(generics.ListCreateAPIView):

    serializer_class = CalibrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        queryset = Calibration.objects.all()
        # field = self.request.query_params.get('field')
        # value = self.request.query_params.get('value')
        id = self.request.query_params.get('equip_id')

        if id:
            queryset = queryset.filter(**{"equip_id": id})
        
        return queryset
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class CalibrationDelete(generics.DestroyAPIView):
    serializer_class = CalibrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Calibration.objects
      
class CreateUserView(generics.ListCreateAPIView):
    #List of all objects that it will be looked at when a new is being 
    # created to prevent creating an user that already exists
    queryset = CustomUser.objects.all() 
    serializer_class = UserSerializer #Specify the data type that the view uses
    permission_classes = [AllowAny] #Set any one can request this view if it is not authenticated
    def get_queryset(self):
                
        queryset = CustomUser.objects.all()
        field = self.request.query_params.get('field')
        value = self.request.query_params.get('value')
        if field and value:
            queryset = queryset.filter(**{field: value})

        return queryset
    
def generate_pdf(request, equipment_id):
    try:
        # Get the equipment instance with the specified ID
        calibration_instance = Calibration.objects.get(pk=equipment_id)
    except Calibration.DoesNotExist:
        return HttpResponse("Equipment not found", status=404)

    # Serialize the equipment instance
    calibration_serializer = CalibrationSerializer(calibration_instance)
    
    # Create response object
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{equipment_id}_invoice.pdf"'

    # Create PDF document
    doc = SimpleDocTemplate(response, pagesize=letter)
    elements = []
    
    # Add table with equipment data to PDF
    data = list(calibration_serializer.data.items())
    table = Table(data)
    table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                               ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                               ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                               ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                               ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                               ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                               ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(table)

    # Build PDF document
    doc.build(elements)

    return response