# Generated by Django 3.1.6 on 2021-04-08 02:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210408_0838'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('user', 'subscriber')},
        ),
    ]
