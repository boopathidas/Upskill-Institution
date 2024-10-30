from rest_framework import serializers
from .models import Enquiry, Registration, Course, Payment
import uuid  # Optional, for generating unique identifiers

# Enquiry Serializer
# class EnquirySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Enquiry
#         fields = ['enquiry_date', 'name', 'mobile', 'email', 'course', 'qualification', 'gender', 'address']
    
#     def validate(self, data):
#         if not data.get('qualification'):
#             data['qualification'] = 'Not specified'  # Set a default if needed
#         if not data.get('gender'):
#             data['gender'] = 'Not specified'  # Set a default if needed
#         return data

# Registration Serializer with additional validation
from rest_framework import serializers
from .models import Enquiry, Registration, Course, Payment

# Enquiry Serializer
class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['enquiry_date', 'name', 'mobile', 'email', 'course', 'qualification', 'gender', 'address']
    
    def validate(self, data):
        data['qualification'] = data.get('qualification', 'Not specified')
        data['gender'] = data.get('gender', 'Not specified')
        return data

# Registration Serializer
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['registration_id', 'registration_number', 'name', 'date_of_registration', 'date_of_birth', 
                  'gender', 'address', 'mobile', 'email', 'qualification', 'course_name', 
                  'course_duration', 'total_fees']

    def create(self, validated_data):
        # Ensure a unique registration number is generated if it is not provided
        if 'registration_number' not in validated_data or not validated_data['registration_number']:
            validated_data['registration_number'] = self.generate_unique_registration_number()
        
        return super().create(validated_data)

    def generate_unique_registration_number(self):
        # Create a unique registration number
        last_registration = Registration.objects.all().order_by('registration_id').last()
        if last_registration:
            last_registration_number = last_registration.registration_number
            new_number = int(last_registration_number[3:]) + 1
            return f'UGT{new_number:03d}'
        return 'UGT001'

    def validate(self, data):
        if not data.get('course_name'):
            raise serializers.ValidationError("Course name is required.")
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
def validate_date_of_birth(self, value):
    return value if value else None  # Or use a default date if preferred
