from django.db.models import Avg
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView, CreateAPIView
from rest_framework_simplejwt.tokens import AccessToken

from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, permissions
import datetime
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import *

today = datetime.date.today()

year = today.year


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def room(request, room_name):
    return render(request, 'room.html', {
        'room_name': room_name
    })

def index(request):
    return render(request, 'index1.html', {})

# VALIDATORS #
def validate_age(value):
    if int(value) < 16 or int(value) > 110:
        raise Exception("age must be between 16 and 110")
    return value


def validate_price(value):
    if int(value) < 10:
        raise Exception("price should be positive")
    return value


def validate_year(value):
    if int(value) > year:
        raise Exception("the repair date cannot be after today")
        return False
    return True
def validate_year_1900(value):
    if int(value) < 1900:
        raise Exception("the carType cannot be older than 1900")
        return False
    return True


# VALIDATORS #
@api_view(['GET'])
def cars_pagination(request):
    page = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 10))

    cars = Car.objects.all()
    total_count = cars.count()

    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    cars = cars[start_index:end_index]
    serializer = CarSerializer(cars, many=True)

    return Response({
        'total_count': total_count,
        'per_page': per_page,
        'current_page': page,
        'cars': serializer.data,
    })


@api_view(['GET', 'POST'])
def car_list(request, format=None):
    if request.method == 'GET':
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not validate_year(request.data['year']):
            return
        if not validate_price(request.data['price']):
            return
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def car_id_list(request, format=None):
    if request.method == 'GET':
        car = Car.objects.all().only('pk')
        serializer = CarIdSerializer(car, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def car_detail(request, id, format=None):
    try:
        car = Car.objects.get(pk=id)
    except Car.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarSerializer(car)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not validate_year(request.data['year']):
            return
        serializer = CarSerializer(car, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def carType_list(request, format=None):
    if request.method == 'GET':
        categories = CarType.objects.all()
        serializer = CarTypeSerializer(categories, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not validate_year_1900(request.data['year']):
            return
        validate_year_1900(request.data['year'])
        serializer = CarTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def carTypes_pagination(request):
    page = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 10))

    carTypes = CarType.objects.all()
    total_count = carTypes.count()

    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    carTypes = carTypes[start_index:end_index]
    serializer = CarTypeSerializer(carTypes, many=True)

    return Response({
        'total_count': total_count,
        'per_page': per_page,
        'current_page': page,
        'carTypes': serializer.data,
    })


@api_view(['GET', 'PUT', 'DELETE'])
def carType_detail(request, id, format=None):
    try:
        carType = CarType.objects.get(pk=id)
    except  CarType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarTypeSerializer(carType)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CarTypeSerializer(carType, data=request.data)
        if serializer.is_valid():

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        carType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def carType_filter_revenue(request, revenue, format=None):
    try:
        carType = CarType.objects.filter(revenue__gt=revenue)
    except CarType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarTypeSerializer(carType, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def mechanics_pagination(request):
    page = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 10))

    mechanics = Mechanic.objects.all()
    total_count = mechanics.count()

    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    mechanics = mechanics[start_index:end_index]

    serializer = MechanicSerializer(mechanics, many=True)

    return Response({
        'total_count': total_count,
        'per_page': per_page,
        'current_page': page,
        'mechanics': serializer.data,
    })


@api_view(['GET', 'POST'])
def mechanic_list(request, format=None):
    if request.method == 'GET':
        mechanics = Mechanic.objects.all()
        serializer = MechanicSerializer(mechanics, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not validate_age(request.data['age']):
            return
        validate_age(request.data['age'])

        serializer = MechanicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def mechanic_detail(request, id, format=None):
    try:
        mechanic = Mechanic.objects.get(pk=id)
    except Mechanic.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MechanicSerializer(mechanic)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not validate_age(request.data['age']):
            return
        serializer = MechanicSerializer(mechanic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mechanic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TAG END

@api_view(['GET'])
def repaireds_pagination(request):
    page = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 10))

    repaireds = Repaired.objects.all()
    total_count = repaireds.count()

    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    repaireds = repaireds[start_index:end_index]
    serializer = RepairedSerializer(repaireds, many=True)

    return Response({
        'total_count': total_count,
        'per_page': per_page,
        'current_page': page,
        'repaireds': serializer.data,
    })



''' def PersonalProfileView(RetrieveUpdateDestroyAPIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.all()

    def get_object(self):
        try:
            print(self.get_queryset().get(user__id=self.request.user.id))
            return self.get_queryset().get(user__id=self.request.user.id)
        except UserProfile.DoesNotExist:
            return {"ERROR": "No such user profile found!"}

    def put(self, request, *args, **kwargs):
        user = list(UserProfile.objects.all().filter(user__id=self.request.user.id))[0]
        user.last_name = request.data['last_name']
        user.first_name = request.data['first_name']
        user.bio = request.data['bio']
        user.university = request.data['university']
        user.high_school = request.data['high_school']
        user.save()
        print(request.data)
        print(user)
        return Response({"message": "User profile updated successfully!"}, status=200)

    def delete(self, request, *args, **kwargs):
        # Reset user profile
        user = UserProfile.objects.get(user__id=self.request.user.id)
        user.last_name = ''
        user.first_name = ''
        user.bio = ''
        user.university = ''
        user.high_school = ''
        user.save()
        return Response({"message": "Profile reset successfully"}, status=200)
'''

@api_view(['POST'])
def register_user(request, format=None):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# TAGGED START
@api_view(['GET', 'POST'])
def repaired_list(request, format=None):
    if request.method == 'GET':
        repaired = Repaired.objects.all()
        serializer = RepairedSerializer(repaired, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not validate_price(request.data['price']):
            return
        serializer = RepairedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def repaired_detail(request, id, format=None):
    try:
        repaired = Repaired.objects.get(pk=id)
    except Repaired.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RepairedSerializer(repaired)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not validate_price(request.data['price']):
            return
        serializer = RepairedSerializer(repaired, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        repaired.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# TAGGED END


def car_average_age(request):
    cars = Car.objects.annotate(average_age=Avg('mechanics__age')).order_by('-average_age')
    data = []
    for car in cars:
        data.append({
            'name': car.name,
            'carType': car.carType.name,
            'average_age': car.average_age,
        })
    return JsonResponse(data, safe=False)
# STATISTICS END
