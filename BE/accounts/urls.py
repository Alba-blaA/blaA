from accounts import views
from django.urls import path,include


app_name='accounts'
urlpatterns=[
    path('signup/',views.RegisterAPIView.as_view(),name='signup'),
    path('login/',views.LoginAPIView.as_view(),name='login'),
    path('user/',views.AuthUserAPIView.as_view(),name='user'),
    path('follow/<int:user_pk>/',views.follow),
    path('<int:user_pk>/', views.UserRetrieveUpdateDeleteAPIView.as_view()),
    path('change_password/<int:user_pk>/', views.ChangePasswordView.as_view(), name='auth_change_password')
]