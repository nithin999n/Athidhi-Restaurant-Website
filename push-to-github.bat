@echo off
echo ========================================
echo Pushing to GitHub Repository
echo ========================================
echo.
echo Repository: https://github.com/nithin999n/Athidhi-Restaurant-Website
echo.

echo Step 1: Initializing Git...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Committing...
git commit -m "Initial commit - Athidhi Restaurant Website with full features"

echo.
echo Step 4: Adding remote repository...
git remote add origin https://github.com/nithin999n/Athidhi-Restaurant-Website.git

echo.
echo Step 5: Setting branch to main...
git branch -M main

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Done! Check your repository at:
echo https://github.com/nithin999n/Athidhi-Restaurant-Website
echo ========================================
pause
