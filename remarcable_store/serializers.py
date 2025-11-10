"""
Serializers for a Tag, Category and Product (including its related Category and Tags)
"""

from rest_framework import  serializers
from .models import Tag, Category, Product

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'short_description', 'description', 'category', 'tags', 'price']