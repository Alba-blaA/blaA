from crews import views
from django.urls import path

app_name='crews'
urlpatterns=[
    path('',views.CrewListCreateAPIView.as_view(),name='crew'),
    path('<int:crew_pk>/',views.CrewRetriveUpdateDeleteView.as_view(),name='crew_detail'),
    path('article/<int:crew_id>/',views.CrewArticleListCreateAPIView.as_view(),name='crew_article'),
    path('article/edit/<int:crew_article_pk>/',views.CrewArticleRetriveUpdateDeleteView.as_view(),name='crew_article_detail'),
    path('comment/<int:crew_article_pk>/',views.CrewCommentListCreateAPIView.as_view(),name='crew_article_detail'),
    path('comment/update/<int:crew_comment_pk>/',views.CrewCommentUpdateDeleteAPIView.as_view(),name='crew_article_detail'),
    path('schedule/<int:crew_id>/', views.crew_schedule_list_or_create),
    path('schedule/ud/<int:crew_schedule_pk>/', views.crew_schedule_update_or_delete),
    path('schedule/work/<int:crew_schedule_pk>/', views.crew_schedule_work_list),
] 