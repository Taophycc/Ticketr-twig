<?php

namespace App;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class TwigExtensions extends AbstractExtension
{
    public function getFunctions()
    {
        return [
            new TwigFunction('get_status_color', [$this, 'getStatusColor']),
            new TwigFunction('get_status_label', [$this, 'getStatusLabel']),
        ];
    }

    public function getStatusColor(string $status): string
    {
        switch ($status) {
            case 'open': return 'bg-status-open';
            case 'in_progress': return 'bg-status-progress';
            case 'closed': return 'bg-status-closed';
            default: return 'bg-gray-500';
        }
    }

    public function getStatusLabel(string $status): string
    {
        switch ($status) {
            case 'open': return 'Open';
            case 'in_progress': return 'In Progress';
            case 'closed': return 'Closed';
            default: return $status;
        }
    }
}
