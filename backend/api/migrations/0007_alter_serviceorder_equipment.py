# Generated by Django 4.2.11 on 2024-04-06 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_serviceorder_equipment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceorder',
            name='equipment',
            field=models.CharField(max_length=30),
        ),
    ]
