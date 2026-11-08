<#
.SYNOPSIS
    Frictionless local launcher for NOOLAM Next.js development server on Windows.
#>

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Starting NOOLAM Flagship Development Server...         " -ForegroundColor Gold
Write-Host "==========================================================" -ForegroundColor Cyan

# Check if port 3000 is occupied
$portActive = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portActive) {
    Write-Warning "Port 3000 is already in use by PID: $($portActive.OwningProcess[0])."
    Write-Host "Next.js will attempt to bind to the next available port (e.g. 3001) or attach to the active process." -ForegroundColor Yellow
}

Write-Host "`nLaunching Next.js 15 dev server on http://localhost:3000 ...`n" -ForegroundColor Green
npm run dev

