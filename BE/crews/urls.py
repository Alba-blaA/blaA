from crews import views
from django.urls import path

app_name='crews'
urlpatterns=[
    path('',views.CrewListCreateAPIView.as_view(),name='crew'),
    path('<int:crew_pk>',views.CrewRetriveUpdateDeleteView.as_view(),name='crew_detail'),
] 