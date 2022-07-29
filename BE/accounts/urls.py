from accounts import views
from django.urls import path,include

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

app_name='accounts'
urlpatterns=[
    path('signup/',views.RegisterAPIView.as_view(),name='signup'),
    path('<int:user_pk>/',views.UserAPIView.as_view(),name='user'),
    path('token/', obtain_jwt_token,name='login'),          # JWT 토큰 획득
    path('token/refresh/', refresh_jwt_token), # JWT 토큰 갱신
    path('token/verify/', verify_jwt_token),   # JWT 토큰 확인
    path('follow/<int:user_pk>/', views.follow),   # JWT 토큰 확인
]