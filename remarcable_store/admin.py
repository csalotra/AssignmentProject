from django.contrib import admin
from .models import Category, Tag, Product

#--- Category Admin ---
# To display categories with search by name or description.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at', 'is_deleted')
    search_fields = ('name', 'description')
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')


#--- Tag Admin ---
# To manage tags with alphabetical ordering and search.
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at', 'is_deleted')
    search_fields = ('name',)
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')


#--- Product Admin---
# To display products with search, filters, and tag selection.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock_quantity', 'created_at', 'updated_at', 'is_deleted')
    search_fields = ('name', 'description', 'short_description')
    list_filter = ('category', 'tags')
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('name',)
