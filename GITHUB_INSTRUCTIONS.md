# Pushing the Frontend to GitHub

Follow these steps to push your frontend code to GitHub:

## 1. Create a new GitHub repository

1. Go to GitHub: https://github.com/dhananjay1434
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Enter a name for your repository (e.g., "ai-friend-frontend")
4. Optionally, add a description
5. Choose whether the repository should be public or private
6. Do NOT initialize the repository with a README, .gitignore, or license
7. Click "Create repository"

## 2. Push your code to GitHub

After creating the repository, you can push your code using the provided PowerShell script:

```powershell
# Run this command from the vite-ts-app directory
# Replace "your-repo-name" with the name you chose for your repository
.\push_to_github.ps1 your-repo-name
```

For example, if you named your repository "ai-friend-frontend", you would run:

```powershell
.\push_to_github.ps1 ai-friend-frontend
```

## 3. Verify the push

1. Go to your GitHub repository in your web browser
2. You should see all your files there

## 4. Deploy your frontend to Netlify

After pushing to GitHub, you can deploy your frontend to Netlify:

1. Go to [Netlify](https://www.netlify.com/) and sign up or log in
2. Click on "New site from Git"
3. Connect your GitHub repository
4. Configure your site with the following settings:
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave blank)
5. Add the following environment variable:
   - `VITE_API_URL`: The URL of your Render backend followed by "/api" (e.g., https://ai-friend-app.onrender.com/api)
6. Click "Deploy site"
