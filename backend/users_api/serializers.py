from rest_auth.serializers import LoginSerializer


class CustomLoginSerializer(LoginSerializer):
    username = None

    class Meta:
        fields = ['email', 'password']