import unittest

from django.urls import reverse
from django.test import TestCase

from first_app.models import Car, CarType, Mechanic, Repaired



class FilterCarTypeRevenueViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create 13 authors for pagination tests
        number_of_carTypes = 10

        for carType_id in range(number_of_carTypes):
            CarType.objects.create(
                name=f'carType_{carType_id}',
                description='some description here',
                revenue=carType_id,
                year=f'some desc here',
                nationality=f'some desc here'
            )

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('/carType/filter/revenue/1')
        self.assertEqual(response.status_code, 200)

    def test_lists_all_carType(self):
        # Get second page and confirm it has (exactly) remaining 3 items
        response = self.client.get('/carType/filter/revenue/7')
        # print(response.json())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_filters_carType(self):
        # Get second page and confirm it has (exactly) remaining 3 items
        response = self.client.get('/carType/filter/revenue/9')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

        for carType in response.json():
            self.assertGreater(carType['revenue'], 3)


class car_average_age_Test(TestCase):
    @classmethod
    def setUpTestData(cls):
        CarType.objects.create(
            name='cartype1',
            description='desc1',
            revenue=1231,
            year='year1',
            nationality='nat1'
        )
        CarType.objects.create(
            name='cartype2',
            description='desc2',
            revenue=12313,
            year='year2',
            nationality='nat2'
        )
        CarType.objects.create(
            name='cartype3',
            description='desc3',
            revenue=1231,
            year='year3',
            nationality='nat3'
        )

        Car.objects.create(
            carType_id=1,
            name="Car1",
            description='desc1',
            price=23,
            year=31,
        )
        Car.objects.create(
            carType_id=1,
            name="Car2",
            description='desc2',
            price=23,
            year=31,
        )

        Car.objects.create(
            carType_id=1,
            name="Car3",
            description='desc3',
            price=23,
            year=31,
        )


        Mechanic.objects.create(
            name="mechanic1",
            experience="none",
            price="low",
            age=23,
            description="this is the best"
        )
        Mechanic.objects.create(
            name="mechanic2",
            experience="none",
            price="low",
            age=53,
            description="this is the best"
        )
        Mechanic.objects.create(
            name="mechanic3",
            experience="none",
            price="low",
            age=26,
            description="this is the best"
        )

        Repaired.objects.create(
            car_id=1,
            mechanic_id=1,
            date_created="2022-03-17",
            price=30
        )
        Repaired.objects.create(
            car_id=1,
            mechanic_id=1,
            date_created="2010-03-17",
            price=30
        )
        Repaired.objects.create(
            car_id=1,
            mechanic_id=1,
            date_created="2020-03-17",
            price=30
        )
        Repaired.objects.create(
            car_id=1,
            mechanic_id=1,
            date_created="2021-03-17",
            price=30
        )

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('/report/age/')
        self.assertEqual(response.status_code, 200)

    def test_filters_carType(self):
        response = self.client.get('/report/age/')
        currentAverage = 100000.2
        for element in response.json():
            if element['average_age'] != None :
                self.assertGreaterEqual(currentAverage, element['average_age'])
                currentAverage = element['average_age']

