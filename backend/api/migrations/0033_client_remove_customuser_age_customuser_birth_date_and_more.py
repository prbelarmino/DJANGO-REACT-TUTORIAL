# Generated by Django 4.2.11 on 2024-06-29 06:48

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_alter_equipment_added_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('cnpj', models.CharField(max_length=30)),
                ('contract_number', models.CharField(max_length=30)),
            ],
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='age',
        ),
        migrations.AddField(
            model_name='customuser',
            name='birth_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 6, 29, 6, 48, 55, 608148)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='serviceorder',
            name='created_at',
            field=models.DateTimeField(),
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('supervisor', models.CharField(max_length=30)),
                ('phone_number', models.CharField(max_length=30)),
                ('street', models.CharField(max_length=30)),
                ('number', models.CharField(max_length=30)),
                ('neighborhood', models.CharField(max_length=30)),
                ('cep', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=30)),
                ('state', models.CharField(max_length=30)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='location', to='api.client')),
            ],
        ),
        migrations.AlterField(
            model_name='equipment',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='equipment', to='api.location'),
        ),
    ]