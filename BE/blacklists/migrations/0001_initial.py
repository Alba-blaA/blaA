# Generated by Django 3.2.12 on 2022-08-10 01:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Blacklist',
            fields=[
                ('blacklist_pk', models.AutoField(primary_key=True, serialize=False)),
                ('black_content', models.CharField(max_length=50)),
                ('black_reason', models.CharField(max_length=20)),
                ('user_pk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_user_pk', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
