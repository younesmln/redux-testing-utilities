workflow "New workflow" {
  on = "push"
  resolves = ["deploy to npm"]
}

action "deploy to npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm publish"
  env = {
    NPM_AUTH_TOKEN = "6c9dc1cb-30dd-4e03-9c7b-d2fc0b156b8d"
  }
}