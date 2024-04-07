from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *

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
        field = self.request.query_params.get('field')
        value = self.request.query_params.get('value')
        if field and value:
            queryset = queryset.filter(**{field: value})
        
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
        field = self.request.query_params.get('field')
        value = self.request.query_params.get('value')
        if field and value:
            queryset = queryset.filter(**{field: value})
        
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

class CreateUserView(generics.CreateAPIView):
    #List of all objects that it will be looked at when a new is being 
    # created to prevent creating an user that already exists
    queryset = User.objects.all() 
    serializer_class = UserSerializer #Specify the data type that the view uses
    permission_classes = [AllowAny] #Set any one can request this view if it is not authenticated
