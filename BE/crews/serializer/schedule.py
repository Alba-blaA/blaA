from rest_framework import serializers

from crews.models import CrewSchedule

class CrewScheduleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrewSchedule
        fields = ('user', 'crew_day', 'color', 'crew_starthour','crew_endhour')
        read_only_fields = ('crew',)


class CrewScheduleSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source='user.image')
    nickname = serializers.ImageField(source='user.nickname')
    class Meta:
        model = CrewSchedule
        fields = ('user','image', 'nickname','crew_day', 'color', 'crew_starthour','crew_endhour')
        read_only_fields = ('crew','image','nickname')