1- team project description: we will create a community for allowing users to post to twitter as a group, when a user posts an update, the other members of the group will need to review it and vote on it, if it gets the required number of upvotes, it will be published to twitter.

2 + 3 - The list of API’s that might be useful for us and how its functionality can be used in our project:
	1- Twitter API to post the updates on twitter and to retrieve the list of tweets that the group posts, we can also use Twitter login functionality to manage users account.

	2- Babbl.me: it is an API that formats the posts, specially long ones, to convert them into twitter-sized posts, this can be useful in our project if the user needs to post an update that is longer than 140 characters.

	3- Disqus: it is a commenting service that can be used to post the update on our website and have users in the group vote on these comments to decide whether to publish the post on Twitter.

	4- Random user generator: it is used to generate random user profiles and it can be used in our project to automatically generate user profiles to be used on our website.

5- I chose the random user generator API, because we can use to generate user profiles for the users on our website to populate it with user accounts and content. The documentation can be found on: https://randomuser.me/documentation

6- It was a simple API to use but there might be some issues with the format of the returned data, we have to pay attention to the specific structure of the objects returned and how to display them with the html.

7- Since it is a simple API to use, I would recommend using because it makes it easier for us to generate user profiles.

8- The API generates a lot of information for a user, even a username and password, which can be useful when testing login on the website, I have used a few attributes that it generates and more comprehensible profiles can be created by using this API.
