from rest_framework import serializers
from .models import Enquiry, Registration, Course, Payment
import uuid  # Optional, for generating unique identifiers

# Enquiry Serializer
class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['enquiry_date', 'name', 'mobile', 'email', 'course', 'qualification', 'gender', 'address']
    
    def validate(self, data):
        if not data.get('qualification'):
            data['qualification'] = 'Not specified'  # Set a default if needed
        if not data.get('gender'):
            data['gender'] = 'Not specified'  # Set a default if needed
        return data

# Registration Serializer with additional validation
class RegistrationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Registration
        fields = '__all__'

    def create(self, validated_data):
        # Generate unique registration number
        registration_number = self.generate_unique_registration_number()

        validated_data['registration_number'] = registration_number
        
        # Create new registration instance
        return super().create(validated_data)

    def generate_unique_registration_number(self):
        # Generate registration number in the format 'UGT001'
        while True:
            # Get the last registration number
            last_registration = Registration.objects.all().order_by('id').last()
            if last_registration:
                last_registration_number = last_registration.registration_number
                new_number = int(last_registration_number[3:]) + 1
                registration_number = f'UGT{new_number:03d}'
            else:
                registration_number = 'UGT001'
            
            # Check for uniqueness
            if not Registration.objects.filter(registration_number=registration_number).exists():
                return registration_number  # Return unique registration number

    def validate(self, data):
        if not data.get('qualification'):
            data['qualification'] = 'Not specified'  # Set a default if not provided
        if not data.get('gender'):
            data['gender'] = 'Not specified'  # Set a default if not provided
        if not data.get('course_name'):
            raise serializers.ValidationError("Course name is required.")  # Ensure course is selected

        return data

# Course Serializer
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# Payment Serializer
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
