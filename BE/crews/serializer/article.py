from rest_framework import serializers

from crews.models import Crew,CrewArticle,CrewArticleImage

class CrewSerializerForArticle(serializers.ModelSerializer) :
    class Meta: 
        model = Crew
        fields= ('crew_pk',)


class ArticleImageSerializer(serializers.ModelSerializer):
   class Meta:
      model = CrewArticleImage
      fields = ['article_image_pk','article_picture']


class CrewArticleSerializer(serializers.ModelSerializer) :
    # crew_pk = CrewSerializerForArticle()
    images = serializers.SerializerMethodField()
    def get_images(self, obj):
        image = obj.crewarticleimage_set.all()
        return ArticleImageSerializer(instance=image, many=True).data


    class Meta: 
        model = CrewArticle
        fields = '__all__'
        read_only_fields = ('crew','user','images')


    def create(self,validated_data) :
        images_data = self.context['request'].FILES 
        print(images_data)
        article = CrewArticle.objects.create(**validated_data)
        for image_data in images_data.getlist('images'):
            CrewArticleImage.objects.create(article=article, article_picture=image_data)
        return article