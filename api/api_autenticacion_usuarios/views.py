from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException, AuthenticationFailed

from .authentication import *
from rest_framework.authentication import get_authorization_header

from .serializers import *
from api_models.models import User, Profile_User, Trabajador

from api_trabajadores.serializers import TrabajadorSerializer

class RegisterAPIView(APIView):

    def post(self, request):
        trabajador_data = request.data.pop("trabajador")

        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        trabajador_serializer = TrabajadorSerializer(data=trabajador_data)
        trabajador_serializer.is_valid(raise_exception=True)
        trabajador_serializer.save()

        ultimo_usuario = Profile_User.objects.get(id=serializer.data['profile_user']['pk'])
        ultimo_usuario.trabajador_id = trabajador_serializer.data['id']
        ultimo_usuario.save()

        serializer_modificado = {
            **serializer.data,
            "trabajador": trabajador_serializer.data    
        }

        return Response(serializer_modificado)

class LoginAPIView(APIView):
    def post(self, request):
        user = User.objects.filter(email = request.data['email']).first()

        if not user:
            raise APIException('Invalid credentials')
        
        if not user.check_password(request.data['password']):
            raise APIException('Invalid credentials') 
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()
        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
        response.data = {
            'accessToken':access_token
        }

        return response
    
class UserAPIView(APIView):
    def get(self, request):
        authorization = get_authorization_header(request).split()

        if authorization and len(authorization) == 2:
            token = authorization[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()
            trabajador = Trabajador.objects.get(pk=user.profile_user.trabajador_id)

            return Response({**UserSerializer(user).data, "trabajador": {**TrabajadorSerializer(trabajador).data}})
        
        raise AuthenticationFailed('unauthenticated')
    
class RefreshAPIView(APIView):
    def get(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)

        access_token = create_access_token(id)

        refresh_token = create_refresh_token(id)

        response = Response()
        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)

        response.data = {
            'accessToken':access_token
        }

        return response

class LogoutAPIView(APIView):
    def get(self, _):
        response = Response()
        response.delete_cookie(key="refreshToken")
        
        response.data = {
            "message":"logout is successful"
        }

        return response