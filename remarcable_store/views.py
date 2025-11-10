from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TagSerializer, CategorySerializer, ProductSerializer
from .models import Tag, Category, Product
from .core.pagination import StandardPagination
import logging

class BaseListView(APIView):
    """
    Base class that includes the paginated_response method
    """
    pagination_class = None

    def paginated_response(self, queryset, serializer_class, request):
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = serializer_class(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class TagListView(BaseListView):
    """
    API end point to get the paginated list of tags.
    """
    # We can add permissions 
    # permission_classes = (IsAuthenticated,)
    pagination_class = StandardPagination

    def get(self, request):
        try:
            tags = Tag.objects.filter(is_deleted=False)
            return self.paginated_response(tags, TagSerializer, request)

        except Exception as e:
            logging.error(f"Error fetching tags: {e}")
            return Response({
                "success": False,
                "data": None,
                "message": "Error fetching the tags"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoryListView(BaseListView):
    """
    API end point to get the paginated list of categories.
    """
    # We can add permissions 
    # permission_classes = (IsAuthenticated,)
    pagination_class = StandardPagination

    def get(self, request):
        try:
            categories = Category.objects.filter(is_deleted=False)
            return self.paginated_response(categories, CategorySerializer, request)
        
        except Exception as e:
            logging.error(f"Error fetching categories: {e}")
            return Response({
                "success": False,
                "data": None,
                "message": "Error fetching the categories"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class SearchProductView(BaseListView):
    """
    API endpoint to search by description and filter by category/tag.
    """
    # We can add permissions 
    # permission_classes = (IsAuthenticated,)
    pagination_class = StandardPagination

    def get(self, request):
        try:
            query = request.query_params.get("q", "").strip()
            category_id = request.query_params.get("category")
            tag_id = request.query_params.get("tag")

            products = Product.objects.filter(is_deleted=False).select_related('category').prefetch_related('tags')

            if query:
                products = products.filter(
                    description__icontains=query
                )

            if category_id:
                products = products.filter(category_id=category_id)

            if tag_id:
                products = products.filter(tags__id=tag_id)

            products = products.distinct().order_by("name")
            return self.paginated_response(products, ProductSerializer, request)

        except Exception as e:
            logging.error(f"Error searching products: {e}")
            return Response({
                "success": False,
                "data": None,
                "message": "Error fetching the products"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
