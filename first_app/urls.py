from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('api_schema/', get_schema_view(
        title='API Schema',
        description='Guide for the REST API'
    ), name='api_schema'),
    path('docs/', TemplateView.as_view(
        template_name='docs.html',
        extra_context={'schema_url': 'api_schema'}
    ), name='swagger-ui'),
    path('cars/', views.car_list),
    path('cars/all_id', views.car_id_list),
    path('cars/<int:id>', views.car_detail),
    path('carTypes/', views.carType_list),
    path('carTypes/<int:id>', views.carType_detail),
    path('carTypes/filter/revenue/<int:revenue>', views.carType_filter_revenue),
    path('mechanics/', views.mechanic_list),
    path('mechanics/<int:id>', views.mechanic_detail),
    path('repaireds/', views.repaired_list),
    path('repaireds/<int:id>', views.repaired_detail),
    path('report/age/', views.car_average_age, name='car_average_age'),
    path('cars/pagination/', views.cars_pagination, name='cars_pagination'),
    path('carTypes/pagination/', views.carTypes_pagination, name='carTypes_pagination'),
    path('mechanics/pagination/', views.mechanics_pagination, name='mechanics_pagination'),
    path('repaireds/pagination/', views.repaireds_pagination, name='repaireds_pagination'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register_user, name="register_user"),
    path('hello/', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room'),


]

urlpatterns = format_suffix_patterns(urlpatterns)
