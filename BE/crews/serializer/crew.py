from rest_framework import serializers

from crews.models import Crew


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
    # crew_leader = serializers.CharField(source='crew_leader.nickname')
    class Meta: 
        model = Crew
        fields= ('crew_pk','crew_name','crew_explain','crew_region','crew_img','crew_member_count')