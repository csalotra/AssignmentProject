from rest_framework.test import APITestCase
from rest_framework import status
from remarcable_store.models import Product, Category, Tag
from django.urls import reverse

class ProductAPITestCase(APITestCase):

    def setUp(self):
        # Categories
        self.cat1 = Category.objects.create(name="Electronics", is_deleted=False)
        self.cat2 = Category.objects.create(name="Books", is_deleted=False)

        # Tags
        self.tag1 = Tag.objects.create(name="Trending", is_deleted=False)
        self.tag2 = Tag.objects.create(name="Bestseller", is_deleted=False)

        # Products
        self.prod1 = Product.objects.create(
            name="Test Laptop",
            description="A Test laptop",
            short_description="Laptop",
            price=1000,
            category=self.cat1,
            is_deleted=False
        )
        self.prod1.tags.add(self.tag1)

        self.prod2 = Product.objects.create(
            name="Test Book",
            description="Test book",
            short_description="Book",
            price=20,
            category=self.cat2,
            is_deleted=False
        )
        self.prod2.tags.add(self.tag2)

    def test_search_with_no_filters(self):
        url = reverse("product-search")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
        self.assertEqual(len(response.data['results']), 2)

    def test_search_with_query(self):
        url = reverse("product-search")
        response = self.client.get(url, {"q": "laptop"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['name'], "Test Laptop")

    def test_search_with_category(self):
        url = reverse("product-search")
        response = self.client.get(url, {"category": self.cat1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['category']['name'], "Electronics")

    def test_search_with_tag(self):
        url = reverse("product-search")
        response = self.client.get(url, {"tag": self.tag2.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['tags'][0]['name'], "Bestseller")

    def test_search_combined_filters(self):
        url = reverse("product-search")
        response = self.client.get(url, {"q": "book", "category": self.cat2.id, "tag": self.tag2.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['name'], "Test Book")

    def test_tag_list(self):
        url = reverse("tag-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)

    def test_category_list(self):
        url = reverse("category-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
