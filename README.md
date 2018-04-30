<p align="center">
  <img src="https://user-images.githubusercontent.com/20265633/39453656-e147dbde-4ca4-11e8-9688-42a39432806a.png">
  <p align="center">An email survey agent based on React, Express and MongoDB.</p>
</p>

---

[![Build Status](https://travis-ci.org/jlyu26/Feedbacker.svg?branch=master)](https://travis-ci.org/jlyu26/Feedbacker)
[![Maintainability](https://api.codeclimate.com/v1/badges/e1c6b1dcff6748bbdd5d/maintainability)](https://codeclimate.com/github/jlyu26/Feedbacker/maintainability)

**Screenshot:**

<img width="860" alt="screen-shot" src="https://user-images.githubusercontent.com/20265633/39455005-49ab74c2-4cac-11e8-95b2-017fcc3a364c.PNG">

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