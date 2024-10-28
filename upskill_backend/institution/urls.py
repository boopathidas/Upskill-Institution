from django.urls import path, include
from rest_framework.routers import DefaultRouter
from institution.views import (
    EnquiryViewSet,
    CourseViewSet,
    PaymentViewSet,
    create_enquiry,
    RegistrationViewSet,
    home
)

router = DefaultRouter()
router.register(r'enquiries', EnquiryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'registration', RegistrationViewSet, basename='registration')

urlpatterns = [
    path('', home, name='home'),  # Root URL
    path('api/', include(router.urls)),  # Includes all router URLs
    path('api/enquiry/', create_enquiry, name='create_enquiry'),
]
