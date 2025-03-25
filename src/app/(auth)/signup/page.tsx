import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRound, GraduationCap } from 'lucide-react';

const SignupPage = () => {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    additionalField: ''
  });

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare submission data based on user type
    const submissionData = {
      email: formData.email,
      password: formData.password,
      userType: userType,
      ...(userType === 'student' && { 
        name: formData.name,
        enrollmentNumber: formData.additionalField 
      }),
      ...(userType === 'teacher' && { 
        name: formData.name,
        qualification: formData.additionalField 
      })
    };

    // TODO: Implement actual signup logic
    console.log('Signup Data:', submissionData);
  };

  const renderAdditionalFields = () => {
    if (userType === 'student') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
            <Input 
              type="text" 
              name="additionalField"
              value={formData.additionalField}
              onChange={handleInputChange}
              placeholder="Enter your enrollment number" 
              required 
            />
          </div>
        </div>
      );
    }

    if (userType === 'teacher') {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="qualification">Qualification</Label>
            <Input 
              type="text" 
              name="additionalField"
              value={formData.additionalField}
              onChange={handleInputChange}
              placeholder="Enter your highest qualification" 
              required 
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {userType ? `Sign Up as ${userType.charAt(0).toUpperCase() + userType.slice(1)}` : 'Choose Account Type'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!userType ? (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleUserTypeSelect('student')}
              >
                <GraduationCap className="mr-2" /> Sign Up as Student
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleUserTypeSelect('teacher')}
              >
                <UserRound className="mr-2" /> Sign Up as Teacher
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password" 
                  required 
                />
              </div>
              
              {renderAdditionalFields()}

              <div className="flex space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setUserType(null)}
                >
                  Back
                </Button>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;