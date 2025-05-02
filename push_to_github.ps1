# PowerShell script to push to GitHub
# Usage: .\push_to_github.ps1 <repository-name>

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoName
)

# Your GitHub username
$username = "dhananjay1434"

# Construct the repository URL
$repoUrl = "https://github.com/$username/$RepoName.git"

# Add the remote origin
Write-Host "Adding remote origin: $repoUrl"
git remote add origin $repoUrl

# Push to GitHub
Write-Host "Pushing to GitHub..."
git push -u origin master

Write-Host "Done! Check your repository at: https://github.com/$username/$RepoName"
