import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock login function (replace with actual authentication logic)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: Replace with actual backend authentication
      const mockUsers = [
        { email: 'student@example.com', userType: 'STUDENT' },
        { email: 'teacher@example.com', userType: 'TEACHER' },
        { email: 'admin@example.com', userType: 'ADMIN' }
      ];

      const user = mockUsers.find(
        u => u.email === loginData.email
      );

      if (!user) {
        setError('Invalid email or password');
        return;
      }

      // Simulate successful login
      switch (user.userType) {
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
        case 'TEACHER':
          navigate('/teacher/dashboard');
          break;
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        default:
          setError('Invalid user type');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                name="email"
                value={loginData.email}
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
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="Enter your password" 
                required 
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account? {' '}
                <a 
                  href="/signup" 
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;