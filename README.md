
# FinBoard

A Financial Dashboard that Connects Directly to Your Accounts 💸 

Currently Works For All Major Canadian Institutions

Demo Mode Available to Public, Please Contact for Access to Full Website

## Features

**Login**   
Login to the Website using Plaid API

Landing Page:
![landing](/public/landing.png)

<div style="display: flex; flex-wrap: wrap;">
  <img src="public/banks.png" width="510" alt="Screenshot 1">
  <img src="public/login.png" width="500" alt="Screenshot 2">
  <img src="public/accounts.png" width="500" alt="Screenshot 3">
</div>

**Same Song Inputs + Different Parameters = Tailored Recommendations**  

![popular](/public/popular.png)
Above Recommendations are Only Globally Popular Tracks

![unpopular](/public/unpopular.png)
Above Recommendations are Only Lesser Known Tracks

**Dark Mode!!**
![dark](/public/dark.png)

## Run Locally

**To run this project, you will need to add the following environment variables to your .env file**

`CLIENT_ID`

`CLIENT_SECRET`

**These can be found in the Spotify API dashboard after creating a free account**:  
[Link to Spotify Developer Site](https://developer.spotify.com/dashboard)


**Clone the project**

```bash
  git clone https://github.com/RickLiu1203/MeloMate.git
```

**Go to the project directory**

```bash
  cd melomate
```

**Install dependencies**

```bash
  npm install
  pip install python-dotenv requests flask flask-cors
```

**Start the backend**  
Windows
```bash
  python /server/server.py
```
Mac
```bash
  python3 /server/server.py
```

**Start the server**

```bash
  npm run dev
```


## Author

Made with 👂 by [@RickLiu1203](https://www.github.com/RickLiu1203)
