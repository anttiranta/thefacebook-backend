# thefacebook-backend

Old school Facebook (friends and photos app). 

- **Backend** built with Node, GraphQL, Express and MongoDB (not that it makes sense, but this is my hobby project so...)
- **Frontend** can be found here: https://github.com/anttiranta/thefacebook-frontend
- Written in ES6

Under construction. 

## Requirements

- User should be able to register by giving his/her name, username and password. 
- It should be possible to locate the user's profile page with the username. Eg. https://app.net/users/profile-username
- User can search other users with name. 
- User can send friend requests to other users.
- User knows his/her friends.
- User can view received friend requests. Friend request should display the name of the sender and creation time.
- If friend request is accepted, user is added to friends. It should be also possible to deny the friend request.
- Each user has a photo gallery. User can add photos to gallery and also remove them. 
- Photo album can contain max. 10 photos.
- Each photo also contains textual description, which is displayed with the image.
- User can set one photo as his/her profile image. 
- Each user as their personal "wall". All users can send messages to the wall.
- Each message should display the sender's name, message's creation time, and the message itself. 
- Messages are shown on the wall in an descending order, so that 25 newest messages are always shown on the wall. 
- User can like the photos and messages of other users. There should be a like button for this. 
- Each user can like certain photo or message only once (same user should not be able to like the same photo or message multiple times).
- Messages and photos should display given likes as well. 
- Users can comment other user's photos and messages. There should a textfield for this. 
- 10 newest comments are always displayed for each photo and message. 

## TODO
- Wall and messages
- Likes
- Comments
