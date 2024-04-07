from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("equipments/", views.EquipmentListCreate.as_view(), name="equipment-list"),
    path("equipments/delete/<int:pk>/", views.EquipmentDelete.as_view(), name="delete-equipment"),
    path("serviceorders/", views.ServiceOrderListCreate.as_view(), name="serviceorder-list"),
    path("serviceorders/delete/<int:pk>/", views.ServiceOrderDelete.as_view(), name="delete-serviceorder"),
    path("calibrations/", views.CalibrationListCreate.as_view(), name="calibration-list"),
    path("calibrations/delete/<int:pk>/", views.CalibrationDelete.as_view(), name="delete-calibration"),
]