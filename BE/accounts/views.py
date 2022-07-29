from django.shortcuts import redirect, render,get_object_or_404
from rest_framework.generics import GenericAPIView,RetrieveUpdateDestroyAPIView
from accounts import serializers
from accounts.models import User
from rest_framework.decorators import api_view
from accounts.serializers import  RegisterSerializer,UserSerializer
from rest_framework import response,status,permissions
from django.contrib.auth import authenticate

# Create your views here.
from django.http import JsonResponse


class RegisterAPIView(GenericAPIView) :
    authentication_classes=[]

    serializer_class=RegisterSerializer 


    def post(self,request) :
        serializers = self.serializer_class(data=request.data)  

        if serializers.is_valid() :
            serializers.save()
            return response.Response(serializers.data,status=status.HTTP_201_CREATED)
        return response.Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

# class UserAPIView(GenericAPIView) :
    
#     permission_classes=(permissions.AllowAny,)
    
#     def get(self,request,user_pk) :
#         print(user_pk)
#         user = User(user_pk=user_pk)
#         serializers=UserSerializer(user)
        
#         return response.Response({'user':serializers.data})
    
class UserAPIView(RetrieveUpdateDestroyAPIView) :
    serializer_class =UserSerializer
    permission_classes=(permissions.IsAuthenticated,)
    
    lookup_field="user_pk"
    queryset = User.objects.all()
    def get(self, request, *args, **kwargs):
        print(request.user)
        return self.retrieve(request, *args, **kwargs)
    
@api_view(['POST'])
def follow(request, user_pk):
    print(request)
    if request.user.is_authenticated:
        person = get_object_or_404(User, user_pk=user_pk)
        user = request.user
        if person != user:
            if person.followers.filter(pk=user.pk).exists():
                person.followers.remove(user)
                context = {
                    'result' : 'Success'
                }
            else:
                person.followers.add(user)
                context = {
                    'result' : 'False'
                }
        return JsonResponse(context)
    return redirect('accounts:login')