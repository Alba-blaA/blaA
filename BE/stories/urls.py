
from stories import views
from django.urls import path

app_name='stories'
urlpatterns=[
    path('',views.story_list_or_create),
    # path('<int:user_pk>/',views.LoginAPIView.as_view(),name='login'),
    path('<int:story_pk>/',views.story_detail_or_update_or_delete),
    path('comment/<int:story_pk>/',views.comment_list_or_create),
    path('comment/ud/<int:comment_pk>/',views.comment_update_or_delete),
    path('hashtag/<int:story_pk>/',views.hashtag_create),
    # path('<str:hashtag>/',views.follow),
    # path('like/<int:story_pk>', views.UserRetrieveUpdateDeleteAPIView.as_view()),
]