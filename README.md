# CONVO CHAT APP

![convo](https://raw.githubusercontent.com/HopYy/swapz/main/convo.jpg)

## Features
- [x] User authentication and authorization (JWT)
- [x] User profile creation and management
- [x] Following/unfollowing users
- [x] Block users
- [x] Send/delete/edit messages

## Technologies
+ React.js
+ Redux
+ Node.js
+ Express.js
+ MongoDB
+ Tailwind CSS
+ JWT Authentication
+ Passport.js
+ Pusher
+ Cloudinary

## Project Overview
Convo Chat App is a real-time messaging platform that allows users to connect and communicate. JWT Authentication and Passport.js are integrated for secure user authentication and authorization, ensuring that only authenticated users can access the app's features.
Real-time changes on UI is possible with Pusher, enabling instant sending, deleting, and editing of messages, dynamic conversation sorting on the sidebar, and profile updates. Cloudinary is used to handle the uploading and delivery of images for messages and profile avatar.

## Getting Started

1. Clone the repository:
```bash
   git clone https://github.com/HopYy/convo.git
```
2. Go to the project directory and install dependencies
```bash
   cd client
   npm install
```
```bash
   cd server
   npm install
```
3. Create a ```.env``` file in both the client and server directories and add the environment variables as shown in the ```.env.example``` files.
4. Start
```bash
   npm run dev
```

## Configuration

## MongoDB Database Setup
Set up your MongoDB database.
<br />
[MongoDB](https://www.mongodb.com).
<br />
Update the connection details in the server ```.env``` file with your MongoDB database information.
```bash
DATABASE_URL="your_connection_string"
```

## Cloudinary Setup
Set up your Cloudinary.
<br />
[Cloudinary](https://cloudinary.com).
<br />
Add your Cloudinary cloud name and present key to the client ```.env``` file.
```bash
REACT_APP_CLOUD_NAME="your_cloud_name"
REACT_APP_PRESENT_KEY="your_present_key"
```

## Pusher Setup
Set up your Pusher.
<br />
[Pusher](https://dashboard.pusher.com).
<br />
Add your Pusher key,id and secret to the client and server ```.env``` file.
```bash
REACT_APP_PUSHER_APP_KEY="your_pusher_key"
REACT_APP_PUSHER_APP_ID="your_pusher_id"
REACT_APP_PUSHER_SECRET="your_pusher_secret"
```

## Usage
Start by creating an account and signing in. Once you're logged in, you can connect with others by sending them a friend request. To begin chatting, the other person must accept your request. You can follow/unfollow or block users if you choose.
> [!TIP]
> To get the full experience of our app, we recommend creating two separate accounts and signing in from two different browsers. This way, you can chat with yourself in real-time
