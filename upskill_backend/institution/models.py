from django.db import models

class Enquiry(models.Model):
    enquiry_number = models.AutoField(primary_key=True)
    enquiry_date = models.DateField()
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    email = models.EmailField(max_length=255)
    course = models.CharField(max_length=100, null=True, blank=True)
    qualification = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Registration(models.Model):
    registration_number = models.CharField(max_length=10, unique=True, editable=False)  # Make this non-editable
    name = models.CharField(max_length=255)
    date_of_registration = models.DateField(auto_now_add=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10)
    address = models.TextField()
    mobile = models.CharField(max_length=15)
    email = models.EmailField()
    qualification = models.CharField(max_length=50)
    course_name = models.CharField(max_length=100)
    course_duration = models.CharField(max_length=50)
    total_fees = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} - {self.registration_number}'


class Course(models.Model):
    course_name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.course_name


class Payment(models.Model):
    payment_id = models.CharField(max_length=10, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.payment_id
