from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ["id","name","cnpj", "contract_number"]

class BasicLocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ["id","name"]

class LocationSerializer(serializers.ModelSerializer):

    client = ClientSerializer(many=False)
    class Meta:
        model = Location
        fields = ["id","name", "supervisor", "phone_number", "street", "number", "neighborhood", "cep", "city", "state", "client"]

class UserSerializer(serializers.ModelSerializer):
    #Meta class define how the class behave
    class Meta:
        model = CustomUser
        fields = ["id","first_name", "last_name", "email", "function", "phone_number", 
                  "matriculation", "birth_date", "location","date_joined", "username", "password"]
        #Only allow write the password but it cannot be requested
        extra_kwargs = {"username": {"write_only": True}, "password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = CustomUser.objects.create_user(**validated_data)
        return user

class BasicUserSerializer(serializers.ModelSerializer):

    fullname = serializers.SerializerMethodField('get_fullname')
    def get_fullname(self, obj):

        return f"{obj.first_name} {obj.last_name}"
    
    class Meta:
        model = CustomUser
        fields = ["id","fullname","function"]


class UpdateEquipmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Equipment
        fields = ["id", "type", "state", "owner", "model", "manufacturer", 
                  "identification", "serial_number"]
        
class EquipmentSerializer(serializers.ModelSerializer):

    added_by = serializers.StringRelatedField()
    owner  = BasicLocationSerializer()
    class Meta:
        model = Equipment
        fields = ["id", "type", "state", "owner", "model", "manufacturer", 
                  "identification", "serial_number","created_at", "added_by"]
        #extra_kwargs = {"added_by": {"read_only": True}}

class EquipmentDetailSerializer(serializers.ModelSerializer):

    added_by = serializers.StringRelatedField()
    owner = serializers.StringRelatedField()
    #calibrations = CalibrationSerializer(read_only=True)
    #orders = ServiceOrderSerializer(read_only=True)
    class Meta:
        model = Equipment
        fields = ["id", "type", "state", "owner", "model", "manufacturer", 
                  "identification", "serial_number","created_at", "added_by"]
        
class FullEquipmentSerializer(serializers.ModelSerializer):

    added_by = UserSerializer(many=False)
    owner = LocationSerializer(many=False)
    class Meta:
        model = Equipment
        fields = ["id", "type", "state", "owner", "model", "manufacturer", 
                  "identification", "serial_number","created_at", "added_by"]
               
class ServiceOrderSerializer(serializers.ModelSerializer):
    # It takes too long to respond, it leads to gateway error 504 
    #equip = serializers.StringRelatedField()
    class Meta:
        model = ServiceOrder
        fields = ["id", "number", "state", "requester", "executor", "service_type", 
                  "closed_at","priority","title", "issue_description", "solution", "created_at", "equip"]
        #extra_kwargs = {"equip_id": {"read_only": True}}

class FullServiceOrderSerializer(serializers.ModelSerializer):
    # It takes too long to respond, it leads to gateway error 504 
    equip = FullEquipmentSerializer(many=False)
    class Meta:
        model = ServiceOrder
        fields = ["id", "number", "state", "requester", "executor", "service_type", 
                  "closed_at","priority","title", "issue_description", "solution", "created_at", "equip"]
        #extra_kwargs = {"equip_id": {"read_only": True}}

# class LocationStatsSerializer(serializers.Serializer):
    
#     owner = serializers.CharField()
#     total = serializers.IntegerField()
#     closed = serializers.IntegerField()

#     def to_representation(self, instance):
#         """
#         Convert the queryset instance to the desired format.
#         """
#         representation = super().to_representation(instance)
#         owner = representation.pop('owner')
#         return {representation}

class CalibrationSerializer(serializers.ModelSerializer):
    equip = serializers.StringRelatedField()
    class Meta:
        model = Calibration
        fields = ["id","number","requester", "executor", "expiration", "created_at", "equip"]
        #extra_kwargs = {"equip_id": {"read_only": True}}

class FullCalibrationSerializer(serializers.ModelSerializer):
    equip = FullEquipmentSerializer(many=False)
    class Meta:
        model = Calibration
        fields = ["id","number","requester", "executor", "expiration", "created_at", "equip"]
        #extra_kwargs = {"equip_id": {"read_only": True}}

class EquipmentDetailSerializer(serializers.ModelSerializer):

    added_by = serializers.StringRelatedField()
    owner = serializers.StringRelatedField()
    #calibrations = CalibrationSerializer(read_only=True)
    #orders = ServiceOrderSerializer(read_only=True)
    class Meta:
        model = Equipment
        fields = ["id", "type", "state", "owner", "model", "manufacturer", 
                  "identification", "serial_number","created_at", "added_by"]