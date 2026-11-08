<#
.SYNOPSIS
    Automated environment setup script for NOOLAM Kanchipuram Silk Flagship.
.DESCRIPTION
    Verifies Node.js & npm runtimes, creates .env.local if missing, and installs all dependencies.
#>

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  NOOLAM · Kanchipuram Silk Flagship Setup (Windows)    " -ForegroundColor Gold
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Verify Node.js version
Write-Host "`n[1/4] Checking Node.js environment..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "  -> Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Error "Node.js is not found on your PATH. Please install Node.js v20+ from https://nodejs.org"
    exit 1
}

# 2. Setup Environment Variables
Write-Host "`n[2/4] Verifying local environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local"
        Write-Host "  -> Created .env.local from .env.example template." -ForegroundColor Green
    } else {
        Write-Warning "  -> .env.example template not found. Please create .env.local manually."
    }
} else {
    Write-Host "  -> .env.local already exists. Preserving current configuration." -ForegroundColor Green
}

# 3. Install Dependencies
Write-Host "`n[3/4] Installing project dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install encountered an error. Please inspect the log output above."
    exit 1
}
Write-Host "  -> Dependencies installed successfully." -ForegroundColor Green

# 4. Verify Image Assets
Write-Host "`n[4/4] Auditing visual assets status..." -ForegroundColor Yellow
npm run check-images

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  Setup Complete! Start the server with: .\scripts\start.ps1" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

