from django.shortcuts import render
from .models import Product, Category, Tag

def product_list(request):
    """
    View for displaying all products with search and filter functionality.
    Users can search by keyword, and filter by category or tags.
    """

    search_query = request.GET.get('q', '')
    category_id = request.GET.get('category', '')
    tag_id = request.GET.get('tag', '')

    products = Product.objects.search(
        query=search_query,
        category_id=category_id,
        tag_id=tag_id
    )

    # To fetch all categories and tags
    categories = Category.objects.all()
    tags = Tag.objects.all()

    # Selected category
    selected_category_name = None
    if category_id:
        selected_category_name = Category.objects.filter(id=category_id).first()

    # Selected tag
    selected_tag_name = None
    if tag_id:
        selected_tag_name = Tag.objects.filter(id=tag_id).first()

    context = {
        'products': products,
        'categories': categories,
        'tags': tags,
        'search_query': search_query,
        'selected_category': category_id,
        'selected_tag': tag_id,
        'selected_category_name': selected_category_name,
        'selected_tag_name': selected_tag_name,
    }

    return render(request, 'product_list.html', context)