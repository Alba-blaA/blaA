from rest_framework import serializers
from reviews.models import Review, Store
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields= ('nickname',)


class StoreListCreateSerializer(serializers.ModelSerializer) :

    class Meta : 
        model = Store
        fields = '__all__'

class ReviewListCreateSerializer(serializers.ModelSerializer) :


    class Meta: 
        model = Review
        fields = '__all__'
        read_only_fields = ('user','store','like_users')

class ReviewShortListSerializer(serializers.ModelSerializer) :

    user = UserSerializer()
    like_user_count = serializers.IntegerField(source='like_users.count', read_only=True)
    class Meta: 
        model = Review
        fields = ('user','oneline_review','created_at','like_user_count')