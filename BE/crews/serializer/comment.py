from rest_framework import serializers

from crews.models import Crew,CrewArticle,CrewArticleImage,CrewArticleComment

class CrewCommentSerializer(serializers.ModelSerializer) :
    class Meta: 
        model = CrewArticleComment
        fields= '__all__'
        read_only_fields = ('crew','article','user')
