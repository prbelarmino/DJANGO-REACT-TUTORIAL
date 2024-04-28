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
from rest_framework.response import Response
from rest_framework.views import APIView
#from .generate_dummy_data import generate_dummy_data
        
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
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class EquipmentDelete(generics.DestroyAPIView):
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Equipment.objects

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
      
class NoteListCreate(generics.ListCreateAPIView):

    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        #Only gets Notes created by the user
        #user = self.request.user
        #return Note.objects.filter(author=user)
        return Note.objects
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

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