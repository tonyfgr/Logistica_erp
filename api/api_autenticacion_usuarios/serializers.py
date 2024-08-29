from api_models.models import User, Profile_User
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework.serializers import ModelSerializer

class ProfileUserSerializer(ModelSerializer):
    class Meta:
        model = Profile_User
        fields = ['pk', 'rol']

class UserSerializer(ModelSerializer):
    profile_user = ProfileUserSerializer()

    class Meta:
        model = User
        fields = ['pk','username', 'profile_user','email', 'password']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        profile_user = validated_data.pop('profile_user', None)
        instance = self.Meta.model(**validated_data)
        print(profile_user)
        if password is not None:
            instance.set_password(password)
        
        instance.save()
        
        if profile_user is not None:
            profile = Profile_User.objects.create(**profile_user, user=instance)
            
            profile.save()

        return instance
    
    def to_representation(self, instance):
        profile_user_info = ProfileUserSerializer(Profile_User.objects.get(user_id=instance.id)).data if instance.profile_user else None

        return {
            'pk': instance.id,
            'username': instance.username,
            'email': instance.email,
            'profile_user': profile_user_info
        }