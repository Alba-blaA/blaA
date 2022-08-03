from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListCreateAPIView,ListAPIView,CreateAPIView
from rest_framework.response import Response
from reviews.models import ButtonReview, Store,Review, StoreButtonReview
from reviews.serializers.review import ReviewListCreateSerializer, ReviewShortListSerializer
from reviews.serializers.store import StoreListCreateSerializer
from rest_framework import filters
from django.http import Http404
from rest_framework.decorators import api_view
from django.db.models import Count 
#리뷰를 작성할 가게 검색 or 가게 추가
class StoreListCreateAPIView(ListCreateAPIView):
    #요청한 user_pk로 유저 조회 
    authentication_classes=[]
    serializer_class = StoreListCreateSerializer
    filter_backends = [filters.SearchFilter]
    queryset=Store.objects.all()
    search_fields = ['name']


class ReviewListAPIView(ListAPIView) :
    authentication_classes=[]
    serializer_class = ReviewListCreateSerializer
    filter_backends = [filters.SearchFilter]
    queryset = Review.objects.all()


#가게에 달린 리뷰 전체조회 및 리뷰 생성
class StoreReviewListCreateAPIView(ListCreateAPIView) :
    authentication_classes=[]
    serializer_class = ReviewListCreateSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ['review_pk','created_at','like_users']


    queryset = Review.objects.all()

    def get_object(self, store_pk):
        try:
            return Store.objects.get(pk=store_pk)
        except Store.DoesNotExist:
            raise Http404

    def review_store(self,store_pk,review_pk,chosen_button) :
        store = get_object_or_404(Store,store_pk=store_pk)
        review = get_object_or_404(Review,review_pk=review_pk)
        for choice in chosen_button :
            choice = int(choice)
            btn = get_object_or_404(ButtonReview,pk=choice)
            StoreButtonReview.objects.create(store=store,button=btn,review=review)

    def list(self, request,store_pk):
        # print(request.query_params['ordering'])
        queryset = self.filter_queryset(Review.objects.filter(store=self.get_object(store_pk)))
        queryset = queryset.annotate(like_user_count=Count('like_users'))
        if request.query_params :
            if request.query_params['ordering'] == '-like_user_count':
                queryset = queryset.order_by('-like_user_count')
            elif request.query_params['ordering'] == 'like_user_count' :
                queryset = queryset.order_by('like_user_count')
        serializer = ReviewShortListSerializer(queryset,many=True)
        return Response(serializer.data)

    def create(self,request,store_pk) : 
        # chosen_button = request.data.pop('chosen_button')
        # print(chosen_button)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer,store_pk)
        headers = self.get_success_headers(serializer.data)
        review_pk = serializer.data['review_pk']
        chosen_button = request.data.pop('chosen_button')
        self.review_store(store_pk,review_pk,chosen_button)
        # print(type(serializer.data))
        update_data = {'chosen_button' : chosen_button}
        update_data.update(serializer.data)
        return Response(update_data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer,store_pk):
        return serializer.save(user=self.request.user,store=self.get_object(store_pk))

@api_view(['POST'])
def review_like(request,review_pk) :
    review = get_object_or_404(Review,review_pk=review_pk)
    user = request.user 
    
    if review.like_users.filter(pk=user.user_pk).exists() :
        review.like_users.remove(user)
        serializer = ReviewShortListSerializer(review)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
    else :
        review.like_users.add(user)
        serializer = ReviewShortListSerializer(review)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
