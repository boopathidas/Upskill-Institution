from rest_framework import status, viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Enquiry, Registration, Course, Payment
from .serializers import EnquirySerializer, RegistrationSerializer, CourseSerializer, PaymentSerializer
from django.http import HttpResponse

# ViewSet for Enquiry
class EnquiryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

@api_view(['POST'])
def create_enquiry(request):
    serializer = EnquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_registration(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return HttpResponse("<h1>Welcome to the Upskill Institution API</h1>")
