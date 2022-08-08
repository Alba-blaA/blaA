from accounts import views
from django.urls import path,include


app_name='accounts'
urlpatterns=[
    path('signup/',views.RegisterAPIView.as_view(),name='signup'),
    path('login/',views.LoginAPIView.as_view(),name='login'),
    path('user/',views.AuthUserAPIView.as_view(),name='user'),
    path('users/',views.UserListAPIView.as_view(),name='users'),
    path('follow/<int:user_pk>/',views.follow),
    path('<int:user_pk>/', views.UserRetrieveUpdateDeleteAPIView.as_view()),
    path('change_password/<int:user_pk>/', views.ChangePasswordView.as_view(), name='auth_change_password'),
    path('unique/email/', views.EmailUniqueCheck.as_view(), name='uniquecheck_email'),
    path('unique/nickname/', views.NicknameUniqueCheck.as_view(), name='uniquecheck_nickname'),
    path('crew/', views.UserCrewAPIView.as_view(), name='user_crew'),
    path('review/', views.UserReviewAPIView.as_view(), name='user_review'),
]