<?php

namespace App;

class AuthService
{
    public static function login(string $email, string $password): array
    {
        // Validation
        if (empty($email) || empty($password)) {
            throw new \Exception('Email and password are required');
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception('Invalid email format');
        }
        
        if (strlen($password) < 6) {
            throw new \Exception('Password must be at least 6 characters');
        }
        
        // Simulate login
        return [
            'id' => time(),
            'email' => $email,
            'name' => explode('@', $email)[0],
            'token' => 'mock-token-' . time()
        ];
    }
    
    public static function signup(string $name, string $email, string $password, string $confirmPassword): array
    {
        // Validation
        if (empty($name) || empty($email) || empty($password)) {
            throw new \Exception('All fields are required');
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception('Invalid email format');
        }
        
        if (strlen($password) < 6) {
            throw new \Exception('Password must be at least 6 characters');
        }
        
        if ($password !== $confirmPassword) {
            throw new \Exception('Passwords do not match');
        }
        
        // Simulate signup
        return [
            'id' => time(),
            'email' => $email,
            'name' => $name,
            'token' => 'mock-token-' . time()
        ];
    }
}


