from django.contrib import admin
from .models import Car, CarType, Mechanic, Repaired, UserProfile

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Car)
admin.site.register(CarType)
admin.site.register(Mechanic)
admin.site.register(Repaired)

