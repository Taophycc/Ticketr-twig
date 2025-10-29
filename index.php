<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Router;
use App\AuthService;
use App\TicketService;
use App\TwigExtensions;

// Initialize Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false, // Disable cache for development
    'debug' => true
]);
$twig->addExtension(new TwigExtensions());

// Determine initial theme for Twig templates
$initialTheme = 'light';
if (isset($_COOKIE['theme'])) {
    $initialTheme = $_COOKIE['theme'];
} else if (isset($_SERVER['HTTP_ACCEPT_COLOR_SCHEME']) && $_SERVER['HTTP_ACCEPT_COLOR_SCHEME'] === 'dark') {
    $initialTheme = 'dark';
}

$twig->addGlobal('theme', $initialTheme);

// Add custom functions
$twig->addFunction(new \Twig\TwigFunction('asset', function ($path) {
    return '/' . ltrim($path, '/');
}));

$router = new Router();

// Landing Page
$router->get('/', function () use ($twig) {
    echo $twig->render('landing.twig');
});

// Login Page
$router->get('/auth/login', function () use ($twig) {
    echo $twig->render('login.twig');
});

$router->post('/auth/login', function () {
    header('Content-Type: application/json');
    try {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $user = AuthService::login($email, $password);
        echo json_encode(['success' => true, 'user' => $user]);
    } catch (\Exception $e) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
});

// Signup Page
$router->get('/auth/signup', function () use ($twig) {
    echo $twig->render('signup.twig');
});

$router->post('/auth/signup', function () {
    header('Content-Type: application/json');
    try {
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirmPassword'] ?? '';
        
        $user = AuthService::signup($name, $email, $password, $confirmPassword);
        echo json_encode(['success' => true, 'user' => $user]);
    } catch (\Exception $e) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
});

// Dashboard
$router->get('/dashboard', function () use ($twig) {
    $stats = TicketService::getStats();
    echo $twig->render('dashboard.twig', ['stats' => $stats]);
});

// Tickets List
$router->get('/tickets', function () use ($twig) {
    $tickets = TicketService::getAll();
    echo $twig->render('tickets.twig', ['tickets' => $tickets]);
});

// Create Ticket
$router->post('/tickets/create', function () use ($router) {
    try {
        TicketService::create($_POST);
    } catch (\Exception $e) {
        // Error handling if needed
    }
    $router->redirect('/tickets');
});

// Update Ticket
$router->post('/tickets/update/{id}', function ($id) use ($router) {
    try {
        TicketService::update((int)$id, $_POST);
    } catch (\Exception $e) {
        // Error handling if needed
    }
    $router->redirect('/tickets');
});

// Delete Ticket
$router->post('/tickets/delete/{id}', function ($id) use ($router) {
    try {
        TicketService::delete((int)$id);
    } catch (\Exception $e) {
        // Error handling if needed
    }
    $router->redirect('/tickets');
});

// Dispatch router
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$router->dispatch($method, $uri);
