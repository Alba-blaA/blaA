from reviews import views
from django.urls import path,include


app_name='reviews'
urlpatterns=[
    path('store/',views.StoreListCreateAPIView.as_view(),name='store'),
    # path('search_store/',views.StoreListAPIView.as_view(),name='store_search'),
]