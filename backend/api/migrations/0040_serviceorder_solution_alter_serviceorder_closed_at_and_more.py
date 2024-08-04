# Generated by Django 4.2.11 on 2024-07-05 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0039_alter_serviceorder_closed_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='serviceorder',
            name='solution',
            field=models.TextField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='serviceorder',
            name='closed_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='serviceorder',
            name='executor',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]