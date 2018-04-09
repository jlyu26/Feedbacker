## Continuous Integration

### Concepts

Q: What is CI? 

A: The process to merge all code changes into a single branch. CI is most commonly used for larger projects or projects that have multiple engineers working on them.

Q: What is a CI server?

A: Server that runs automatic checks (tests) on the codebase to ensure the changes haven't broken anything.

<img width="203" alt="ci-flow" src="https://user-images.githubusercontent.com/20265633/38517692-beaf92b2-3c08-11e8-9518-5853b9dc10ab.PNG">

CI providers: [Travis CI](https://docs.travis-ci.com/), [Circle CI](https://circleci.com/docs/), [Codeship](https://documentation.codeship.com/), [AWS Codebuild](https://aws.amazon.com/documentation/codebuild/), etc.

<img width="205" alt="travis-ci-flow" src="https://user-images.githubusercontent.com/20265633/38519568-429ce02a-3c0e-11e8-904b-bdc08bafa06b.PNG">

### YAML

We can imagine YAML as being a simplified way of writing plain JSON data, like simple key-value pairs that contain numbers and strings.