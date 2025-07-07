
import React, { useState } from "react";
import { Container, ToggleLink, ToggleText, Button, Input, Title, Card} from "./LoginSignup";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginTrigger, setLoginTrigger] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    refetch,
    isFetching,
    isError,
    error
  } = useQuery({
    queryKey: ['login', form.email],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5246/Auth/login?email=${form.email}&password=${form.password}`);
      return response.data;
    },
    enabled: loginTrigger === true, 
    retry: false
  });;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const signupMutation = useMutation({
    mutationFn: async (signupData) => {
      const response = await axios.post("http://localhost:5246/Auth/signup", signupData);
      return response.data;
    },
    onSuccess: () => {
      alert("Signup successful!");
      setIsSignup(false)
    },
    onError: (error) => {
      alert("Signup failed: " + error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const signupPayload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "employee",
        manager: "000000000000000000000000"
      };
      signupMutation.mutate(signupPayload);
    } else {
        setLoginTrigger(true)
        const result = await refetch(); 
        if(isError){
          alert("wrong credentials")
        }
        setLoginTrigger(false); 
        localStorage.setItem('token', result.data.token)
        localStorage.setItem("email", result.data.email)
        localStorage.setItem("manager", result.data.manager)
        localStorage.setItem("role", result.data.role)
        localStorage.setItem("name", result.data.name)
        localStorage.setItem("userId", result.data.userId)
        navigate("/dashboard")
        window.location.reload();
        
    }
  };

  return (
    <Container>
      <Card>
        <Title>Welcome to Project Management Tool</Title>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <Button type="submit">{isSignup ? "Sign Up" : "Login"}</Button>
        </form>
        <ToggleText>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <ToggleLink onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </ToggleLink>
        </ToggleText>
      </Card>
    </Container>
  );
};

export default LoginSignup;