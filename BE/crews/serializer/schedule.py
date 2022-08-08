from rest_framework import serializers

from crews.models import CrewSchedule

class CrewScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrewSchedule
        fields = ('user', 'crew_day', 'color', 'crew_starthour','crew_endhour')
        read_only_fields = ('crew',)