from django.db import models
from django.db.models import Q

# This is the queryset to write the search and filter logic
# in one place.
class ProductQuerySet(models.QuerySet):
    """
    Custom queryset for advance filtering and search.
    """
    def search(self, query=None, category_id=None, tag_id=None):
        qs = self
        if query:
            qs = qs.filter(
                Q(name__icontains=query) |
                Q(short_description__icontains=query) |
                Q(description__icontains=query) |
                Q(category__name__icontains=query) |
                Q(tags__name__icontains=query)
            )
        if category_id:
            qs = qs.filter(category_id=category_id)
        if tag_id:
            qs = qs.filter(tags__id=tag_id)
        return qs.distinct()


class ProductManager(models.Manager):
    """
    Custom manager for the search functionality.
    """
    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def search(self, query=None, category_id=None, tag_id=None):
        return self.get_queryset().search(query=query, category_id=category_id, tag_id=tag_id)


# Category Model that represents category of the product, has a unique name and special code
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Category Name")
    description = models.TextField(blank=True, verbose_name="Description")
    code = models.CharField(max_length=20, unique=True, blank=True, help_text="Special code")

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.code})" if self.code else self.name


# Tag Model reprsents label/special indicator for products
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Tag Name")

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


# Product Model that represents each product, with fields like name, sku(Stock Keeping Unit) etc.
class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name="Product Name")
    short_description = models.CharField(max_length=250, blank=True)
    description = models.TextField(blank=True, verbose_name="Description")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    tags = models.ManyToManyField(Tag, related_name='products', blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField(default=0)
    sku = models.CharField(max_length=50, unique=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ProductManager()

    class Meta:
        ordering = ['name']
        verbose_name_plural = "Products"
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['price']),
        ]

    def __str__(self):
        return f"{self.name} (${self.price})"
