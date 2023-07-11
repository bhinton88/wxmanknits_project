# Wxmanknits E-commerce App

## About the App:

Wxmanknits and e-commerce app!

An app built to display and sell both hand made items and destash yarn.

## Features:
- Sign up for account or login with username/password
- Cart feature that persists using localStorage
- Payment processing using Stipe API
- With Admin Rights, ability to upload photos for new item listings using Cloudinary cloud storage

## Technologies

Frontend:
  - React/JavaScript
  - Bootstrap
  - Bootstrap-React
  - React Router Dom
  - FontAwesome

Backend:
  - Ruby on Rails
  - Active Record
  - Gems:
    - bcrypt
    - puma
    - pg (for postgresql)
    - stripe
    - active_model_serializers

* For check out Stripe sessions were used to access pre-built Stripe checkout page
* For Cloudinary, pre-built Cloudinary widget was used in order to upload photos to cloud 

HTML and CSS

## Setup
Clone repository and then run the following:

Run `$ bundle install`, then `$ rails s` to start server

Run `$ npm install --prefix client`, then `$ npm start --prefix client` to open web app.

## Status

- App is still a work in progress. Would like to add further functionality and styles. 


## Author

👤 **Bobby Hinton**

* Github: [@bhinton88](https://github.com/bhinton88)
* LinkedIn: [@bhinton88](https://linkedin.com/in/bhinton88)
