# Setup Android SDK Command Line Tools and Build APK locally

$ProgressPreference = 'SilentlyContinue'
$ErrorActionPreference = 'Stop'

$baseDir = "$env:LOCALAPPDATA\Android\Sdk"
$zipPath = "$env:TEMP\cmdline-tools.zip"
$tempExtract = "$env:TEMP\cmdline-tools-extracted"

Write-Host "[1/5] Preparing SDK directory at $baseDir..."
if (-not (Test-Path $baseDir)) {
    New-Item -ItemType Directory -Force -Path $baseDir | Out-Null
}

$toolsLatest = "$baseDir\cmdline-tools\latest"

if (-not (Test-Path "$toolsLatest\bin\sdkmanager.bat")) {
    Write-Host "[2/5] Downloading Android Command Line Tools from Google..."
    $url = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
    Invoke-WebRequest -Uri $url -OutFile $zipPath

    Write-Host "[3/5] Extracting tools..."
    if (Test-Path $tempExtract) { Remove-Item -Recurse -Force $tempExtract }
    Expand-Archive -Path $zipPath -DestinationPath $tempExtract -Force

    New-Item -ItemType Directory -Force -Path "$baseDir\cmdline-tools" | Out-Null
    if (Test-Path $toolsLatest) { Remove-Item -Recurse -Force $toolsLatest }
    Move-Item -Path "$tempExtract\cmdline-tools" -Destination $toolsLatest -Force
    Remove-Item -Force $zipPath -ErrorAction SilentlyContinue
} else {
    Write-Host "[2/5] Android Command Line Tools already present."
}

Write-Host "[4/5] Accepting licenses and installing Android Platform 34 & Build-Tools..."
$sdkManager = "$toolsLatest\bin\sdkmanager.bat"

# Set environment
$env:ANDROID_HOME = $baseDir
$env:ANDROID_SDK_ROOT = $baseDir

# Automatically accept licenses
$licensesDir = "$baseDir\licenses"
New-Item -ItemType Directory -Force -Path $licensesDir | Out-Null
# Android SDK license hash for 34/35
Set-Content -Path "$licensesDir\android-sdk-license" -Value "24333f8a63b6825ea9c5514f83c2829b004d1fee`n84831b9409646a2b8eac444023450718d1795b57`nd56f5187479451eabf01fb78af6dfcb131a6481e" -NoNewline
Set-Content -Path "$licensesDir\android-sdk-preview-license" -Value "84831b9409646a2b8eac444023450718d1795b57" -NoNewline

# Write local.properties for Gradle
$localProps = "sdk.dir=" + ($baseDir -replace '\\', '\\')
Set-Content -Path "c:\Users\umarh\.antigravity\foodloop-app\android\local.properties" -Value $localProps

Write-Host "local.properties set to: $localProps"

# Install platform-tools, platforms;android-34, build-tools;34.0.0
cmd /c "echo y | `"$sdkManager`" --sdk_root=`"$baseDir`" `"platforms;android-34`" `"build-tools;34.0.0`" `"platform-tools`""

Write-Host "[5/5] Building Android APK with Gradle..."
Set-Location -Path "c:\Users\umarh\.antigravity\foodloop-app\android"
cmd /c ".\gradlew.bat assembleDebug"

$apkSource = "c:\Users\umarh\.antigravity\foodloop-app\android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkSource) {
    $apkDest = "c:\Users\umarh\.antigravity\foodloop-app\FoodLoop.apk"
    Copy-Item -Path $apkSource -Destination $apkDest -Force
    Write-Host "SUCCESS! APK is ready at: $apkDest"
} else {
    Write-Host "Gradle completed. Checking outputs..."
}

