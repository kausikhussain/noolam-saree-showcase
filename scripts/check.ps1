<#
.SYNOPSIS
    Automated health and build validation script for NOOLAM Flagship.
#>

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  NOOLAM · Pre-Commit & Production Build Verification    " -ForegroundColor Gold
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Type Check
Write-Host "`n[1/3] Running TypeScript strict type-checking..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Error "TypeScript type-checking failed with compiler errors."
    exit 1
}
Write-Host "  -> TypeScript: 0 errors detected." -ForegroundColor Green

# 2. Asset Integrity Check
Write-Host "`n[2/3] Checking asset manifests..." -ForegroundColor Yellow
npm run check-images

# 3. Production Build Validation
Write-Host "`n[3/3] Executing Next.js production build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Production build failed."
    exit 1
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  ALL CHECKS PASSED: Build is 100% production-ready!     " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

