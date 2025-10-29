<?php

namespace App;

class Router
{
    private array $routes = [];
    
    public function get(string $path, callable $handler): void
    {
        $this->routes['GET'][$path] = $handler;
    }
    
    public function post(string $path, callable $handler): void
    {
        $this->routes['POST'][$path] = $handler;
    }
    
    public function dispatch(string $method, string $uri): void
    {
        // Remove query string
        $uri = strtok($uri, '?');
        
        // Check exact match first
        if (isset($this->routes[$method][$uri])) {
            call_user_func($this->routes[$method][$uri]);
            return;
        }
        
        // Check for dynamic routes
        foreach ($this->routes[$method] ?? [] as $route => $handler) {
            $pattern = preg_replace('/\{[a-zA-Z]+\}/', '([^/]+)', $route);
            $pattern = '#^' . $pattern . '$#';
            
            if (preg_match($pattern, $uri, $matches)) {
                array_shift($matches);
                call_user_func_array($handler, $matches);
                return;
            }
        }
        
        // 404 Not Found
        http_response_code(404);
        echo "404 - Page Not Found";
    }
    
    public function redirect(string $path): void
    {
        header("Location: $path");
        exit;
    }
}


