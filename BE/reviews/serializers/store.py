from rest_framework import serializers
from reviews.models import Review
from reviews.models import Store
from django.db.models import Sum
class StoreListSerializer(serializers.ModelSerializer) :
    star = serializers.SerializerMethodField()
    button = serializers.SerializerMethodField()

    def get_star(self,obj) :
        cnt = obj.review.count()
        if cnt :
            review = Review.objects.filter(store=obj).aggregate(Sum('star'))

            return round(review['star__sum']/cnt,1)
        else :
            return 0
    
    def get_button(self,obj) :
        cnt = obj.review.count()
        tmp = {'친절한 사장님': 0,'깨끗한 매장':0 ,'좋은 분위기':0,'교통 접근성':0,'칼퇴근 가능':0,'유니폼 제공':0}
        if cnt :
            for button_review in obj.storebuttonreview_set.all() :
                tmp[button_review.button.type] += 1 

            for btn in tmp :
                tmp[btn] = int(round(tmp[btn]/cnt,2)*100)
        return tmp

    class Meta : 
        model = Store
        fields = '__all__'

class StoreNoneImageCreateSerializer(serializers.ModelSerializer) :

    class Meta : 
        model = Store
        fields = '__all__'

class StoryCreateSerializer(serializers.ModelSerializer) :
    class Meta : 
        model = Store
        fields = ('store_pk','name','image','region')