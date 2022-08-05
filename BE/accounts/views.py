import json
from django.http import JsonResponse
from django.shortcuts import redirect, render,get_object_or_404
from django.views import View
from rest_framework.generics import GenericAPIView,UpdateAPIView
from accounts.models import User
from rest_framework.decorators import api_view
from accounts.serializers import  (RegisterSerializer,LoginSerializer,
                                   UserSerializer,ChangePasswordSerializer)
from rest_framework import response,status,permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
# Create your views here.
from django import http
import requests

#user 확인 API 
class AuthUserAPIView(GenericAPIView) :
    #인증된 유저만 (토큰 필요 )
    permission_classes=(permissions.IsAuthenticated,)
    #요청한 유저를 가져와서, serializer에 넣음 
    def get(self,request) :
        user = request.user
        serializers=RegisterSerializer(user)
        #유저의 정보를 가져옴 
        return Response({'user':serializers.data})

#회원가입 API (POST)
class RegisterAPIView(GenericAPIView) :
    #인증 불필요 
    authentication_classes=[]
    #회원가입 직렬화
    serializer_class=RegisterSerializer 

    #post 요청이 오면 
    def post(self,request) :
        #요청이 온 데이터로 serializer 
        serializers = self.serializer_class(data=request.data)  
        #오류가 발생하지 않으면 회원가입 승인 
        if serializers.is_valid(raise_exception=True) :
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

#로그인 API 
class LoginAPIView(GenericAPIView) :
    authentication_classes=[]
    serializer_class = LoginSerializer
    
    def post(self,request) :
        email = request.data.get('email',None)
        password = request.data.get('password',None)
        
        user = authenticate(username=email,password=password)
        
        if user :
            serializer =  self.serializer_class(user)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response({'message':"Invaild credentials,try again"},status=status.HTTP_401_UNAUTHORIZED)

class ChangePasswordView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
    lookup_field ='user_pk'
    
    def put(self, request,user_pk, *args, **kwargs):
        if user_pk != request.user.user_pk :
            return Response({'message':"You do not have permission to change the user's information,try again"},status=status.HTTP_400_BAD_REQUEST)
        return self.update(request, *args, **kwargs)

    
#유저 프로필 RUD API
class UserRetrieveUpdateDeleteAPIView(APIView):
    #요청한 user_pk로 유저 조회 
    def get_object(self, user_pk):
        try:
            return User.objects.get(user_pk=user_pk)
        #없는 유저이면 404에러 
        except User.DoesNotExist:
            raise http.Http404
    ## 'email','name','nickname','region','category','is_alba','image'
    #user 정보 조회 
    def get(self, request,user_pk, format=None):
        #user_pk로 user 가져오기 
        user = self.get_object(user_pk)
        #유저 정보 전달 
        serializer = UserSerializer(user)
        return Response(serializer.data)
    #회원정보 수정
    #수정 가능 사항
    ## 'name','nickname','region','category','is_alba','image'
    def put(self, request,user_pk, format=None):
        user = self.get_object(user_pk)
        #수정을 요청한 유저가 계정주인이 아니면
        #수정 불가 
        if request.user != user :
            return Response({'message':"You do not have permission to change the user's information,try again"},status=status.HTTP_400_BAD_REQUEST)
        #아니면 회원정보 수정 
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #회원탈퇴
    def delete(self, request,user_pk, format=None):
        user = self.get_object(user_pk)
        #탈퇴를 요청한 유저가 계정주인이 아니면
        if request.user != user :
            return Response({'message':"You do not have permission to change the user's information,try again"},status=status.HTTP_400_BAD_REQUEST)
        #아니면 회원탈퇴
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def follow(request, user_pk):
    if request.user.is_authenticated:
        person = get_object_or_404(User, user_pk=user_pk)
        user = request.user
        if person != user:
            if person.followers.filter(pk=user.pk).exists():
                person.followers.remove(user)
                context = {
                    'result' : f'{request.user.nickname}님이 {person.nickname}을 Follow'
                }
            else:
                person.followers.add(user)
                context = {
                    'result' : f'{request.user.nickname}님이 {person.nickname}을 Follow 취소'
                }
        return JsonResponse(context)
    return redirect('accounts:login')


class KakaoSignInView(View):
    def get(self, request):
        client_id = "0f5982ee3aa76733f951e5add93878c1"
        redirect_uri = "http://127.0.0.1:8000/account/sign-in/kakao/callback"
        return redirect(
            f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
        )
        
class KakaoSignInCallbackView(View):
    def get(self, request):

        try:
            print(request.GET)
            code = request.GET.get("code")                                       
            client_id = "0f5982ee3aa76733f951e5add93878c1"
            redirect_uri = "http://127.0.0.1:8000/account/sign-in/kakao/callback"
            
            token_request = requests.post(                                        
                f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
            )

            token_json = token_request.json()                                    
            print(token_json)
            error = token_json.get("error",None)

            if error is not None :
                return JsonResponse({"message": "INVALID_CODE"}, status = 400)

            access_token = token_json.get("access_token")
            print(access_token)                        

        except KeyError:
            return JsonResponse({"message" : "INVALID_TOKEN"}, status = 400)

        except access_token.DoesNotExist:
            return JsonResponse({"message" : "INVALID_TOKEN"}, status = 400)
    
        