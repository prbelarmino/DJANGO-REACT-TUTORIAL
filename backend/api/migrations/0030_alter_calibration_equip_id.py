# Generated by Django 4.2.11 on 2024-05-29 11:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_alter_calibration_expiration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calibration',
            name='equip_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calibrations', to='api.equipment'),
        ),
    ]
