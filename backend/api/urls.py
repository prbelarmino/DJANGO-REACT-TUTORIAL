from django.urls import path
from . import views

urlpatterns = [
    path("team/", views.TeamListView.as_view(), name="team-list"),
    path("equipments/create/", views.EquipmentCreate.as_view(), name="equipment-create"),
    path("equipments/list/", views.EquipmentList.as_view(), name="equipment-list"),
    path("equipments/update/<int:pk>/", views.EquipmentUpdate.as_view(), name="equipment-edit"),
    path("equipments/retrieve/<int:id>/", views.EquipmentRetrieve.as_view(), name="equipment-retrieve"),
    path("equipments/delete/<int:pk>/", views.EquipmentDelete.as_view(), name="delete-equipment"),
    path("serviceorders/", views.ServiceOrderListCreate.as_view(), name="serviceorder-list"),
    path("serviceorders/<int:pk>/", views.ServiceOrderUpdate.as_view(), name="edit-serviceorder"),
    path("fullserviceorder/<int:id>/", views.FullServiceOrderList.as_view(), name="full-serviceorder"),
    path("serviceorders/delete/<int:pk>/", views.ServiceOrderDelete.as_view(), name="delete-serviceorder"),
     path("serviceorders/retrieve/<int:id>/", views.ServiceOrderRetrieve.as_view(), name="serviceorder-retrieve"),
    path("calibrations/", views.CalibrationListCreate.as_view(), name="calibration-list"),
    path("calibrations/delete/<int:pk>/", views.CalibrationDelete.as_view(), name="delete-calibration"),
    path('calibrations/<int:equipment_id>/generate-pdf/', views.generate_pdf, name='generate_pdf'),
    path("clients/", views.ClientListCreate.as_view(), name="client-list"),
    path("clients/delete/<int:pk>/", views.ClientDelete.as_view(), name="delete-client"),
    path("basiclocations/", views.BasicLocationList.as_view(), name="location-list"),
    path("locations/", views.LocationListCreate.as_view(), name="location-list"),
    path("locations/delete/<int:pk>/", views.LocationDelete.as_view(), name="delete-location"),
    path('upload/', views.UploadFile.as_view(), name='upload_file'),
]