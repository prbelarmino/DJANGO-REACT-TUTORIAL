# Generated by Django 4.2.11 on 2024-04-07 02:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_calibration_equipment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='calibration',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='calibration',
            name='equipment',
        ),
        migrations.RemoveField(
            model_name='calibration',
            name='executor',
        ),
        migrations.RemoveField(
            model_name='calibration',
            name='expiration',
        ),
        migrations.RemoveField(
            model_name='calibration',
            name='requester',
        ),
        migrations.RemoveField(
            model_name='calibration',
            name='service_type',
        ),
    ]
