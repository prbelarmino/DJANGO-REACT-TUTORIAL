# Generated by Django 4.2.11 on 2024-04-07 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_remove_calibration_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='calibration',
            name='requester',
            field=models.CharField(default=0, max_length=30),
            preserve_default=False,
        ),
    ]