<?php

namespace App\Telegraph\Services;

use App\Models\AdminTracker;
use Carbon\Carbon;

class TrackerService
{
    public function getStatusMessage(string $trackerCode): string
    {
        $tracker = AdminTracker::where('tracker', $trackerCode)->with('statuses')->first();
        if (!$tracker) {
            return 'К сожалению, мы пока не получили номер для отслеживания посылки.';
        }

        return $tracker->statuses->map(function ($status) {
            return "<b>Статус:</b> {$status->status}\n" . Carbon::parse($status->created_at)->isoFormat('DD MMMM YYYY');
        })->implode("\n");
    }
}
