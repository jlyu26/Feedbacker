# Feedbacker

[![Build Status](https://travis-ci.org/jlyu26/Feedbacker.svg?branch=master)](https://travis-ci.org/jlyu26/Feedbacker)
[![Maintainability](https://api.codeclimate.com/v1/badges/e1c6b1dcff6748bbdd5d/maintainability)](https://codeclimate.com/github/jlyu26/Feedbacker/maintainability)

An email survey agent based on React, Express and MongoDB.

<img width="342" alt="user-workflow" src="https://user-images.githubusercontent.com/20265633/36164746-54797ebc-10bb-11e8-9079-914162e2bb87.PNG">

## Setup

1. Download or clone the repo to local direction
2. Open terminal inside of `server` folder
3. Run `npm install` command to install the dependencies
4. Run `npm run dev` command to start the app

## Services

- mLab - AWS MongoDB deployment [[Visit](https://mlab.com/)]
- stripe - Handling payments [[Visit](https://stripe.com/)]
- SendGrid - Email delivery [[Visit](https://sendgrid.com/)]
- LocalTunnel - Webhook [[Visit](https://localtunnel.github.io/www/)]
- Heroku - Application host [[Visit](https://www.heroku.com/)]
- redislabs - Redis caching [[Visit](https://redislabs.com/)]
- Travis CI - CI server [[Visit](https://travis-ci.com/)]

## Major Challenges

- Enhance authentication flows in app with Google OAuth authentication and test it
- Handling payments
- Survey creation and identifying unique recipients in feedback (using Webhook)
- Improve query performance of MongoDB (using Redis as cache layer)