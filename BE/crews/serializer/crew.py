from rest_framework import serializers
from accounts.models import User

from crews.models import Crew, CrewInvite


class CrewCreateSerializer(serializers.ModelSerializer) :

    class Meta: 
        model = Crew
        fields= ('crew_pk','crew_leader','is_business','crew_name','crew_img','crew_explain','crew_region')
        read_only_fields = ('crew_leader',)



class CrewListSerializer(serializers.ModelSerializer) :
    crew_member_count = serializers.IntegerField(source='crew_member.count', read_only=True)
    crew_leader = serializers.CharField(source='crew_leader.nickname')
    class Meta: 
        model = Crew
        fields= ('crew_pk','crew_leader','is_business','crew_name','crew_img','crew_member_count')


class CrewSerializer(serializers.ModelSerializer) :
    crew_member_count = serializers.IntegerField(source='crew_member.count', read_only=True)
    crew_leader = serializers.CharField(source='crew_leader.nickname')
    class Meta: 
        model = Crew
        fields= ('crew_pk','crew_name','crew_leader','crew_explain','crew_region','crew_img','crew_member_count','created_at')

class CrewInviteListSerializer(serializers.ModelSerializer) :
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    category = serializers.CharField(source='user.category', read_only=True)
    image = serializers.ImageField(source='user.image', read_only=True)
    class Meta: 
        model = CrewInvite
        fields= '__all__'
        read_only_fields = ('crew','user')

class UserInviteListSerializer(serializers.ModelSerializer) :
    crew_name = serializers.CharField(source='crew.crew_name', read_only=True)
    crew_member_count = serializers.IntegerField(source='crew.crew_member.count', read_only=True)
    image = serializers.ImageField(source='crew.crew_img', read_only=True)
    class Meta: 
        model = CrewInvite
        fields= '__all__'
        read_only_fields = ('crew','user')

class CrewUserListSerializer(serializers.ModelSerializer) :
    # crew_member_count = serializers.IntegerField(source='crew.crew_member.count', read_only=True)
    # nickname = serializers.CharField(source='crew.crew_member.nickname', read_only=True)
    # image = serializers.ImageField(source='crew.crew_member.image', read_only=True)
    class Meta: 
        model = User
        fields= ('user_pk','nickname','image')
        # read_only_fields = ('crew','user')

