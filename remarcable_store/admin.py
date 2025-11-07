from django.contrib import admin
from .models import Category, Tag, Product

#--- Category Admin ---
# To display categories with search by name or description.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'description')
    search_fields = ('name', 'description', 'code')
    ordering = ('name',)


#--- Tag Admin ---
# To manage tags with alphabetical ordering and search.
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)


#--- Product Admin---
# To display products with search, filters, and tag selection.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'category', 'price', 'stock_quantity', 'is_active', 'created_at')
    search_fields = ('name', 'sku', 'description', 'short_description')
    list_filter = ('category', 'tags', 'is_active')
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('name',)
