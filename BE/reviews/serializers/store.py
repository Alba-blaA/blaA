from rest_framework import serializers
from reviews.models import Store

class StoreListCreateSerializer(serializers.ModelSerializer) :

    class Meta : 
        model = Store
        fields = '__all__'
