from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListCreateAPIView,ListAPIView,CreateAPIView
from rest_framework.response import Response
from reviews.models import ButtonReview, Store,Review, StoreButtonReview
from reviews.serializers.review import ReviewListCreateSerializer, ReviewShortListSerializer
from reviews.serializers.store import StoreListCreateSerializer
from rest_framework import filters
from django.http import Http404

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


class StoreReviewListCreateAPIView(ListCreateAPIView) :
    # authentication_classes=[]
    serializer_class = ReviewListCreateSerializer
    queryset = Review.objects.all()

    def get_object(self, store_pk):
        try:
            return Store.objects.get(pk=store_pk)
        except Store.DoesNotExist:
            raise Http404

    def review_store(self,store_pk,review_pk,chosen_button) :
        store = get_object_or_404(Store,store_pk=store_pk)
        review = get_object_or_404(Review,review_pk=review_pk)
        # all_button = [i for i in range(1,7)]
        # for choice in all_button :
        #     btn = get_object_or_404(ButtonReview,pk=choice)
        #     if store.button.filter(pk=choice).exists() :
        #         store.button.remove(btn)
        #     else :
        #         continue
        for choice in chosen_button :
            choice = int(choice)
            btn = get_object_or_404(ButtonReview,pk=choice)
            StoreButtonReview.objects.create(store=store,button=btn,review=review)
    def list(self, request,store_pk):
        queryset = Review.objects.filter(store=self.get_object(store_pk))
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
