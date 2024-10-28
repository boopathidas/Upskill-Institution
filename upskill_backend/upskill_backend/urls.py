"""
URL configuration for upskill_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from institution.views import EnquiryViewSet, CourseViewSet, PaymentViewSet, create_enquiry, create_registration,home,RegistrationViewSet

router = DefaultRouter()
router.register(r'enquiries', EnquiryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'registration', RegistrationViewSet, basename='registration')

urlpatterns = [
        path('', home, name='home'),  # Root URL

    path('api/', include(router.urls)),
    path('api/enquiry/', create_enquiry, name='create_enquiry'),
    path('api/registration/', create_registration, name='create_registration'),
]


