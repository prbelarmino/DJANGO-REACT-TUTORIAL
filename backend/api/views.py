from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from django.http import HttpResponse
from django.db.models import Count, Q
#from .generate_dummy_data import generate_dummy_data
# views.py
import pandas as pd
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from django.core.mail import send_mail
from .pdf_creator.PDFCreator import PDFCreator

class UploadFile(APIView):
    def post(self, request, format=None):
        file = request.FILES['file']
        expected_columns = [
                'Tipo', 'Estado', 'Proprietário', 'Modelo', 'Fabricante',
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

                    owner = Location.objects.get(name=row['Proprietário'])
                    user = CustomUser.objects.get(id=self.request.user.id)
                    Equipment.objects.create(
                        type=row['Tipo'],
                        state=row['Estado'],
                        owner=owner,
                        model=row['Modelo'],
                        manufacturer=row['Fabricante'],
                        identification=row['Indetificação'],
                        serial_number=row['Numero de Serie'],
                        added_by=user  # Assuming user is authenticated
                    )

            return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EquipmentList(generics.ListAPIView):  

    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        #queryset = Equipment.objects.all()
        queryset = Equipment.objects.select_related('added_by').all()
        field = self.request.query_params.get('field')
        value = self.request.query_params.get('value')

        if field and value:
            queryset = queryset.filter(**{field: value})
        
        return queryset
    
class EquipmentCreate(generics.CreateAPIView):

    serializer_class = UpdateEquipmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        if serializer.is_valid():
            
            queryset = CustomUser.objects.get(id=self.request.user.id)
            serializer.save(added_by=queryset)
            send_mail(
            'New Model Created',
            'A new instance of YourModel was created.',
            'rccliniceng@gmail.com',
            [queryset.email],
            fail_silently=False,
            )
        else:
            print(serializer.errors)

class EquipmentUpdate(generics.UpdateAPIView):

    queryset = Equipment.objects.all()
    serializer_class = UpdateEquipmentSerializer
    permission_classes = [IsAuthenticated]

class EquipmentRetrieve(generics.RetrieveAPIView):

    queryset = Equipment.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EquipmentSerializer
    lookup_field = 'id'  # This assumes the primary key is 'id'      

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
        id = self.request.query_params.get('equip_id')

        if id:
            queryset = queryset.filter(**{"equip": id})
        
        return queryset
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class FullServiceOrderList(generics.RetrieveAPIView):

    queryset = ServiceOrder.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = FullServiceOrderSerializer
    lookup_field = 'id'  # This assumes the primary key is 'id'

class ServiceOrderUpdate(generics.UpdateAPIView):

    queryset = ServiceOrder.objects.all()
    serializer_class = ServiceOrderSerializer
    permission_classes = [IsAuthenticated]
    
class ServiceOrderDelete(generics.DestroyAPIView):
    serializer_class = ServiceOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return ServiceOrder.objects

class ServiceOrderRetrieve(generics.RetrieveAPIView):

    queryset = ServiceOrder.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ServiceOrderSerializer
    lookup_field = 'id'  # This assumes the primary key is 'id'      

class ServiceOrderStats(APIView):

    def get(self, request):
        state_condition = "FECHADA"

        # Query the database
        results = (
            ServiceOrder.objects.values('equip__owner__name')
            .annotate(
                total=Count('id'),
                closed=Count('id', filter=Q(state=state_condition))
            )
        )
        response = []
        for result in results:
            response.append({"owner": result["equip__owner__name"], 
                             "total": result["total"],
                             "OS Fechadas": result["closed"],
                             "OS Abertas": result["total"] - result["closed"]})
        
        # Use the serializer to format the data
        #serializer = LocationStatsSerializer(results, many=True)
        # print(serializer)
        return Response(response)
    
class CalibrationListCreate(generics.ListCreateAPIView):

    serializer_class = CalibrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        #queryset = Calibration.objects.all()
        queryset = Calibration.objects.select_related('equip').all()
        # field = self.request.query_params.get('field')
        # value = self.request.query_params.get('value')
        
        id = self.request.query_params.get('equip_id')
        if id:
            
            #print(queryset.first().equip.id)
            queryset = queryset.filter(**{"equip": id})
            
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
        print(self.request.query_params)
        field = self.request.query_params.get('field')
        value = self.request.query_params.get('value')
        if field and value:
            queryset = queryset.filter(**{field: value})

        return queryset

class TeamListView(generics.ListAPIView):
    #List of all objects that it will be looked at when a new is being 
    # created to prevent creating an user that already exists
    
    serializer_class = BasicUserSerializer #Specify the data type that the view uses
    permission_classes = [IsAuthenticated] #Set any one can request this view if it is not authenticated
    def get_queryset(self):
        
        queryset = CustomUser.objects.all() 
        print(self.request.query_params)
        function = self.request.query_params.get('func')
        
        if function:

            queryset = queryset.filter(**{"function": function})
            
        return queryset
    
def generate_pdf(request, equipment_id):

    try:
        # Get the equipment instance with the specified ID
        calibration_instance = Calibration.objects.get(pk=equipment_id)
    except Calibration.DoesNotExist:
        return HttpResponse("Equipment not found", status=404)

    # Serialize the equipment instance
    calibration_serializer = FullCalibrationSerializer(calibration_instance)
    
    # Create response object
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{equipment_id}_invoice.pdf"'
    calib_pdf = PDFCreator(response=response, data = calibration_serializer)
    calib_pdf.create()
    
    return response

class ClientListCreate(generics.ListCreateAPIView):

    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        queryset = Client.objects.all()
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
        
class ClientDelete(generics.DestroyAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Client.objects
    
class LocationListCreate(generics.ListCreateAPIView):

    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        #queryset = Equipment.objects.all()
        queryset = Location.objects.select_related('client').all()
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

class BasicLocationList(generics.ListAPIView):

    queryset = Location.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = BasicLocationSerializer

class LocationDelete(generics.DestroyAPIView):
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Location.objects
    
