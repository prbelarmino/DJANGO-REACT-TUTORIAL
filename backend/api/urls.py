from django.urls import path
from . import views

urlpatterns = [
    path("equipments/", views.EquipmentListCreate.as_view(), name="equipment-list"),
    path("equipments/delete/<int:pk>/", views.EquipmentDelete.as_view(), name="delete-equipment"),
    path("equipments/<int:pk>/", views.EquipmentUpdate.as_view(), name="edit-equipment"),
    path("serviceorders/", views.ServiceOrderListCreate.as_view(), name="serviceorder-list"),
    path("serviceorders/delete/<int:pk>/", views.ServiceOrderDelete.as_view(), name="delete-serviceorder"),
    path("calibrations/", views.CalibrationListCreate.as_view(), name="calibration-list"),
    path("calibrations/delete/<int:pk>/", views.CalibrationDelete.as_view(), name="delete-calibration"),
    path('calibrations/<int:equipment_id>/generate-pdf/', views.generate_pdf, name='generate_pdf'),
    path('upload/', views.UploadFile.as_view(), name='upload_file'),
]