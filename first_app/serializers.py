from datetime import timedelta, datetime

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Car, CarType, Mechanic, Repaired, UserProfile
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    is_staff = True

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match!"})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.save()

        user_profile = UserProfile.objects.create(
            user=user
        )
        user_profile.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'bio', 'university', 'high_school', 'user', 'nr_entities_added']


class RepairedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repaired
        fields = ['id', 'car', 'mechanic', 'date_created', 'price']


class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ['id', 'name', 'revenue', 'nationality', 'year', 'description']


class CarIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id']


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'price', 'year', 'carType', 'description']


class MechanicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mechanic
        fields = ['id', 'name', 'experience', 'price', 'age', 'description']


# average age that mechanics that worked on a car have
class CarMechanicReportDTO:
    def __init__(self, mechanic_name, avg_age):
        self.mechanic_name = mechanic_name
        self.avg_age = avg_age


class CarMecanicReportDTOSerializer(serializers.Serializer):
    mechanic_name = serializers.CharField()
    avg_age = serializers.FloatField()
