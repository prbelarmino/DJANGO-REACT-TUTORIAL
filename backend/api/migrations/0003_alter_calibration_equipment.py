# Generated by Django 4.2.11 on 2024-04-06 22:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_equipment_serviceorder_calibration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calibration',
            name='equipment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calibration', to=settings.AUTH_USER_MODEL),
        ),
    ]