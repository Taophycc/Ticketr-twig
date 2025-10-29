<?php

namespace App;

class TicketService
{
    private const STORAGE_FILE = __DIR__ . '/../data/tickets.json';
    
    public static function getAll(): array
    {
        self::initializeStorage();
        $data = file_get_contents(self::STORAGE_FILE);
        return json_decode($data, true) ?? [];
    }
    
    public static function getById(int $id): ?array
    {
        $tickets = self::getAll();
        foreach ($tickets as $ticket) {
            if ($ticket['id'] === $id) {
                return $ticket;
            }
        }
        return null;
    }
    
    public static function create(array $data): array
    {
        // Validation
        if (empty($data['title'])) {
            throw new \Exception('Title is required');
        }
        
        if (empty($data['status'])) {
            throw new \Exception('Status is required');
        }
        
        if (!in_array($data['status'], ['open', 'in_progress', 'closed'])) {
            throw new \Exception('Invalid status. Must be: open, in_progress, or closed');
        }
        
        $tickets = self::getAll();
        
        $newTicket = [
            'id' => time() + rand(1, 1000),
            'title' => trim($data['title']),
            'description' => trim($data['description'] ?? ''),
            'status' => $data['status'],
            'priority' => $data['priority'] ?? 'medium',
            'createdAt' => date('Y-m-d H:i:s')
        ];
        
        $tickets[] = $newTicket;
        self::saveAll($tickets);
        
        return $newTicket;
    }
    
    public static function update(int $id, array $data): array
    {
        // Validation
        if (empty($data['title'])) {
            throw new \Exception('Title is required');
        }
        
        if (empty($data['status'])) {
            throw new \Exception('Status is required');
        }
        
        if (!in_array($data['status'], ['open', 'in_progress', 'closed'])) {
            throw new \Exception('Invalid status. Must be: open, in_progress, or closed');
        }
        
        $tickets = self::getAll();
        $found = false;
        
        foreach ($tickets as &$ticket) {
            if ($ticket['id'] === $id) {
                $ticket['title'] = trim($data['title']);
                $ticket['description'] = trim($data['description'] ?? '');
                $ticket['status'] = $data['status'];
                $ticket['priority'] = $data['priority'] ?? 'medium';
                $ticket['updatedAt'] = date('Y-m-d H:i:s');
                $found = true;
                $updatedTicket = $ticket;
                break;
            }
        }
        
        if (!$found) {
            throw new \Exception('Ticket not found');
        }
        
        self::saveAll($tickets);
        return $updatedTicket;
    }
    
    public static function delete(int $id): void
    {
        $tickets = self::getAll();
        $tickets = array_filter($tickets, fn($t) => $t['id'] !== $id);
        self::saveAll(array_values($tickets));
    }
    
    public static function getStats(): array
    {
        $tickets = self::getAll();
        $total = count($tickets);
        $open = count(array_filter($tickets, fn($t) => $t['status'] === 'open'));
        $inProgress = count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress'));
        $closed = count(array_filter($tickets, fn($t) => $t['status'] === 'closed'));

        $calculatePercentage = function($count, $total) {
            if ($total === 0) {
                return 0;
            }
            return round(($count / $total) * 100);
        };
        
        return [
            'total' => $total,
            'open' => $open,
            'inProgress' => $inProgress,
            'closed' => $closed,
            'openPercentage' => $calculatePercentage($open, $total),
            'inProgressPercentage' => $calculatePercentage($inProgress, $total),
            'closedPercentage' => $calculatePercentage($closed, $total)
        ];
    }
    
    private static function initializeStorage(): void
    {
        $dir = dirname(self::STORAGE_FILE);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        
        if (!file_exists(self::STORAGE_FILE)) {
            // Initialize with an empty JSON array instead of sample tickets
            file_put_contents(self::STORAGE_FILE, json_encode([], JSON_PRETTY_PRINT));
        }
    }
    
    private static function saveAll(array $tickets): void
    {
        file_put_contents(self::STORAGE_FILE, json_encode($tickets, JSON_PRETTY_PRINT));
    }
}


