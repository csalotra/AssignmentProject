from django.urls import path
from .views import TagListView, CategoryListView, SearchProductView

urlpatterns = [
    path("tags/", TagListView.as_view(), name="tag-list"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("products-search/", SearchProductView.as_view(), name="product-search"),
]